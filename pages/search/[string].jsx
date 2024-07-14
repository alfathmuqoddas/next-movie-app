import Layout from "../../components/Layout";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { CardHorizontal } from "../../components/Card";
import RadialRating from "../../components/RadialRating";
import { queryData } from "../../lib/getData";
import RadioButtonGroup from "../../components/RadioButtonGroup";
import SearchLogo from "../../components/SearchLogo";

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
  const [showComponent, setShowComponent] = useState("movie");
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

  const handleToggle = (e) => {
    setShowComponent(e.target.value);
  };

  const content = [
    { value: "movie", label: "Movie" },
    { value: "tv", label: "TV" },
    ,
  ];

  return (
    <>
      <Head>
        <title>Search results for {string} | ALEFAST</title>
      </Head>
      <Layout>
        <div className="container max-w-4xl px-4 mx-auto">
          <div className="mt-8 xl:hidden">
            <form onSubmit={handleSubmit}>
              <label className="input input-bordered rounded-full flex items-center gap-2">
                <input
                  type="text"
                  className="grow rounded-full py-1 px-3"
                  placeholder="Search"
                  value={searchString}
                  onChange={(e) => setSearchString(e.target.value)}
                />
                <SearchLogo />
              </label>
            </form>
          </div>

          <div className="">
            <div className="flex justify-center">
              <div className="flex border rounded-full my-8">
                <RadioButtonGroup
                  contents={content}
                  checkedFunction={showComponent}
                  onChange={handleToggle}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {showComponent === "movie" ? (
                //showing movies result
                searchDatas.length > 0 ? (
                  searchDatas.map((searchDat) => {
                    const {
                      id,
                      poster_path,
                      title: titleData,
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
                          title={`${titleData} (${
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
                })
              ) : (
                <div className="min-h-[250px]">
                  <p>TV Series Not Exist</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SearchResult;
