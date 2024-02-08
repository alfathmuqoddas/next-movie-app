import Layout from "../../components/Layout";
import Head from "next/head";
import { lazy, Suspense } from "react";
import { CardSmall } from "../../components/Card";
import TemplateFront from "../../components/TemplateFront";
import {
  getMediaDetails,
  getCreditData,
  getPicsData,
  getVideosData,
  getSimilarData,
} from "../../lib/getData";
import YoutubeIcons from "../../components/YoutubeIcons";
import RadialRating from "../../components/RadialRating";
import Hero from "../../components/Hero";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const mediaDetails = await getMediaDetails("movie", id);
  const { crews, casts } = await getCreditData("movie", id);
  const picSelected = await getPicsData("movie", id);
  const videoSelected = await getVideosData("movie", id);
  const similarData = await getSimilarData("movie", id);

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
  const director =
    crews.length > 0 ? crews.filter((el) => el.job === "Director") : [];

  const directorName =
    director.length > 0 ? director[0].name : "data not available";
  const titleName = `${
    mediaDetails.original_title
  } (${mediaDetails.release_date.substring(0, 4)}) | ALEFAST`;

  const {
    backdrop_path,
    release_date,
    title,
    tagline,
    genres,
    vote_average,
    overview,
    runtime,
    budget,
    revenue,
  } = mediaDetails;

  return (
    <>
      <Head>
        <title>{titleName}</title>
      </Head>
      <Layout>
        <Hero
          backdrop_path={backdrop_path}
          release_date={release_date.substring(0, 4)}
          title={title}
          tagline={tagline}
        />

        <div className="max-w-4xl px-4 mx-auto">
          <div id="text-part">
            <div className="genres">
              <div className="my-2 md:my-5 flex gap-y-2 flex-wrap">
                {genres.map((genre, index) => (
                  <div
                    key={index}
                    className="badge badge-lg badge-outline rounded-full mr-2 p-2 md:p-3"
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
              <div>Runtime: {runtime} minutes</div>
              <div>Budget: {budget.toLocaleString()} USD</div>
              <div>Box Office: {revenue.toLocaleString()} USD</div>
              <div>Vote Average: {Math.round(vote_average * 10)}</div>
            </div>
          </div>
          <TemplateFront
            templateName={"Cast"}
            content={
              casts.length > 0 ? (
                casts.map((cast, index) => {
                  const { profile_path, name, character } = cast;
                  return (
                    <CardSmall
                      key={index}
                      img={
                        profile_path
                          ? `https://image.tmdb.org/t/p/w185/${profile_path}`
                          : "https://placehold.co/185x278?text=Data+Unavailable"
                      }
                      title={name}
                      subtitle={character}
                      size="w-36"
                      link={`https://image.tmdb.org/t/p/w185${profile_path}`}
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
                similarData.map((similarDat) => {
                  const { id, poster_path, title, release_date } = similarDat;
                  return (
                    <CardSmall
                      key={id}
                      link={`/details/${id}`}
                      img={
                        poster_path
                          ? `https://image.tmdb.org/t/p/w185/${poster_path}`
                          : "https://placehold.co/185x278?text=Data+Unavailable"
                      }
                      title={`${title} (${release_date.slice(0, 4)})`}
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
