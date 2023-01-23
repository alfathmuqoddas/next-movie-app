import Layout from "../../components/Layout";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { GridTemplate } from "../../components/TemplateFront";
import { getNowPlayingData } from "../../lib/getData";

const index = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        const nowPlayingDatas = await getNowPlayingData(page);
        setMovies((movies) => [...movies, ...nowPlayingDatas]);
        setErrorMsg("");
      } catch (error) {
        setErrorMsg("Error while loading data. Try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [page]);

  const loadMore = () => {
    setPage((page) => page + 1);
  };
  return (
    <div>
      <Head>
        <title>Now Playing | ALEFAST</title>
      </Head>
      <Layout>
        <GridTemplate content={movies} templateName="Now Playing" />
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <div className="load-more">
          <button onClick={loadMore} className="btn btn-primary">
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      </Layout>
    </div>
  );
};

export default index;
