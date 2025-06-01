import {
  collection,
  query,
  getDocs,
  addDoc,
  orderBy,
  deleteDoc,
  doc,
  serverTimestamp,
  getCountFromServer,
  limit,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export const getComments = async (movieId: string) => {
  try {
    if (!movieId) {
      console.warn("movieId is required to fetch comments.");
      return;
    }

    const commentsCollection = query(
      collection(db, "commentsByMovieId", movieId.toString(), "comments"),
      orderBy("createdAt", "desc")
    );
    const commentSnapshot = await getDocs(commentsCollection);
    const commentsList = commentSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        userId: data.userId,
        userName: data.userName,
        content: data.content,
        userDisplayPicture: data.userDisplayPicture,
        createdAt: new Date(data.createdAt.toMillis()).toLocaleString("id"),
      };
    });
    return commentsList;
  } catch (error) {
    console.error("Error fetching comments: ", error);
    return { error: "Failed to fetch comments." };
  }
};

export const addToFavorites = async (payload, type, userId) => {
  let favoritesCollection;
  try {
    if (type === "movie") {
      favoritesCollection = collection(
        db,
        "movieFavorites",
        userId.toString(),
        "favorites"
      );
    } else if (type === "tv") {
      favoritesCollection = collection(
        db,
        "tvFavorites",
        userId.toString(),
        "favorites"
      );
    } else {
      alert("Invalid content type specified");
      return;
    }

    if (!userId) {
      console.warn("userId is required to add a movie to favorites.");
      return { success: false, error: "Invalid userId." };
    }

    const q = query(favoritesCollection, where("id", "==", payload.id));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return {
        success: false,
        error: "You have already submitted this movie to favorites.",
      };
    }
    const docRef = await addDoc(favoritesCollection, {
      id: payload.id,
      title: payload.title,
      poster_path: payload.poster_path,
      createdAt: serverTimestamp(),
    });
    return { success: true, docRef };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const checkIsFavorite = async (payload, type, userId) => {
  let favoritesCollection;
  try {
    if (type === "movie") {
      favoritesCollection = collection(
        db,
        "movieFavorites",
        userId.toString(),
        "favorites"
      );
    } else if (type === "tv") {
      favoritesCollection = collection(
        db,
        "tvFavorites",
        userId.toString(),
        "favorites"
      );
    } else {
      alert("Invalid content type specified");
      return;
    }

    if (!userId) {
      console.warn("userId is required to check if a movie is in favorites.");
      return { success: false, error: "Invalid userId." };
    }

    const q = query(favoritesCollection, where("id", "==", payload.id));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return { success: true, isFavorite: true };
    }
    return { success: true, isFavorite: false };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getFavorites = async (
  userId: string,
  mediaType: string,
  page: number = 1,
  pageSize: number = 10,
  previousLastCreatedAt?: string // Optional: To optimize pagination
) => {
  try {
    if (!userId || !mediaType) {
      throw new Error("Invalid parameters: userId and mediaType are required.");
    }

    if (page <= 0) {
      console.warn("Invalid page number, defaulting to page 1.");
      page = 1;
    }

    if (pageSize <= 0 || pageSize > 100) {
      // Example upper limit
      console.warn("Invalid pageSize, defaulting to 10.");
      pageSize = 10;
    }

    // Determine collection path
    const parentDocRef = doc(
      db,
      mediaType === "movie" ? "movieFavorites" : "tvFavorites",
      userId.toString()
    );
    const collectionRef = collection(parentDocRef, "favorites");

    // Get total documents count (for totalPages calculation)
    const countSnapshot = await getCountFromServer(collectionRef);
    const totalDocs = countSnapshot.data().count;
    const totalPages = Math.ceil(totalDocs / pageSize);

    if (totalPages === 0) {
      return { data: [], totalPages: 0, currentPage: 1 };
    }

    // Query with pagination
    let favoritesQuery = query(
      collectionRef,
      orderBy("createdAt", "desc"),
      limit(pageSize)
    );

    if (page > 1) {
      if (previousLastCreatedAt) {
        favoritesQuery = query(
          collectionRef,
          orderBy("createdAt", "desc"),
          startAfter({ createdAt: previousLastCreatedAt }),
          limit(pageSize)
        );
      } else {
        // Less efficient fallback: Fetch the last document of the previous page
        const previousPageSnapshot = await getDocs(
          query(
            collectionRef,
            orderBy("createdAt", "desc"),
            limit((page - 1) * pageSize)
          )
        );
        const lastVisible =
          previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1];

        if (lastVisible) {
          favoritesQuery = query(
            collectionRef,
            orderBy("createdAt", "desc"),
            startAfter(lastVisible),
            limit(pageSize)
          );
        }
      }
    }

    // Fetch paginated data
    const favoritesSnapshot = await getDocs(favoritesQuery);
    const data = favoritesSnapshot.docs.map((doc) => ({
      id: doc.id,
      poster_path: doc.data().poster_path,
      title: doc.data().title,
      contentId: doc.data().id,
      createdAt: doc.data().createdAt,
    }));

    return {
      data,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return { data: [], totalPages: 0, currentPage: page };
  }
};

export const deleteFavorite = async (type, uid, mediaId) => {
  try {
    if (!type || !uid || !mediaId) {
      console.warn("Invalid parameters: type, uid, and mediaId are required.");
      return { success: false, error: "Invalid parameters." };
    }

    const result = await deleteDoc(
      doc(
        db,
        type === "movie" ? "movieFavorites" : "tvFavorites",
        uid,
        "favorites",
        mediaId
      )
    );
    return { success: true, result };
  } catch (error) {
    console.error("Error deleting favorite: ", error);
    return { success: false, error: error.message };
  }
};

export const deleteComment = async (movieId: string, commentId: string) => {
  try {
    if (!movieId || !commentId) {
      console.warn("Invalid parameters: movieId and commentId are required.");
      return { success: false, error: "Invalid parameters." };
    }

    const comment = await deleteDoc(
      doc(db, "commentsByMovieId", movieId.toString(), "comments", commentId)
    );

    return { success: true, comment };
  } catch (error) {
    console.error("Error deleting comment: ", error);
    return { success: false, error: error.message };
  }
};

export const addComment = async (movieId: string, payload: any) => {
  try {
    if (!movieId) {
      console.warn("movieId is required to add a comment.");
      return { success: false, error: "Invalid movieId." };
    }

    if (!payload || !payload.userId || !payload.content) {
      console.warn("Invalid payload: userId and content are required.");
      return { success: false, error: "Invalid payload." };
    }

    const docRef = await addDoc(
      collection(db, "commentsByMovieId", movieId.toString(), "comments"),
      { ...payload, createdAt: serverTimestamp() }
    );
    return { success: true, docRef };
  } catch (error) {
    console.error("Error adding comment: ", error);
    // alert("Error adding comment: " + error.message);
    return { success: false, error: error.message };
  }
};
