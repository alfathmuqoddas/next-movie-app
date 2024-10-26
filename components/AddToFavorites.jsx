import { useState, useEffect } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { db } from "../lib/firebase";
import {
  arrayUnion,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import useAuthStore from "../store/useAuthStore";

const AddToFavorites = ({ payload }) => {
  const { userData } = useAuthStore();
  //   const { uid } = userData;
  const [isFavorite, setIsFavorite] = useState(false);
  const { id, poster_path, title, releaseYear } = payload;

  const addMovieToFavorite = async () => {
    await updateDoc(doc(db, "movies-favorite", id), {
      users: arrayUnion({
        uid: uid,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
        dateAdded: serverTimestamp(),
      }),
    });
  };

  const addToUserFavorites = async () => {
    await updateDoc(doc(db, "user-favorites", uid), {
      movies: arrayUnion({
        id: id,
        poster_path: poster_path,
        title: title,
        releaseYear: releaseYear,
        dateAdded: serverTimestamp(),
      }),
    });
  };

  const removeUserFromMoviesFavorites = async () => {
    await updateDoc(doc(db, "movies-favorite", id), {
      users: arrayRemove({
        uid: uid,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
      }),
    });
  };

  const addToFavorites = async () => {
    await addMovieToFavorite();
    await addToUserFavorites();
  };

  //   useEffect(() => {
  //     const docRef = doc(db, "movies-favorite", id);
  //     const getUsersWhoFavTheMovie = async () => {
  //       const favMovie = await getDoc(docRef);
  //       setIsFavorite(favMovie.data().users.includes(uid));
  //     };
  //     getUsersWhoFavTheMovie();
  //   }, []);

  return (
    <>
      {userData ? (
        <div>
          {isFavorite ? (
            <button onClick={removeUserFromMoviesFavorites}>
              Remove from Favorites
            </button>
          ) : (
            <button onClick={addToFavorites}>Add To Favorites</button>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AddToFavorites;
