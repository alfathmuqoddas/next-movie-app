import Layout from "../../components/Layout";
import Head from "next/head";
import { useEffect, useState } from "react";
import { GridTemplate } from "../../components/TemplateFront";
import { getPopularData } from "../../lib/getData";

const Index = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const { results: popularDatas } = await getPopularData("movie", page);
        setMovies((movies) => [...movies, ...popularDatas]);
        setErrorMsg("");
      } catch (error) {
        setErrorMsg("Error while loading data. Try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
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
            contentLink="/movie"
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
