import { CastCard, GalleryCard, VideoCard } from "@/components/card/index";
import CardWrap from "@/components/Card";
import TemplateFront from "../../../../components/TemplateFront";
import {
  getMediaDetails,
  getCreditData,
  getPicsData,
  getVideosData,
  getSimilarData,
} from "../../../../lib/getData";
import RadialRating from "../../../../components/RadialRating";
import Hero from "../../../../components/Hero";
import Comments from "../../../../components/comment/Comments";
import { formatNumber } from "../../../../lib/helper";
import AddToFavorites from "../../../../components/AddToFavorites";
import ScrollRestore from "@/components/ScrollRestore";
import Link from "next/link";

async function getMovieDetails(id: string) {
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
    mediaDetails,
    picSelected,
    videoSelected,
    similarData,
    casts,
    crews,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<any> {
  const { id: movieId } = await params;
  const { mediaDetails } = await getMovieDetails(movieId);

  return {
    title: mediaDetails.title + " | ALEFAST",
    description: mediaDetails.overview,
    openGraph: {
      title: mediaDetails.title,
      description: mediaDetails.overview,
      images: [
        {
          url: `https://image.tmdb.org/t/p/w342${mediaDetails.poster_path}`,
          width: 342,
          height: 513,
          alt: mediaDetails.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: mediaDetails.title,
      description: mediaDetails.overview,
      images: [
        {
          url: `https://image.tmdb.org/t/p/w342${mediaDetails.poster_path}`,
          width: 342,
          height: 513,
          alt: mediaDetails.title,
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: movieId } = await params;
  const {
    mediaDetails,
    casts,
    crews,
    picSelected,
    videoSelected,
    similarData,
  } = await getMovieDetails(movieId);

  const directorName = crews?.filter((el) => el.job === "Director")[0]?.name;

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
      <ScrollRestore />
      <Hero
        backdrop_path={backdrop_path}
        release_date={release_date.substring(0, 4)}
        title={title}
        tagline={tagline}
      />

      <section className="md:max-w-5xl md:px-4 md:mx-auto flex flex-col gap-12">
        <div className="px-4 md:px-0">
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
        </div>

        <div className="px-4 md:px-0">
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

        <TemplateFront templateName={"Cast"}>
          {casts.length > 0 ? (
            casts.map((cast: any) => {
              const { profile_path, name, character, id } = cast;
              return (
                <CastCard
                  key={id}
                  img={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w185${profile_path}`
                      : "https://placehold.co/185x278?text=Data+Unavailable"
                  }
                  title={name}
                  subtitle={character}
                  link={`/celebrity/${id}`}
                />
              );
            })
          ) : (
            <>Data Unavailable</>
          )}
        </TemplateFront>

        <TemplateFront templateName={"Pictures"}>
          {picSelected.length > 0 ? (
            picSelected.map((picSelect: { file_path: string }) => {
              const { file_path } = picSelect;
              return (
                <GalleryCard
                  key={file_path}
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
                <VideoCard
                  key={key}
                  link={`https://youtube.com/watch?v=${key}`}
                  img={`https://img.youtube.com/vi/${key}/0.jpg`}
                  subtitle={
                    name.length > 32 ? `${name.substring(0, 32)}...` : name
                  }
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
              const { id, poster_path, title, media_type } = similarDat;
              return (
                <CardWrap
                  key={id}
                  content={{ id, poster_path, title, media_type }}
                  size="w-24 lg:w-36"
                  link="/movie"
                />
              );
            })
          ) : (
            <>Data Unavailable</>
          )}
        </TemplateFront>
        <Comments movieId={movieId} />
      </section>
    </>
  );
}
