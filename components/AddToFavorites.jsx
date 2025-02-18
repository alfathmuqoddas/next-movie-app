"use client";
import { useState } from "react";
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
  const [loading, setLoading] = useState(false);

  const handleAddToFavorites = async () => {
    setLoading(true);
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
        setLoading(false);
        return;
      }

      const q = query(favoritesCollection, where("id", "==", payload.id));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        alert("You have already submitted this movie to favorites.");
        setLoading(false);
        return;
      }
      const docRef = await addDoc(favoritesCollection, {
        id: payload.id,
        title: payload.title,
        poster_path: payload.poster_path,
        createdAt: serverTimestamp(),
      });
      alert("Movie added to favorites successfully!");
      setLoading(false);
    } catch (error) {
      console.error("Error adding to favorites: ", error);
      alert("Error adding to favorites: ", error);
      setLoading(false);
    }
  };

  if (!userData) {
    return <p>Login to add to favorites</p>;
  }

  return (
    <div>
      <button
        onClick={handleAddToFavorites}
        className="hover:cursor-pointer border rounded-full px-2 hover:bg-white hover:text-black transition-colors duration-300"
      >
        {loading ? "loading..." : "Add to Favorites +"}
      </button>
    </div>
  );
};

export default AddToFavorites;
