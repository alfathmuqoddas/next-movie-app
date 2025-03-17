import { getDiscover, getGenres } from "../../lib/getData";
import Head from "next/head";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { CardGrid } from "../../components/Card";
import { useState, useEffect } from "react";

export const getServerSideProps = async (context) => {
  const {
    page = 1,
    genreId = "",
    primary_year = "",
    media_type = "movie",
  } = await context.query;
  const data = await getDiscover(primary_year, genreId, page, media_type);
  const genres = await getGenres(media_type);
  return {
    props: { data, genres },
  };
};

const Discover = ({ data, genres }) => {
  const router = useRouter();
  const {
    page = 1,
    genreId,
    primary_year,
    media_type = "movie",
  } = router.query;
  const { results, page: dataPage, total_pages, total_results } = data;
  const { genres: genresData } = genres;
  const [customPage, setCustomPage] = useState(page);

  // Ensure input stays in sync with actual page changes
  useEffect(() => {
    setCustomPage(page);
  }, [page]);

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > total_pages) return;
    router.push({
      pathname: "/discover",
      query: { ...router.query, page: newPage },
    });
  };

  const handleGenreChange = (e) => {
    const newGenreId = e.target.value;
    router.push({
      pathname: "/discover",
      query: {
        ...router.query,
        genreId: newGenreId,
      },
    });
  };

  const handleMediaTypeChange = (e) => {
    const newMediaType = e.target.value;
    router.push({
      pathname: "/discover",
      query: {
        ...router.query,
        genreId: "",
        media_type: newMediaType,
      },
    });
  };

  return (
    <>
      <Head>
        <title>Discover | ALEFAST</title>
      </Head>
      <Layout>
        <div className="max-w-5xl px-4 mx-auto flex flex-col gap-12 my-12">
          <div className="flex gap-8">
            <select
              name="genreId"
              id="genreId"
              className="select select-sm"
              onChange={handleGenreChange}
            >
              <option value="" selected={genreId === ""}>
                All Genres
              </option>
              {genresData.map((genre) => (
                <option
                  key={genre.id}
                  value={genre.id}
                  selected={genre.id === Number(genreId)}
                >
                  {genre.name}
                </option>
              ))}
            </select>
            <select
              name="media_type"
              id="media_type"
              className="select select-sm"
              onChange={handleMediaTypeChange}
            >
              <option value="movie" selected={media_type === "movie"}>
                Movies
              </option>
              <option value="tv" selected={media_type === "tv"}>
                TV Series
              </option>
            </select>
          </div>
          <article className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {results.map((result) => (
              <CardGrid
                key={result.id}
                img={
                  result.poster_path
                    ? `https://image.tmdb.org/t/p/w342/${result.poster_path}`
                    : "https://placehold.co/185x278?text=Data+Unavailable"
                }
                title={media_type === "movie" ? result.title : result.name}
                link={`/details/${media_type}/${result.id}`}
              />
            ))}
          </article>
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              className="btn btn-outline btn-sm"
              disabled={Number(page) <= 1}
              onClick={() => goToPage(Number(page) - 1)}
            >
              Previous
            </button>
            <input
              value={customPage}
              onChange={(e) => {
                const value = Number(e.target.value);
                setCustomPage(value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  goToPage(customPage);
                }
              }}
              className="input input-sm input-bordered w-16"
            />
            <p className="text-center">of {total_pages}</p>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => goToPage(Number(page) + 1)}
              disabled={Number(page) >= total_pages}
            >
              Next
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Discover;
