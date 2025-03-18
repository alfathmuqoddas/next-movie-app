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
} from "firebase/firestore";
import { db } from "./firebase";

export const getComments = async (movieId) => {
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

export const getFavorites = async (
  userId,
  mediaType,
  page = 1,
  pageSize = 10,
  previousLastCreatedAt // Optional: To optimize pagination
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
      createdAt: doc.data().createdAt, // Include createdAt if you plan to use it for next page
      // Add other fields as needed
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

export const deleteComment = async (movieId, commentId) => {
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

export const addComment = async (movieId, payload) => {
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
