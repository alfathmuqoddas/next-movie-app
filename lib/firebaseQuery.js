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
  }
};

export const getFavorites = async (
  userId,
  mediaType,
  page = 1,
  pageSize = 10
) => {
  try {
    if (!userId || !mediaType) {
      throw new Error("Invalid parameters: userId and mediaType are required.");
    }

    // Determine collection path
    const collectionRef = collection(
      doc(
        db,
        mediaType === "movie" ? "movieFavorites" : "tvFavorites",
        userId.toString()
      ),
      "favorites"
    );

    // Get total documents count (for totalPages calculation)
    const snapshot = await getCountFromServer(collectionRef);
    const totalDocs = snapshot.data().count;
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

    // Fetch paginated data
    const favoritesSnapshot = await getDocs(favoritesQuery);
    const data = favoritesSnapshot.docs.map((doc) => ({
      id: doc.id,
      poster_path: doc.data().poster_path,
      title: doc.data().title,
      contentId: doc.data().id,
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

export const handleDeleteComment = async (
  movieId,
  commentId,
  router,
  setIsDisabled
) => {
  setIsDisabled(true);
  try {
    const docRef = await deleteDoc(
      doc(db, "commentsByMovieId", movieId.toString(), "comments", commentId)
    );
    alert("Comment deleted successfully!");
    setIsDisabled(false);
    router.reload();
  } catch (error) {
    console.error("Error deleting comment: ", error);
    alert("Error deleting comment: " + error.message);
  }
};

export const addComment = async (movieId, payload) => {
  try {
    const docRef = await addDoc(
      collection(db, "commentsByMovieId", movieId.toString(), "comments"),
      { ...payload, createdAt: serverTimestamp() }
    );
    return docRef;
  } catch (error) {
    console.error("Error adding comment: ", error);
    alert("Error adding comment: " + error.message);
  }
};
