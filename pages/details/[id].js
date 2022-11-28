import Layout from "../../components/Layout";
import Head from "next/head";
import { CardSmall } from "../../components/Card";
import TemplateFront from "../../components/TemplateFront";
import Image from "next/image";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=403829fffc80d8184aa974d631a475c5&language=en-US`
  );
  const credits = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=403829fffc80d8184aa974d631a475c5&language=en-US`
  );
  const movieDetails = await res.json();
  const credit = await credits.json();
  const casts = credit.cast.slice(0, 10);
  const crews = credit.crew;

  return {
    props: {
      movieDetails,
      casts,
      crews,
    },
  };
}

export const MovieDetails = ({ movieDetails, casts, crews }) => {
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
          <Image
            src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
            alt="movie backdrop"
            width={3840}
            height={2160}
            quality={50}
            layout="responsive"
            className="rounded-2xl opacity-60"
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
                  className="badge badge-lg badge-outline mr-2 p-2 md:p-3"
                >
                  {genre.name}
                </div>
              ))}
            </div>
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
            <div>Vote Average: {movieDetails.vote_average}</div>
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
        </div>
      </Layout>
    </>
  );
};

export default MovieDetails;
