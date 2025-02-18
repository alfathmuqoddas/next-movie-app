import Layout from "../../../components/Layout";
//import { lazy, Suspense } from "react";
import Head from "next/head";
import { CardSmall, CardHorizontal } from "../../../components/Card";
import TemplateFront from "../../../components/TemplateFront";
import {
  getMediaDetails,
  getPicsData,
  getCreditData,
  getVideosData,
  getSimilarData,
} from "../../../lib/getData";
import { getComments } from "../../../lib/firebaseQuery";
import YoutubeIcons from "../../../components/YoutubeIcons";
import RadialRating from "../../../components/RadialRating";
import Hero from "../../../components/Hero";
import Comments from "../../../components/Comments";
import AddToFavorites from "../../../components/AddToFavorites";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const [mediaDetails, credits, pic, vid, similarDataRes] = await Promise.all([
    getMediaDetails("tv", id),
    getCreditData("tv", id),
    getPicsData("tv", id),
    getVideosData("tv", id),
    getSimilarData("tv", id),
  ]);

  const { posters: picSelected } = pic;
  const { results: videoSelected } = vid;
  const { results: similarData } = similarDataRes;
  const { cast: casts, crew: crews } = credits;

  const comments = await getComments(id);

  const props = {
    mediaDetails: {
      name: mediaDetails.name,
      first_air_date: mediaDetails.first_air_date,
      last_air_date: mediaDetails.last_air_date,
      backdrop_path: mediaDetails.backdrop_path,
      poster_path: mediaDetails.poster_path,
      tagline: mediaDetails.tagline,
      genres: mediaDetails.genres,
      overview: mediaDetails.overview,
      vote_average: mediaDetails.vote_average,
      episode_run_time: mediaDetails.episode_run_time,
      number_of_episodes: mediaDetails.number_of_episodes,
      number_of_seasons: mediaDetails.number_of_seasons,
      networks: mediaDetails.networks,
      seasons: mediaDetails.seasons,
      id: mediaDetails.id,
    },
    casts: casts.map((c) => ({
      profile_path: c.profile_path,
      name: c.name,
      character: c.character,
      id: c.id,
    })),
    crews: crews.filter((el) => el.job === "Director"),
    picSelected: picSelected.slice(0, 50).map((pic) => ({
      file_path: pic.file_path,
    })),
    videoSelected: videoSelected.map((video) => ({
      key: video.key,
      name: video.name,
    })),
    similarData: similarData.map((similar) => ({
      id: similar.id,
      poster_path: similar.poster_path,
      name: similar.name,
    })),
    comments,
  };

  const dataSize = JSON.stringify(props).length;
  console.log(`Data size: ${dataSize / 1024} KB`);

  return {
    props,
  };
}

