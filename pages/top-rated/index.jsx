import Layout from "../../components/Layout";
import Head from "next/head";
import { useEffect, useState } from "react";
import { GridTemplate } from "../../components/TemplateFront";
import { getTopRatedData } from "../../lib/getData";

const Index = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        const topRatedDatas = await getTopRatedData(page);
        setMovies((movies) => [...movies, ...topRatedDatas]);
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
        <title>Top Rated | ALEFAST</title>
      </Head>
      <Layout>
        <div className="mx-auto container px-4">
          <GridTemplate content={movies} templateName="Top Rated" />
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
