import Layout from "../../components/Layout";
import Head from "next/head";
import { useEffect, useState } from "react";
import { GridTemplate } from "../../components/TemplateFront";
import { getPopularData } from "../../lib/getData";
import {
  IApiData,
  IApiDataTv,
  IResultsMovieData,
  IResultsTvData,
} from "../../lib/type";
import { ICardWrap } from "../../components/Card";

const Index = () => {
  const [movies, setMovies] = useState<
    IApiData["results"] | IApiDataTv["results"]
  >([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        const popularDatas = await getPopularData("movie", page);
        const { results } = popularDatas;
        setMovies((movies: any) => [...movies, ...results]);
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
        <title>Popular | ALEFAST</title>
      </Head>
      <Layout>
        <div className="mx-auto container px-4">
          <GridTemplate
            content={movies}
            templateName="Popular"
            contentLink=""
          />
          {errorMsg && <p className="errorMsg">{errorMsg}</p>}
          <div className="load-more">
            <button onClick={loadMore} className="btn btn-primary">
              {isLoading ? "Loading..." : "Load More"}
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Index;
