import Layout from "../../components/Layout";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { CardHorizontal } from "../../components/Card";

export const getServerSideProps = async (context) => {
  const { string } = context.query;
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=403829fffc80d8184aa974d631a475c5&language=en-US&query=${string}&page=1&include_adult=false`
  );
  const res2 = await fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=403829fffc80d8184aa974d631a475c5&language=en-US&query=${string}&page=1&include_adult=false`
  );

  const searchResultData = await res.json();
  const searchTVData = await res2.json();
  const searchDatas = searchResultData.results;
  const searchTVDatas = searchTVData.results;

  return {
    props: {
      searchDatas,
      string,
      searchTVDatas,
    },
  };
};

const SearchResult = ({ searchDatas, searchTVDatas, string }) => {
  const [showComponent, setShowComponent] = useState(true);

  const toggleComponent = () => {
    setShowComponent(!showComponent);
  };

  return (
    <>
      <Head>
        <title>Search results for {string} | ALEFAST</title>
      </Head>
      <Layout>
        <div className="container px-4 mx-auto">
          <div className="text-center my-12">
            <h1 className="text-2xl">
              Search Results for <i>{'"' + string + '"'}</i>
            </h1>
            <button
              className="btn btn-primary btn-small"
              onClick={toggleComponent}
            >
              {showComponent ? "Toggle TV results" : "Toggle movie results"}
            </button>
          </div>

          <div className="mx-auto max-w-screen-md">
            {showComponent
              ? //showing movies result
                searchDatas.map((searchDat) => (
                  <Link key={searchDat.id} href={`/details/${searchDat.id}`}>
                    <CardHorizontal
                      img={searchDat.poster_path}
                      title={searchDat.title}
                      subtitle={
                        searchDat.release_date
                          ? searchDat.release_date.substring(0, 4)
                          : "TBA"
                      }
                      subtitle2={Math.round(searchDat.vote_average * 10)}
                      subtitle3={
                        searchDat.overview.length > 120
                          ? searchDat.overview.slice(0, 120) + "..."
                          : searchDat.overview
                      }
                    />
                  </Link>
                ))
              : //showing tv series results
                searchTVDatas.map((searchTVData) => (
                  <Link
                    key={searchTVData.id}
                    href={`/details/tv/${searchTVData.id}`}
                  >
                    <CardHorizontal
                      img={searchTVData.poster_path}
                      title={searchTVData.name}
                      subtitle={
                        searchTVData.first_air_date
                          ? searchTVData.first_air_date.substring(0, 4)
                          : "TBA"
                      }
                      subtitle2={Math.round(searchTVData.vote_average * 10)}
                      subtitle3={
                        searchTVData.overview.length > 120
                          ? searchTVData.overview.slice(0, 120) + "..."
                          : searchTVData.overview
                      }
                    />
                  </Link>
                ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SearchResult;
