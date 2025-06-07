import {
  CastCard,
  GalleryCard,
  VideoCard,
  SeasonsCard,
} from "@/components/card/index";
import CardWrap from "@/components/Card";
import TemplateFront from "@/components/TemplateFront";
import {
  getMediaDetails,
  getPicsData,
  getCreditData,
  getVideosData,
  getSimilarData,
} from "@/lib/getData";
import RadialRating from "@/components/RadialRating";
import Hero from "@/components/Hero";
import Comments from "@/components/comment/Comments";
import AddToFavorites from "@/components/AddToFavorites";
import ScrollRestore from "@/components/ScrollRestore";
import Link from "next/link";
import { formatNumber } from "@/lib/helper";

async function getDetailsData(id: string, mediaType: "tv" | "movie") {
  const [mediaDetails, credits, pic, vid, similarDataRes] = await Promise.all([
    getMediaDetails(mediaType, id),
    getCreditData(mediaType, id),
    getPicsData(mediaType, id),
    getVideosData(mediaType, id),
    getSimilarData(mediaType, id),
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
  params: Promise<{ id: string; mediaType: "tv" | "movie" }>;
}) {
  const { id: mediaId, mediaType } = await params;
  const { mediaDetails } = await getDetailsData(mediaId, mediaType);

  let mediaTitle: string;

  if (mediaType === "tv") {
    mediaTitle = mediaDetails.name;
  } else {
    mediaTitle = mediaDetails.title;
  }

  return {
    title: mediaTitle + " | ALEFAST",
    description: mediaDetails.overview,
    openGraph: {
      title: mediaTitle + " | ALEFAST",
      description: mediaDetails.overview,
      images: [
        {
          url: `https://image.tmdb.org/t/p/w342${mediaDetails?.poster_path} || https://placehold.co/342x513?text=Data+Unavailable`,
          width: 342,
          height: 513,
          alt: "Poster For " + mediaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: mediaTitle + " | ALEFAST",
      description: mediaDetails.overview,
      images: [
        {
          url: `https://image.tmdb.org/t/p/w342${mediaDetails?.poster_path} || https://placehold.co/342x513?text=Data+Unavailable`,
          width: 342,
          height: 513,
          alt: "Poster For " + mediaTitle,
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; mediaType: "tv" | "movie" }>;
}) {
  const { id: mediaId, mediaType } = await params;
  const {
    mediaDetails,
    casts,
    picSelected,
    videoSelected,
    similarData,
    crews,
  } = await getDetailsData(mediaId, mediaType);

  const directorName = crews?.filter((el: any) => el.job === "Director")[0]
    ?.name;

  let favoritePayload: {
    id: string;
    title?: string;
    name?: string;
    poster_path: string;
  };

  if (mediaType === "tv") {
    favoritePayload = {
      id: mediaDetails.id,
      title: mediaDetails.name,
      poster_path: mediaDetails.poster_path,
    };
  } else {
    favoritePayload = {
      id: mediaDetails.id,
      title: mediaDetails.title,
      poster_path: mediaDetails.poster_path,
    };
  }

  return (
    <>
      <ScrollRestore />
      <Hero
        backdrop_path={mediaDetails.backdrop_path}
        release_date={
          mediaType === "tv"
            ? `${mediaDetails.first_air_date.substring(
                0,
                4
              )} - ${mediaDetails.last_air_date.substring(0, 4)}`
            : mediaDetails.release_date.substring(0, 4)
        }
        title={mediaType === "tv" ? mediaDetails.name : mediaDetails.title}
        tagline={mediaDetails.tagline}
      />
      <section className="md:max-w-5xl md:px-4 md:mx-auto flex flex-col gap-12">
        <div className="px-4 md:px-0">
          <div className="flex gap-y-2 flex-wrap">
            {mediaDetails?.genres?.map((genre: any) => (
              <Link
                key={genre.id}
                href={`/discover?media_type=${mediaType}&genreId=${genre.id}`}
              >
                <div className="btn btn-outline rounded-full mr-2">
                  {genre.name}
                </div>
              </Link>
            ))}
          </div>
          <RadialRating rating={mediaDetails.vote_average} size="4rem" />
          <AddToFavorites payload={favoritePayload} />
        </div>

        <div className="px-4 md:px-0">
          <article className="overview">
            <h3 className="text-2xl font-bold">Overview</h3>
            <p>{mediaDetails.overview}</p>
          </article>

          {mediaType === "tv" ? (
            <article className="mt-4">
              <div>Director: {directorName}</div>
              <div>Runtime: {mediaDetails?.episode_run_time[0]} minutes</div>
              <div>Number of Episodes: {mediaDetails?.number_of_episodes}</div>
              <div>Number of Seasons: {mediaDetails?.number_of_seasons}</div>
              <div>Networks: {mediaDetails?.networks[0].name}</div>
              <div>
                Vote Average: {Math.round(mediaDetails?.vote_average * 10)}
              </div>
            </article>
          ) : (
            <article>
              <div className="crew">Director: {directorName}</div>
              <div>Runtime: {mediaDetails?.runtime} minutes</div>
              <div>Budget: ${formatNumber(mediaDetails?.budget)}</div>
              <div>Box Office: ${formatNumber(mediaDetails?.revenue)}</div>
              <div>
                Vote Average: {Math.round(mediaDetails?.vote_average * 10)}
              </div>
            </article>
          )}
        </div>

        {mediaDetails === "tv" && (
          <SeasonsCard seasons={mediaDetails.seasons} />
        )}

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
            picSelected.map((picSelect) => {
              const { file_path } = picSelect;
              return (
                <GalleryCard
                  key={file_path}
                  img={
                    file_path
                      ? `https://image.tmdb.org/t/p/w185/${file_path}`
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
            similarData.map((similarDat: any) => {
              let id: string;
              let poster_path: string;
              let title: string;
              let media_type: string;

              if (mediaType === "tv") {
                id = similarDat.id;
                poster_path = similarDat.poster_path;
                title = similarDat.name;
                media_type = similarDat.media_type;
              } else {
                id = similarDat.id;
                poster_path = similarDat.poster_path;
                title = similarDat.title;
                media_type = similarDat.media_type;
              }

              return (
                <CardWrap
                  key={id}
                  content={{ id, poster_path, title, media_type }}
                  size="w-24 lg:w-36"
                  link={`/${mediaType}`}
                />
              );
            })
          ) : (
            <>Data Unavailable</>
          )}
        </TemplateFront>

        <Comments movieId={mediaId} />
      </section>
    </>
  );
}
