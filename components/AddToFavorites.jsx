"use client";
import { useState, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import { addToFavorites, checkIsFavorite } from "../lib/firebaseQuery";

const AddToFavorites = ({ payload, type = "movie" }) => {
  const { userData } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [checkingFavorite, setCheckingFavorite] = useState(false);

  const checkFavoriteStatus = async () => {
    if (!userData?.uid || !payload?.id) {
      setIsFavorite(false);
      setCheckingFavorite(false);
      return;
    }
    setCheckingFavorite(true);
    try {
      const result = await checkIsFavorite(payload, type, userData.uid);
      if (result.success) {
        setIsFavorite(result.isFavorite);
      } else {
        console.error("Error checking if movie is favorite: ", result.error);
        setIsFavorite(false);
      }
    } catch (error) {
      console.error("Error checking if movie is favorite: ", error);
      setIsFavorite(false);
    } finally {
      setCheckingFavorite(false);
    }
  };

  useEffect(() => {
    checkFavoriteStatus();
  }, [userData?.uid, payload?.id, type]);

  const handleAddToFavorites = async () => {
    if (!userData?.uid) {
      alert("Please login to add to favorites");
      return;
    }

    setLoading(true);
    try {
      const result = await addToFavorites(payload, type, userData.uid);
      if (result.success) {
        setLoading(false);
        setIsFavorite(true);
        alert("Successfully added to favorites");
      } else {
        if (
          result.error?.includes(
            "You have already submitted this movie to favorites."
          )
        ) {
          alert(result.error);
          setIsFavorite(true);
        } else {
          alert(
            "Error adding to favorites: " + (result.error || "Unknown error")
          );
        }
      }
    } catch (error) {
      console.error("Exception adding to favorites:", error);
      alert("Unexpected error adding to favorites: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return <p>Login to add to favorites</p>;
  }

  if (checkingFavorite) {
    return <p>Checking favorite status...</p>;
  }

  if (isFavorite) {
    return (
      <div>
        <button
          className="border rounded-full px-2 bg-white text-black cursor-not-allowed opacity-75" // Adjusted styling for disabled
          disabled
        >
          Added to Favorites ✓
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={handleAddToFavorites}
        className={`border rounded-full px-2 transition-colors duration-300 ${
          loading
            ? "bg-gray-400 text-gray-800 cursor-wait" // Style for loading state
            : "hover:cursor-pointer hover:bg-white hover:text-black" // Normal hover state
        }`}
      >
        {loading ? "loading..." : "Add to Favorites +"}
      </button>
    </div>
  );
};

export default AddToFavorites;
