import {
  collection,
  query,
  getDocs,
  addDoc,
  orderBy,
  deleteDoc,
  doc,
  serverTimestamp,
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
