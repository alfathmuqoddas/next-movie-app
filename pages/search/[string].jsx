import Layout from "../../components/Layout";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { CardHorizontal } from "../../components/Card";
import RadialRating from "../../components/RadialRating";
import { queryData } from "../../lib/getData";

export const getServerSideProps = async (context) => {
  const { string } = context.query;

  const [searchData, searchTVData] = await Promise.all([
    queryData("movie", string),
    queryData("tv", string),
  ]);

  const { results: searchDatas } = searchData;
  const { results: searchTVDatas } = searchTVData;

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
  const [searchString, setSearchString] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchString) {
      router.push(`/search/${searchString}`);
    } else {
      alert("Please enter the movie/tv show name");
    }
  };

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
          <div className="max-w-screen-md mx-auto mt-12">
            <form onSubmit={handleSubmit}>
              <label className="input input-bordered rounded-full flex items-center gap-2">
                <input
                  type="text"
                  className="grow rounded-full py-1 px-3"
                  placeholder="Search"
                  value={searchString}
                  onChange={(e) => setSearchString(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                  onClick={handleSubmit}
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </form>
          </div>

          <div className="mx-auto max-w-screen-md flex flex-col gap-4">
            <div className="my-8 flex justify-center">
              <div className="form-control">
                <label className="label cursor-pointer flex-col w-12">
                  <span className="label-text text-xl">
                    {showComponent ? "Movies" : "TV"}
                  </span>
                  <input
                    type="checkbox"
                    className="toggle"
                    onChange={toggleComponent}
                  />
                </label>
              </div>
            </div>
            {showComponent ? (
              //showing movies result
              searchDatas.length > 0 ? (
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
                            ? `https://image.tmdb.org/t/p/w342/${poster_path}`
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
              ) : (
                <div className="min-h-[250px]">
                  <p>Movies Not Exist</p>
                </div>
              )
            ) : //showing tv series results
            searchTVDatas.length > 0 ? (
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
                          ? `https://image.tmdb.org/t/p/w342/${poster_path}`
                          : "https://placehold.co/185x278?text=Data+Unavailable"
                      }
                      title={`${name} (${
                        first_air_date ? first_air_date.substring(0, 4) : "TBA"
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
            ) : (
              <div className="min-h-[250px]">
                <p>TV Series Not Exist</p>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SearchResult;
