import Layout from "../../components/Layout";
import Head from "next/head";
import { CardSmall, CardYoutube } from "../../components/Card";
import TemplateFront from "../../components/TemplateFront";
import {
  getMovieDetails,
  getCreditData,
  getPicsData,
  getVideosData,
} from "../../lib/getData";

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
  const director = crews.filter((el) => {
    return el.job === "Director";
  });

  const directorName = director[0].name;
  const titleName = `${
    movieDetails.original_title
  } (${movieDetails.release_date.substring(0, 4)}) | ALEFAST`;

  return (
    <>
      <Head>
        <title>{titleName}</title>
      </Head>
      <Layout>
        <div className="relative min-w-fit">
          <img
            src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
            alt="movie backdrop"
            className="rounded-2xl opacity-60 object-cover"
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
            <p className="font-bold">Overview</p>
            <p>{movieDetails.overview}</p>
          </div>
          <div className="mb-5">
            <div className="crew">Director: {directorName}</div>
            <div>Runtime: {movieDetails.runtime} minutes</div>
            <div>Budget: {movieDetails.budget.toLocaleString()} USD</div>
            <div>Box Office: {movieDetails.revenue.toLocaleString()} USD</div>
            <div>Vote Average: {movieDetails.vote_average * 10}</div>
          </div>
          <TemplateFront
            templateName={"Cast"}
            content={casts.map((cast) => (
              <CardSmall
                key={cast.id}
                img={cast.profile_path}
                title={cast.name}
                subtitle={cast.character}
              />
            ))}
          />
          <TemplateFront
            templateName={"Pictures"}
            content={picSelected.map((picSelect) => (
              <a
                key={picSelect.index}
                href={`https://image.tmdb.org/t/p/original${picSelect.file_path}`}
                target="_blank"
                rel="noreferrer"
              >
                <CardSmall img={picSelect.file_path} />
              </a>
            ))}
          />
          <TemplateFront
            templateName={"Videos"}
            content={videoSelected.map((vidSelect) => (
              <CardYoutube
                key={vidSelect.id}
                link={vidSelect.key}
                img={vidSelect.key}
                title={vidSelect.name}
                subtitle={vidSelect.site}
              />
            ))}
          />
        </div>
      </Layout>
    </>
  );
};

export default MovieDetails;
