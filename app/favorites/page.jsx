"use client";

import { getFavorites, deleteFavorite } from "../../lib/firebaseQuery";
import useAuthStore from "../../store/useAuthStore";
import { useState, useEffect, useCallback } from "react";
import { CardGrid } from "../../components/Card";
import Pagination from "../../components/Pagination";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";

const Favorites = () => {
  const { userData } = useAuthStore();
  const router = useRouter();
  const [favorites, setFavorites] = useState({
    data: [],
    currentPage: 0,
    totalPages: 0,
  });
  const [favoritesTv, setFavoritesTv] = useState({
    data: [],
    currentPage: 0,
    totalPages: 0,
  });
  const [favsPage, setFavsPage] = useState(1);
  const [favsTvPage, setFavsTvPage] = useState(1);
  const [favsCount, setFavsCount] = useState(10);
  const [favsTvCount, setFavsTvCount] = useState(10);

  // Fetch Movies
  const fetchFavorites = useCallback(async () => {
    if (!userData?.uid) return;
    const favs = await getFavorites(userData.uid, "movie", favsPage, favsCount);
    setFavorites(favs);
  }, [userData?.uid, favsPage, favsCount]);

  // Fetch TV Shows
  const fetchFavoritesTv = useCallback(async () => {
    if (!userData?.uid) return;
    const favsTv = await getFavorites(
      userData.uid,
      "tv",
      favsTvPage,
      favsTvCount
    );
    setFavoritesTv(favsTv);
  }, [userData?.uid, favsTvPage, favsTvCount]);

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
        console.log("Favorite deleted successfully!");
        router.refresh();
      } else {
        console.error("Error deleting favorite: ", result.error);
        alert(`Error deleting favorite: ${result.error}`);
      }
    } catch (error) {
      console.error("Error deleting favorite: ", error);
      alert(`Error deleting favorite: ${error}`);
    }
  };

  return (
    <>
      {!userData ? (
        <div className="max-w-5xl px-4 mx-auto flex flex-col gap-12 my-12">
          You have to login
        </div>
      ) : (
        <div className="max-w-5xl px-4 mx-auto flex flex-col gap-12 my-12">
          <div className="flex flex-col gap-8">
            <h1 className="px-4 md:px-0 text-2xl font-bold mb-4">
              Favorites Movies
            </h1>
            <article className="grid grid-cols-3 md:grid-cols-5 gap-4 lg:gap-8">
              {favorites.data?.length > 0 ? (
                favorites.data?.map((result) => (
                  <div key={result.id} className="relative">
                    <div className="absolute top-2 right-1 flex gap-2">
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() => handleDeleteFavorite("movie", result.id)}
                      >
                        <Trash size={20} className="text-red-500" />
                      </button>
                    </div>
                    <CardGrid
                      img={
                        result.poster_path
                          ? `https://image.tmdb.org/t/p/w342/${result.poster_path}`
                          : "https://placehold.co/185x278?text=Data+Unavailable"
                      }
                      title={result.title}
                      link={`/details/movie/${result.contentId}`}
                      subtitle=""
                    />
                  </div>
                ))
              ) : (
                <p>No favorites yet</p>
              )}
            </article>
            <Pagination
              totalPages={favorites?.totalPages}
              currentPage={favsPage}
              updatePage={setFavsPage}
            />
          </div>
          <div className="flex flex-col gap-8">
            <h1 className="px-4 md:px-0 text-2xl font-bold mb-4">
              Favorites TV Shows
            </h1>
            <article className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {favoritesTv.data?.length > 0 ? (
                favoritesTv.data?.map((result) => (
                  <div key={result.id} className="relative">
                    <div className="absolute top-2 right-1">
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() => handleDeleteFavorite("tv", result.id)}
                      >
                        <Trash size={20} className="text-red-500" />
                      </button>
                    </div>
                    <CardGrid
                      img={
                        result.poster_path
                          ? `https://image.tmdb.org/t/p/w342/${result.poster_path}`
                          : "https://placehold.co/185x278?text=Data+Unavailable"
                      }
                      title={result.title}
                      link={`/details/tv/${result.contentId}`}
                      subtitle=""
                    />
                  </div>
                ))
              ) : (
                // <div className="relative">
                //   <div className="absolute top-0 right-0">
                //     <button className="btn btn-sm btn-ghost">delete</button>
                //   </div>
                //   <CardGrid
                //     img={"https://placehold.co/185x278?text=Data+Unavailable"}
                //     title="Test"
                //     link="test"
                //     subtitle=""
                //   />
                // </div>
                <>No favorites yet</>
              )}
            </article>
            <Pagination
              totalPages={favoritesTv?.totalPages}
              currentPage={favsTvPage}
              updatePage={setFavsTvPage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Favorites;
