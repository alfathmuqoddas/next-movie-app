import Layout from "../../components/Layout";
import Head from "next/head";
import { CardSmall } from "../../components/Card";
import TemplateFront from "../../components/TemplateFront";
import {
  getMovieDetails,
  getCreditData,
  getPicsData,
  getVideosData,
} from "../../lib/getData";
import YoutubeIcons from "../../components/YoutubeIcons";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const movieDetails = await getMovieDetails(id);
  const { crews, casts } = await getCreditData(id);
  const picSelected = await getPicsData(id);
  const videoSelected = await getVideosData(id);

  return {
    props: {
      movieDetails,
      casts,
      crews,
      picSelected,
      videoSelected,
    },
  };
}

export const MovieDetails = ({
  movieDetails,
  casts,
  crews,
  picSelected,
  videoSelected,
}) => {
  const director =
    crews.length > 0 ? crews.filter((el) => el.job === "Director") : [];

  const directorName =
    director.length > 0 ? director[0].name : "data not available";
  const titleName = `${
    movieDetails.original_title
  } (${movieDetails.release_date.substring(0, 4)}) | ALEFAST`;

  return (
    <>
      <Head>
        <title>{titleName}</title>
      </Head>
      <Layout>
        <div className="relative">
          <img
            src={
              movieDetails.backdrop_path
                ? `https://image.tmdb.org/t/p/w1280/${movieDetails.backdrop_path}`
                : "https://placehold.co/1280x720"
            }
            alt="movie backdrop"
            className="rounded-2xl opacity-60 object-cover min-w-full"
          />
          <div className="absolute md:bottom-1/3 bottom-0 left-0 p-5">
            <h6 className="text-white md:text-xl p-0">
              {movieDetails.release_date.substring(0, 4)}
            </h6>
            <h1 className="text-xl xl:text-7xl md:text-5xl font-bold text-white">
              {movieDetails.title.toUpperCase()}
            </h1>
            <h4 className="md:text-xl text-white italic">
              {movieDetails.tagline}
            </h4>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div id="text-part">
            <div className="genres">
              <div className="my-2 md:my-5 flex gap-y-2 flex-wrap">
                {movieDetails.genres.map((genre, index) => (
                  <div
                    key={index}
                    className="badge badge-lg badge-outline rounded-full mr-2 p-2 md:p-3"
                  >
                    {genre.name}
                  </div>
                ))}
              </div>
            </div>
            <div
              className="mt-2 radial-progress bg-primary text-primary-content border-4 border-primary"
              style={{
                "--value": movieDetails.vote_average * 10,
                "--size": "4rem",
              }}
            >
              {Math.trunc(movieDetails.vote_average * 10)}
            </div>
            <div className="overview my-5">
              <h3 className="text-2xl">Overview</h3>
              <p>{movieDetails.overview}</p>
            </div>
            <div className="mb-5">
              <div className="crew">Director: {directorName}</div>
              <div>Runtime: {movieDetails.runtime} minutes</div>
              <div>Budget: {movieDetails.budget.toLocaleString()} USD</div>
              <div>Box Office: {movieDetails.revenue.toLocaleString()} USD</div>
              <div>
                Vote Average: {Math.round(movieDetails.vote_average * 10)}
              </div>
            </div>
          </div>
          <TemplateFront
            templateName={"Cast"}
            content={
              casts.length > 0 ? (
                casts.map((cast, index) => (
                  <CardSmall
                    key={index}
                    img={
                      cast.profile_path
                        ? `https://image.tmdb.org/t/p/w185/${cast.profile_path}`
                        : "https://placehold.co/185x278?text=Data+Unavailable"
                    }
                    title={cast.name}
                    subtitle={cast.character}
                    size="w-36"
                  />
                ))
              ) : (
                <>Data Unavailable</>
              )
            }
          />
          <TemplateFront
            templateName={"Pictures"}
            content={
              picSelected.length > 0 ? (
                picSelected.map((picSelect, index) => (
                  <CardSmall
                    key={index}
                    img={
                      picSelect.file_path
                        ? `https://image.tmdb.org/t/p/w185/${picSelect.file_path}`
                        : "https://placehold.co/185x278?text=Data+Unavailable"
                    }
                    link={`https://image.tmdb.org/t/p/original${picSelect.file_path}`}
                    size="w-36"
                  />
                ))
              ) : (
                <>Data Unavailable</>
              )
            }
          />
          <TemplateFront
            templateName={"Videos"}
            content={
              videoSelected.length > 0 ? (
                videoSelected.map((vidSelect, index) => (
                  <CardSmall
                    key={index}
                    link={`https://youtube.com/watch?v=${vidSelect.key}`}
                    img={`https://img.youtube.com/vi/${vidSelect.key}/0.jpg`}
                    title={
                      vidSelect.name.length > 32
                        ? `${vidSelect.name.substring(0, 32)}...`
                        : vidSelect.name
                    }
                    subtitle={<YoutubeIcons />}
                    size="w-64"
                  />
                ))
              ) : (
                <>Data Unavailable</>
              )
            }
          />
        </div>
      </Layout>
    </>
  );
};

export default MovieDetails;
