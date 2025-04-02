"use client";
import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { addToFavorites, checkIsFavorite } from "../lib/firebaseQuery";

const AddToFavorites = ({ payload, type = "movie" }) => {
  const { userData } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleAddToFavorites = async () => {
    setLoading(true);
    const result = await addToFavorites(payload, type, userData.uid);
    if (result.success) {
      setLoading(false);
      alert("Successfully added to favorites");
    } else {
      setLoading(false);
      alert(result.error);
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
