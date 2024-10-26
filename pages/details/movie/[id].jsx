import Layout from "../../../components/Layout";
import Head from "next/head";
// import { useEffect } from "react";
// import { lazy, Suspense } from "react";
import { CardSmall } from "../../../components/Card";
import TemplateFront from "../../../components/TemplateFront";
import {
  getMediaDetails,
  getCreditData,
  getPicsData,
  getVideosData,
  getSimilarData,
} from "../../../lib/getData";
import YoutubeIcons from "../../../components/YoutubeIcons";
import RadialRating from "../../../components/RadialRating";
import Hero from "../../../components/Hero";
import AddToFavorites from "../../../components/AddToFavorites";
import useAuthStore from "../../../store/useAuthStore";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const [mediaDetails, credits, pic, vid, similarDataRes] = await Promise.all([
    getMediaDetails("movie", id),
    getCreditData("movie", id),
    getPicsData("movie", id),
    getVideosData("movie", id),
    getSimilarData("movie", id),
  ]);

  const { posters: picSelected } = pic;
  const { results: videoSelected } = vid;
  const { results: similarData } = similarDataRes;
  const { cast: casts, crew: crews } = credits;

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

  const { userData } = useAuthStore();

  const {
    backdrop_path,
    poster_path,
    release_date,
    title,
    tagline,
    genres,
    vote_average,
    overview,
    runtime,
    budget,
    revenue,
    id,
  } = mediaDetails;

  function formatNumber(num) {
    let formattedNum;

    if (num >= 1e9) {
      formattedNum = (num / 1e9).toFixed(2) + " billion";
    } else if (num >= 1e6) {
      formattedNum = (num / 1e6).toFixed(2) + " million";
    } else if (num >= 1e3) {
      formattedNum = (num / 1e3).toFixed(2) + " thousand";
    } else {
      formattedNum = num.toString();
    }

    // Remove trailing zeros
    formattedNum = formattedNum.replace(/\.00\b/, "");

    return formattedNum;
  }

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

        <div className="max-w-4xl px-4 mx-auto flex flex-col gap-12 mt-12">
          <div className="flex flex-col gap-8">
            <div className="flex gap-y-2 flex-wrap">
              {genres.map((genre, index) => (
                <div key={index} className="btn btn-outline rounded-full mr-2">
                  {genre.name}
                </div>
              ))}
            </div>
            <RadialRating rating={vote_average} size="4rem" />
            <div>
              <div className="overview">
                <h3 className="text-2xl font-bold">Overview</h3>
                <p>{overview}</p>
              </div>
              <div className="mt-4">
                <div className="crew">Director: {directorName}</div>
                <div>Runtime: {runtime} minutes</div>
                <div>Budget: ${formatNumber(budget)}</div>
                <div>Box Office: ${formatNumber(revenue)}</div>
                <div>Vote Average: {Math.round(vote_average * 10)}</div>
              </div>
            </div>
          </div>

          <hr className="border-neutral-900" />

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
                    size="w-36"
                    link={`/celebrity/${id}`}
                  />
                );
              })
            ) : (
              <>Data Unavailable</>
            )}
          </TemplateFront>

          <hr className="border-neutral-900" />

          <TemplateFront templateName={"Pictures"}>
            {picSelected.length > 0 ? (
              picSelected.map((picSelect, index) => {
                const { file_path } = picSelect;
                return (
                  <CardSmall
                    key={index}
                    img={
                      file_path
                        ? `https://image.tmdb.org/t/p/w185${file_path}`
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

          <hr className="border-neutral-900" />

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
                    video={true}
                  />
                );
              })
            ) : (
              <>Data Unavailable</>
            )}
          </TemplateFront>

          <hr className="border-neutral-900" />

          <TemplateFront templateName={"Recommendations"}>
            {similarData.length > 0 ? (
              similarData.map((similarDat) => {
                const { id, poster_path, title } = similarDat;
                return (
                  <CardSmall
                    key={id}
                    link={`/details/movie/${id}`}
                    img={
                      poster_path
                        ? `https://image.tmdb.org/t/p/w185/${poster_path}`
                        : "https://placehold.co/185x278?text=Data+Unavailable"
                    }
                    title={title}
                    size="w-36"
                  />
                );
              })
            ) : (
              <>Data Unavailable</>
            )}
          </TemplateFront>
        </div>
      </Layout>
    </>
  );
};

export default mediaDetails;
