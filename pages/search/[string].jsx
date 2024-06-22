import Layout from "../../components/Layout";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { CardHorizontal } from "../../components/Card";
import RadialRating from "../../components/RadialRating";

export const getServerSideProps = async (context) => {
  const API_KEY = process.env.API_KEY;
  const { string } = context.query;
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${string}&page=1&include_adult=false`
  );
  const res2 = await fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&query=${string}&page=1&include_adult=false`
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
              Search Results for <i>{`"${string}"`}</i>
            </h1>
            <button
              className="btn btn-primary btn-small mt-4"
              onClick={toggleComponent}
            >
              {showComponent ? "Toggle TV results" : "Toggle movie results"}
            </button>
          </div>

          <div className="mx-auto max-w-screen-md">
            {showComponent
              ? //showing movies result
                searchDatas.map((searchDat) => {
                  const {
                    id,
                    poster_path,
                    title,
                    release_date,
                    vote_average,
                    overview,
                  } = searchDat;
                  return (
                    <Link key={id} href={`/details/movie/${id}`}>
                      <CardHorizontal
                        img={
                          poster_path
                            ? `https://image.tmdb.org/t/p/w185/${poster_path}`
                            : "https://placehold.co/185x278?text=Data+Unavailable"
                        }
                        title={`${title} (${
                          release_date ? release_date.substring(0, 4) : "TBA"
                        })`}
                        subtitle={
                          overview.length > 240
                            ? overview.slice(0, 240) + "..."
                            : overview
                        }
                        subtitle2={
                          <RadialRating rating={vote_average} size="2rem" />
                        }
                        imgSize={36}
                      />
                    </Link>
                  );
                })
              : //showing tv series results
                searchTVDatas.map((searchTVData) => {
                  const {
                    id,
                    poster_path,
                    name,
                    first_air_date,
                    vote_average,
                    overview,
                  } = searchTVData;
                  return (
                    <Link key={id} href={`/details/tv/${id}`}>
                      <CardHorizontal
                        img={
                          poster_path
                            ? `https://image.tmdb.org/t/p/w185/${poster_path}`
                            : "https://placehold.co/185x278?text=Data+Unavailable"
                        }
                        title={`${name} (${
                          first_air_date
                            ? first_air_date.substring(0, 4)
                            : "TBA"
                        })`}
                        subtitle={
                          overview.length > 240
                            ? overview.slice(0, 240) + "..."
                            : overview
                        }
                        subtitle2={
                          <RadialRating rating={vote_average} size="2rem" />
                        }
                        imgSize={36}
                      />
                    </Link>
                  );
                })}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SearchResult;
