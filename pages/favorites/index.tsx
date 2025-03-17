import React, { use } from "react";
import Layout from "../../components/Layout";
import Head from "next/head";
import { getFavorites } from "../../lib/firebaseQuery";
import useAuthStore from "../../store/useAuthStore";
import { useState, useEffect, useCallback } from "react";
import { CardGrid } from "../../components/Card";
import Pagination from "../../components/Pagination";

const Favorites = () => {
  const { userData } = useAuthStore();
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

  return (
    <>
      <Head>
        <title>Favorites | ALEFAST</title>
        <meta name="description" content="Favorites page of ALEFAST" />
        <meta name="keywords" content="favorites, movies, tv shows, ALEFAST" />
        <meta property="og:title" content="Favorites | ALEFAST" />
        <meta property="og:description" content="Favorites page of ALEFAST" />
      </Head>
      <Layout>
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
              <article className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {favorites.data?.length > 0 ? (
                  favorites.data?.map((result) => (
                    <CardGrid
                      key={result.id}
                      img={
                        result.poster_path
                          ? `https://image.tmdb.org/t/p/w342/${result.poster_path}`
                          : "https://placehold.co/185x278?text=Data+Unavailable"
                      }
                      title={result.title}
                      link={`/details/movie/${result.contentId}`}
                      subtitle=""
                    />
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
                    <CardGrid
                      key={result.id}
                      img={
                        result.poster_path
                          ? `https://image.tmdb.org/t/p/w342/${result.poster_path}`
                          : "https://placehold.co/185x278?text=Data+Unavailable"
                      }
                      title={result.title}
                      link={`/details/tv/${result.contentId}`}
                      subtitle=""
                    />
                  ))
                ) : (
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
      </Layout>
    </>
  );
};

export default Favorites;