export const mediaDetails = ({
  mediaDetails,
  casts,
  crews,
  picSelected,
  videoSelected,
  similarData,
  comments,
}) => {
  const {
    name,
    first_air_date,
    last_air_date,
    backdrop_path,
    poster_path,
    tagline,
    genres,
    overview,
    vote_average,
    episode_run_time,
    number_of_episodes,
    number_of_seasons,
    networks,
    seasons,
    id,
  } = mediaDetails;

  const payload = { id, title: name, poster_path };

  const directorName = crews.length > 0 ? crews[0].name : "data not available";
  const titleName = `${mediaDetails.name} (${first_air_date.substring(
    0,
    4
  )}) | ALEFAST`;

  return (
    <>
      <Head>
        <title>{titleName}</title>
        <meta
          name="description"
          content={`${name} is a movie released in ${last_air_date.substring(
            0,
            4
          )}. It has a rating of ${vote_average} by the users. It has ${number_of_seasons} seasons`}
        />
        <meta
          name="keywords"
          content={`${name}, series, ${last_air_date.substring(
            0,
            4
          )}, ${vote_average}, ${number_of_seasons} seasons`}
        />
        <meta property="og:title" content={`${name} | ALEFAST`} />
        <meta
          property="og:description"
          content={`${name} is a series released in ${last_air_date.substring(
            0,
            4
          )}. It has a rating of ${vote_average} by the users.`}
        />
        <meta
          property="og:image"
          content={`https://image.tmdb.org/t/p/w342${poster_path}`}
        />
        <meta
          property="og:url"
          content={`https://alefast.vercel.app/details/tv/${id}`}
        />
        <meta name="twitter:title" content={`${name} | ALEFAST`} />
        <meta
          name="twitter:description"
          content={`${name} is a series released in ${last_air_date.substring(
            0,
            4
          )}. It has a rating of ${vote_average} by the users.`}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Layout>
        <Hero
          backdrop_path={backdrop_path}
          release_date={`${first_air_date.substring(
            0,
            4
          )} - ${last_air_date.substring(0, 4)}`}
          title={name}
          tagline={tagline}
        />
        <div className="max-w-5xl px-4 mx-auto flex flex-col gap-12 my-12">
          <div className="flex flex-col gap-8">
            <div className="flex gap-y-2 flex-wrap">
              {genres.map((genre, index) => (
                <div key={index} className="btn btn-outline rounded-full mr-2">
                  {genre.name}
                </div>
              ))}
            </div>
            <RadialRating rating={vote_average} size="4rem" />
            <AddToFavorites payload={payload} type="tv" />
            <div>
              <div className="overview">
                <h3 className="text-2xl font-bold">Overview</h3>
                <p>{overview}</p>
              </div>
              <div className="mt-4">
                <div className="crew">Director: {directorName}</div>
                <div>Runtime: {episode_run_time[0]} minutes</div>
                <div>Number of Episodes: {number_of_episodes}</div>
                <div>Number of Seasons: {number_of_seasons}</div>
                <div>Networks: {networks[0].name}</div>
                <div>Vote Average: {Math.round(vote_average * 10)}</div>
              </div>
            </div>
          </div>

          <div className="px-4 border rounded-[20px] border-neutral-500">
            <h3 className="text-2xl font-bold py-4">Seasons</h3>
            <div className="max-h-[360px] overflow-auto flex flex-col gap-4 pb-4">
              {seasons.map((season) => {
                const {
                  air_date,
                  episode_count,
                  id,
                  name,
                  overview,
                  poster_path,
                  //season_number,
                  vote_average,
                } = season;
                return (
                  <div key={id}>
                    <CardHorizontal
                      title={name}
                      subtitle={
                        overview
                          ? overview.length > 240
                            ? overview.substring(0, 240) + "..."
                            : overview
                          : "Description data not exist"
                      }
                      img={
                        poster_path
                          ? `https://image.tmdb.org/t/p/w342${poster_path}`
                          : "https://placehold.co/185x278?text=Data+Unavailable"
                      }
                      imgWidth="342"
                      imgHeight="513"
                      subtitle2={`${
                        air_date ? air_date.substring(0, 4) : "Data Unavailable"
                      }, ${episode_count} Episode(s)`}
                      subtitle3={
                        <RadialRating rating={vote_average} size="2rem" />
                      }
                      imgSize={"36"}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="md:max-w-5xl md:px-4 md:mx-auto flex flex-col gap-12">
          <TemplateFront templateName={"Cast"}>
            {casts.length > 0 ? (
              casts.map((cast, index) => {
                const { profile_path, name, character, id } = cast;
                return (
                  <CardSmall
                    key={index}
                    img={
                      profile_path
                        ? `https://image.tmdb.org/t/p/w185${profile_path}`
                        : "https://placehold.co/185x278?text=Data+Unavailable"
                    }
                    title={name}
                    subtitle={character}
                    size="w-32"
                    link={`/celebrity/${id}`}
                    cast
                  />
                );
              })
            ) : (
              <>Data Unavailable</>
            )}
          </TemplateFront>

          <TemplateFront templateName={"Pictures"}>
            {picSelected.length > 0 ? (
              picSelected.map((picSelect, index) => {
                const { file_path } = picSelect;
                return (
                  <CardSmall
                    key={index}
                    img={
                      file_path
                        ? `https://image.tmdb.org/t/p/w185/${file_path}`
                        : "https://placehold.co/185x278?text=Data+Unavailable"
                    }
                    link={`https://image.tmdb.org/t/p/original${file_path}`}
                    size="w-36"
                  />
                );
              })
            ) : (
              <>Data Unavailable</>
            )}
          </TemplateFront>

          <TemplateFront templateName={"Videos"}>
            {videoSelected.length > 0 ? (
              videoSelected.map((vidSelect) => {
                const { key, name } = vidSelect;
                return (
                  <CardSmall
                    key={key}
                    link={`https://youtube.com/watch?v=${key}`}
                    img={`https://img.youtube.com/vi/${key}/0.jpg`}
                    title={<YoutubeIcons />}
                    subtitle={
                      name.length > 32 ? `${name.substring(0, 32)}...` : name
                    }
                    size="w-64"
                    imgWidth="480"
                    imgHeight="360"
                    video={true}
                  />
                );
              })
            ) : (
              <>Data Unavailable</>
            )}
          </TemplateFront>

          <TemplateFront templateName={"Recommendations"}>
            {similarData.length > 0 ? (
              similarData.map((similarDat, index) => {
                const { id, poster_path, name } = similarDat;
                return (
                  <CardSmall
                    key={index}
                    link={`/details/tv/${id}`}
                    img={
                      poster_path
                        ? `https://image.tmdb.org/t/p/w185/${poster_path}`
                        : "https://placehold.co/185x278?text=Data+Unavailable"
                    }
                    title={name}
                    size="w-36"
                  />
                );
              })
            ) : (
              <>Data Unavailable</>
            )}
          </TemplateFront>
        </div>

        <div className="max-w-4xl px-4 mx-auto mt-12">
          <Comments comments={comments} movieId={id} />
        </div>
      </Layout>
    </>
  );
};

export default mediaDetails;
