import CardWrap, { CardHorizontal } from "@/components/Card";
import {
  CastCard,
  GalleryCard,
  VideoCard,
  SeasonsCard,
} from "@/components/card/index";
import TemplateFront from "@/components/TemplateFront";
import {
  getMediaDetails,
  getPicsData,
  getCreditData,
  getVideosData,
  getSimilarData,
} from "@/lib/getData";
import { getComments } from "@/lib/firebaseQuery";
import YoutubeIcons from "@/components/YoutubeIcons";
import RadialRating from "@/components/RadialRating";
import Hero from "@/components/Hero";
import Comments from "@/components/comment/Comments";
import AddToFavorites from "@/components/AddToFavorites";
import ScrollRestore from "@/components/ScrollRestore";
import Link from "next/link";

async function getTvDetailsData(id: string) {
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

  return {
    mediaDetails,
    picSelected,
    videoSelected,
    similarData,
    casts,
    crews,
  };
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<any> => {
  const { id: tvId } = await params;
  const { mediaDetails } = await getTvDetailsData(tvId);

  return {
    title: mediaDetails.name + " | ALEFAST",
    description: mediaDetails.overview,
    openGraph: {
      title: mediaDetails.name,
      description: mediaDetails.overview,
      images: [
        {
          url: `https://image.tmdb.org/t/p/w342${mediaDetails.poster_path}`,
          width: 342,
          height: 513,
          alt: mediaDetails.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: mediaDetails.name,
      description: mediaDetails.overview,
      images: [
        {
          url: `https://image.tmdb.org/t/p/w342${mediaDetails.poster_path}`,
          width: 342,
          height: 513,
          alt: mediaDetails.name,
        },
      ],
    },
  };
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: tvId } = await params;
  const {
    mediaDetails,
    casts,
    picSelected,
    videoSelected,
    similarData,
    crews,
  } = await getTvDetailsData(tvId);

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

  const directorName = crews?.filter((el) => el.job === "Director")[0]?.name;

  return (
    <>
      <ScrollRestore />
      <Hero
        backdrop_path={backdrop_path}
        release_date={`${first_air_date.substring(
          0,
          4
        )} - ${last_air_date.substring(0, 4)}`}
        title={name}
        tagline={tagline}
      />

      <section className="md:max-w-5xl md:px-4 md:mx-auto flex flex-col gap-12">
        <div className="px-4 md:px-0">
          <div className="flex gap-y-2 flex-wrap">
            {genres.map((genre) => (
              <Link
                key={genre.id}
                href={`/discover?media_type=tv&genreId=${genre.id}`}
              >
                <div className="btn btn-outline rounded-full mr-2">
                  {genre.name}
                </div>
              </Link>
            ))}
          </div>
          <RadialRating rating={vote_average} size="4rem" />
          <AddToFavorites payload={payload} type="tv" />
        </div>

        <div className="px-4 md:px-0">
          <div className="overview">
            <h3 className="text-2xl font-bold">Overview</h3>
            <p>{overview}</p>
          </div>
          <div className="mt-4">
            <div>Director: {directorName}</div>
            <div>Runtime: {episode_run_time[0]} minutes</div>
            <div>Number of Episodes: {number_of_episodes}</div>
            <div>Number of Seasons: {number_of_seasons}</div>
            <div>Networks: {networks[0].name}</div>
            <div>Vote Average: {Math.round(vote_average * 10)}</div>
          </div>
        </div>

        <SeasonsCard seasons={seasons} />

        <TemplateFront templateName={"Cast"}>
          {casts.length > 0 ? (
            casts.map((cast, index) => {
              const { profile_path, name, character, id } = cast;
              return (
                <CastCard
                  key={index}
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
            picSelected.map((picSelect, index) => {
              const { file_path } = picSelect;
              return (
                <GalleryCard
                  key={index}
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
            similarData.map((similarDat, index) => {
              const { id, poster_path, name } = similarDat;
              return (
                <CardWrap
                  key={index}
                  link="/tv"
                  content={{ id, poster_path, name }}
                  size="w-24 lg:w-36"
                />
              );
            })
          ) : (
            <>Data Unavailable</>
          )}
        </TemplateFront>
        <Comments movieId={tvId} />
      </section>
    </>
  );
}
