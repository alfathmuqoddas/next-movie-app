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
import YoutubeIcons from "../../../components/YoutubeIcons";
import RadialRating from "../../../components/RadialRating";
import Hero from "../../../components/Hero";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const mediaDetails = await getMediaDetails("tv", id);
  const { crews, casts } = await getCreditData("tv", id);
  const picSelected = await getPicsData("tv", id);
  const videoSelected = await getVideosData("tv", id);
  const similarData = await getSimilarData("tv", id);

  return {
    props: {
      mediaDetails,
      casts,
      crews,
      picSelected,
      videoSelected,
      similarData,
    },
  };
}

export const mediaDetails = ({
  mediaDetails,
  casts,
  crews,
  picSelected,
  videoSelected,
  similarData,
}) => {
  const {
    name,
    first_air_date,
    last_air_date,
    backdrop_path,
    tagline,
    genres,
    overview,
    vote_average,
    episode_run_time,
    number_of_episodes,
    number_of_seasons,
    networks,
    seasons,
  } = mediaDetails;

  const director =
    crews.length > 0 ? crews.filter((el) => el.job === "Director") : [];

  const directorName =
    director.length > 0 ? director[0].name : "data not available";
  const titleName = `${mediaDetails.name} (${first_air_date.substring(
    0,
    4
  )}) | ALEFAST`;

  return (
    <>
      <Head>
        <title>{titleName}</title>
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
        <div className="max-w-4xl px-4 mx-auto">
          <div id="text-part">
            <div className="genres">
              <div className="my-2 md:my-5 flex gap-y-2 flex-wrap">
                {genres.map((genre, index) => (
                  <div
                    key={index}
                    className="btn btn-outline rounded-full mr-2"
                  >
                    {genre.name}
                  </div>
                ))}
              </div>
            </div>
            <RadialRating rating={vote_average} size="4rem" />
            <div className="overview my-5">
              <h3 className="text-2xl">Overview</h3>
              <p>{overview}</p>
            </div>
            <div className="mb-5">
              <div className="crew">Director: {directorName}</div>
              <div>Runtime: {episode_run_time[0]} minutes</div>
              <div>Number of Episodes: {number_of_episodes}</div>
              <div>Number of Seasons: {number_of_seasons}</div>
              <div>Networks: {networks[0].name}</div>
              <div>Vote Average: {Math.round(vote_average * 10)}</div>
            </div>
          </div>

          <div className="my-5">
            <h3 className="text-2xl py-5">Seasons</h3>
            <div className="max-h-[360px] overflow-auto">
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
                          ? `https://image.tmdb.org/t/p/w92${poster_path}`
                          : "https://placehold.co/92x138?text=Data+Unavailable"
                      }
                      subtitle2={`${
                        air_date ? air_date.substring(0, 4) : "Data Unavailable"
                      }, ${episode_count} Episode(s)`}
                      subtitle3={
                        <RadialRating rating={vote_average} size="2rem" />
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <TemplateFront
            templateName={"Cast"}
            content={
              casts.length > 0 ? (
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
                      size="w-36"
                      link={`/celebrity/${id}`}
                    />
                  );
                })
              ) : (
                <>Data Unavailable</>
              )
            }
          />
          <TemplateFront
            templateName={"Pictures"}
            content={
              picSelected.length > 0 ? (
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
              )
            }
          />
          <TemplateFront
            templateName={"Videos"}
            content={
              videoSelected.length > 0 ? (
                videoSelected.map((vidSelect) => {
                  const { key, name } = vidSelect;
                  return (
                    <CardSmall
                      key={key}
                      link={`https://youtube.com/watch?v=${key}`}
                      img={`https://img.youtube.com/vi/${key}/0.jpg`}
                      flexSubtitle1={<YoutubeIcons />}
                      flexSubtitle2={
                        name.length > 32 ? `${name.substring(0, 32)}...` : name
                      }
                      size="w-64"
                    />
                  );
                })
              ) : (
                <>Data Unavailable</>
              )
            }
          />

          <TemplateFront
            templateName={"Recommendations"}
            content={
              similarData.length > 0 ? (
                similarData.map((similarDat, index) => {
                  const { id, poster_path, name, first_air_date } = similarDat;
                  return (
                    <CardSmall
                      key={index}
                      link={`/details/tv/${id}`}
                      img={
                        poster_path
                          ? `https://image.tmdb.org/t/p/w185/${poster_path}`
                          : "https://placehold.co/185x278?text=Data+Unavailable"
                      }
                      title={`${name} (${first_air_date.slice(0, 4)})`}
                      size="w-36"
                    />
                  );
                })
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

export default mediaDetails;
