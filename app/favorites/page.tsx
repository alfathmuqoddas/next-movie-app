"use client";

import { getFavorites, deleteFavorite } from "../../lib/firebaseQuery";
import useAuthStore from "../../store/useAuthStore";
import { useState, useEffect, useCallback } from "react";
import FavoritePagination from "./components/FavoritePagination";
import FavoriteCard from "./components/FavoriteCard";

const Favorites = () => {
  const { userData } = useAuthStore();
  const [favorites, setFavorites] = useState<{
    data: any;
    currentPage: number;
    totalPages: number;
  }>({
    data: [],
    currentPage: 0,
    totalPages: 0,
  });
  const [favoritesTv, setFavoritesTv] = useState<{
    data: any;
    currentPage: number;
    totalPages: number;
  }>({
    data: [],
    currentPage: 0,
    totalPages: 0,
  });
  const [favsPage, setFavsPage] = useState(1);
  const [favsTvPage, setFavsTvPage] = useState(1);

  // Fetch Movies
  const fetchFavorites = useCallback(async () => {
    if (!userData?.uid) return;
    const favs = await getFavorites(userData.uid, "movie", favsPage, 12);
    setFavorites(favs);
  }, [userData?.uid, favsPage]);

  // Fetch TV Shows
  const fetchFavoritesTv = useCallback(async () => {
    if (!userData?.uid) return;
    const favsTv = await getFavorites(userData.uid, "tv", favsTvPage, 12);
    setFavoritesTv(favsTv);
  }, [userData?.uid, favsTvPage]);

  // Fetch data on mount and when dependencies change
  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  useEffect(() => {
    fetchFavoritesTv();
  }, [fetchFavoritesTv]);

  const handleDeleteFavorite = async (type, id) => {
    try {
      if (!confirm("Are you sure you want to delete this favorite?")) return;
      const result = await deleteFavorite(type, userData.uid.toString(), id);
      if (result.success) {
        alert("Favorite deleted successfully!");

        if (type === "movie") {
          fetchFavorites();
        } else {
          fetchFavoritesTv();
        }
      } else {
        alert(`Error deleting favorite: ${result.error}`);
      }
    } catch (error) {
      alert(`Error deleting favorite: ${error}`);
    }
  };

  return (
    <>
      {!userData ? (
        <p>You have to login</p>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Favorite Movies</h1>
            <article className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {favorites.data?.length > 0 ? (
                favorites.data?.map((result) => (
                  <FavoriteCard
                    key={result.id}
                    link={`/details/movie/${result.contentId}`}
                    title={result.title}
                    poster_path={result.poster_path}
                    handleClick={() => handleDeleteFavorite("movie", result.id)}
                    subtitle=""
                  />
                ))
              ) : (
                <p>No favorites yet</p>
              )}
            </article>
            <FavoritePagination
              totalPages={favorites?.totalPages}
              currentPage={favsPage}
              updatePage={setFavsPage}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Favorite TV Shows</h1>
            <article className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {favoritesTv.data?.length > 0 ? (
                favoritesTv.data?.map((result) => (
                  <FavoriteCard
                    key={result.id}
                    link={`/details/tv/${result.contentId}`}
                    title={result.name}
                    poster_path={result.poster_path}
                    handleClick={() => handleDeleteFavorite("tv", result.id)}
                    subtitle=""
                  />
                ))
              ) : (
                <p>No favorites yet</p>
              )}
            </article>
            <FavoritePagination
              totalPages={favoritesTv?.totalPages}
              currentPage={favsTvPage}
              updatePage={setFavsTvPage}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Favorites;
