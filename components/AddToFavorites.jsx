"use client";

import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import useAuthStore from "../store/useAuthStore";
import { db } from "../lib/firebase";

const AddToFavorites = ({ payload, type = "movie" }) => {
  const { userData } = useAuthStore();

  const handleAddToFavorites = async () => {
    try {
      let favoritesCollection;
      if (type === "movie") {
        favoritesCollection = collection(
          db,
          "movieFavorites",
          userData.uid.toString(),
          "favorites"
        );
      } else if (type === "tv") {
        favoritesCollection = collection(
          db,
          "tvFavorites",
          userData.uid.toString(),
          "favorites"
        );
      } else {
        alert("Invalid content type specified");
        return;
      }

      const q = query(favoritesCollection, where("movieId", "==", payload.id));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        alert("You have already submitted this movie to favorites.");
        return;
      }
      const docRef = await addDoc(favoritesCollection, {
        id: payload.id,
        title: payload.title,
        poster_path: payload.poster_path,
        createdAt: serverTimestamp(),
      });
      alert("Movie added to favorites successfully!");
    } catch (error) {
      console.error("Error adding to favorites: ", error);
      alert("Error adding to favorites: ", error);
    }
  };

  if (userData) {
    return (
      <div>
        <button
          onClick={handleAddToFavorites}
          className="hover:cursor-pointer border rounded-full px-2 hover:bg-white hover:text-black transition-colors duration-300"
        >
          Add to Favorites +
        </button>
      </div>
    );
  } else {
    return <div>Login to add to favorites</div>;
  }
};

export default AddToFavorites;
