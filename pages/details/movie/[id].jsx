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
import { getComments } from "../../../lib/firebaseQuery.js";
import YoutubeIcons from "../../../components/YoutubeIcons";
import RadialRating from "../../../components/RadialRating";
import Hero from "../../../components/Hero";
import Comments from "../../../components/Comments.jsx";
import { formatNumber } from "../../../lib/helper";
import AddToFavorites from "../../../components/AddToFavorites";
import Link from "next/link";

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
  const comments = await getComments(id);

  const props = {
    mediaDetails: {
      original_title: mediaDetails.original_title,
      backdrop_path: mediaDetails.backdrop_path,
      poster_path: mediaDetails.poster_path,
      release_date: mediaDetails.release_date,
      title: mediaDetails.title,
      tagline: mediaDetails.tagline,
      genres: mediaDetails.genres,
      vote_average: mediaDetails.vote_average,
      overview: mediaDetails.overview,
      runtime: mediaDetails.runtime,
      budget: mediaDetails.budget,
      revenue: mediaDetails.revenue,
      id: mediaDetails.id,
    },
    casts: casts.map((c) => ({
      profile_path: c.profile_path,
      name: c.name,
      character: c.character,
      id: c.id,
    })),
    crews: crews.filter((el) => el.job === "Director"),
    picSelected: picSelected
      .slice(0, 50)
      .map((pic) => ({ file_path: pic.file_path })),
    videoSelected: videoSelected.map((video) => ({
      key: video.key,
      name: video.name,
    })),
    similarData: similarData.map((similar) => ({
      id: similar.id,
      poster_path: similar.poster_path,
      title: similar.title,
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
  // console.log({
  //   mediaDetails: mediaDetails,
  //   casts: casts,
  //   crews: crews,
  //   picSelected: picSelected,
  //   videoSelected: videoSelected,
  //   similarData: similarData,
  //   comments: comments,
  // });

  const directorName = crews.length > 0 ? crews[0].name : "data not available";
  const titleName = `${
    mediaDetails.original_title
  } (${mediaDetails.release_date.substring(0, 4)}) | ALEFAST`;

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

  const payload = { id, title, poster_path };

  return (
    <>
      <Head>
        <title>{titleName}</title>
        <meta
          name="description"
          content={`${title} is a movie released in ${release_date.substring(
            0,
            4
          )} directed by ${directorName}. It has a rating of ${vote_average} by the users. It has a runtime of ${runtime} minutes. It has a budget of ${formatNumber(
            budget
          )} and a revenue of ${formatNumber(revenue)}`}
        />
        <meta
          name="keywords"
          content={`${title}, movies, ${release_date.substring(
            0,
            4
          )}, ${vote_average}, ${runtime}, ${budget}, ${revenue}`}
        />
        <meta property="og:title" content={`${title} | ALEFAST`} />
        <meta
          property="og:description"
          content={`${title} is a movie released in ${release_date.substring(
            0,
            4
          )} directed by ${directorName}. It has a rating of ${vote_average} by the users. It has a runtime of ${runtime} minutes. It has a budget of ${formatNumber(
            budget
          )} and a revenue of ${formatNumber(revenue)}`}
        />
        <meta
          property="og:image"
          content={`https://image.tmdb.org/t/p/w342${poster_path}`}
        />
        <meta
          property="og:url"
          content={`https://alefast.vercel.app/details/movie/${id}`}
        />
        <meta name="twitter:title" content={`${title} | ALEFAST`} />
        <meta
          name="twitter:description"
          content={`${title} is a movie released in ${release_date.substring(
            0,
            4
          )} directed by ${directorName}. It has a rating of ${vote_average} by the users. It has a runtime of ${runtime} minutes. It has a budget of ${formatNumber(
            budget
          )} and a revenue of ${formatNumber(revenue)}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Layout>
        <Hero
          backdrop_path={backdrop_path}
          release_date={release_date.substring(0, 4)}
          title={title}
          tagline={tagline}
        />

        <div className="max-w-5xl px-4 mx-auto flex flex-col gap-12 my-12">
          <div className="flex flex-col gap-8">
            <div className="flex gap-y-2 flex-wrap">
              {genres.map((genre) => (
                <Link
                  key={genre.id}
                  href={`/discover?media_type=movie&genreId=${genre.id}`}
                >
                  <div className="btn btn-outline rounded-full mr-2">
                    {genre.name}
                  </div>
                </Link>
              ))}
            </div>
            <RadialRating rating={vote_average} size="4rem" />
            <AddToFavorites payload={payload} />
            <div>
              <article className="overview">
                <h3 className="text-2xl font-bold">Overview</h3>
                <p>{overview}</p>
              </article>
              <article className="mt-4">
                <div className="crew">Director: {directorName}</div>
                <div>Runtime: {runtime} minutes</div>
                <div>Budget: ${formatNumber(budget)}</div>
                <div>Box Office: ${formatNumber(revenue)}</div>
                <div>Vote Average: {Math.round(vote_average * 10)}</div>
              </article>
            </div>
          </div>
        </div>

        <section className="md:max-w-5xl md:px-4 md:mx-auto flex flex-col gap-12">
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
                        ? `https://image.tmdb.org/t/p/w185${file_path}`
                        : "https://placehold.co/185x278?text=Data+Unavailable"
                    }
                    link={`https://image.tmdb.org/t/p/original${file_path}`}
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
                  />
                );
              })
            ) : (
              <>Data Unavailable</>
            )}
          </TemplateFront>
        </section>

        <Comments comments={comments} movieId={id} />
      </Layout>
    </>
  );
};

export default mediaDetails;
