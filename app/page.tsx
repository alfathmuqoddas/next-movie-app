import {
  getPopularData,
  getNowPlayingData,
  getTrendingData,
} from "../lib/getData";
import { TemplateFront2 } from "../components/TemplateFront";
import Trending from "@/components/Trending";
import Popular from "@/components/Popular";

async function fetchingFunction() {
  const [
    popularDatas,
    popularTvDatas,
    nowPlayingDatas,
    trendingDatasDay,
    trendingDatasWeek,
  ] = await Promise.all([
    getPopularData("movie"),
    getPopularData("tv"),
    getNowPlayingData(),
    getTrendingData("day", 1),
    getTrendingData("week", 1),
  ]);

  //select which data to display
  const props = {
    popularDatas: popularDatas.map((p) => ({
      id: p.id,
      poster_path: p.poster_path,
      title: p.title,
    })),
    popularTvDatas: popularTvDatas.map((p) => ({
      id: p.id,
      poster_path: p.poster_path,
      name: p.name,
      first_air_date: p.first_air_date,
    })),
    nowPlayingDatas: nowPlayingDatas.map((p) => ({
      id: p.id,
      poster_path: p.poster_path,
      title: p.title,
    })),
    trendingDatasDay: trendingDatasDay.map((tDay) => ({
      id: tDay.id,
      poster_path:
        tDay.poster_path ||
        `https://via.placeholder.com/185x278?text=Data+Unavailable`,
      release_date: tDay.release_date || `Data Unavailable`,
      title: tDay.title || tDay.name,
      first_air_date: tDay.first_air_date || `Data Unavailable`,
      name: tDay.name || tDay.title,
      media_type: tDay.media_type || `Data Unavailable`,
    })),
    trendingDatasWeek: trendingDatasWeek.map((tWeek) => ({
      id: tWeek.id,
      poster_path:
        tWeek.poster_path ||
        `https://via.placeholder.com/185x278?text=Data+Unavailable`,
      release_date: tWeek.release_date || `Data Unavailable`,
      title: tWeek.title || `Data Unavailable`,
      first_air_date: tWeek.first_air_date || `Data Unavailable`,
      name: tWeek.name || `Data Unavailable`,
      media_type: tWeek.media_type || `Data Unavailable`,
    })),
  };

  const dataSize = JSON.stringify(props).length;
  console.log(`Index page data size: ${dataSize / 1024} KB`);

  return {
    props,
  };
}

export const metadata = {
  title: "ALEFAST",
  description:
    "Alefast Discover the latest trending movies and TV series. Get information, reviews, and recommendations on the hottest entertainment.",
  keywords:
    "trending movies, trending TV series, latest movies, popular TV shows, movie reviews, TV series recommendations, entertainment news",
  image: "https://alefast.vercel.app/images/alefast-logo.png",
};

export default async function Page() {
  const { props } = await fetchingFunction();
  const {
    popularDatas,
    nowPlayingDatas,
    popularTvDatas,
    trendingDatasDay,
    trendingDatasWeek,
  } = props;

  return (
    <>
      <div className="flex flex-col gap-16 pt-8 max-w-5xl mx-auto">
        <Trending
          trendingDatasDay={trendingDatasDay}
          trendingDatasWeek={trendingDatasWeek}
        />

        <Popular popularDatas={popularDatas} popularTvDatas={popularTvDatas} />

        <section aria-label="now-playing">
          <div className="px-4 md:px-8">
            <h1 className="text-2xl font-black">NOW PLAYING</h1>
          </div>
          <TemplateFront2 content={nowPlayingDatas} contentLink="/movie" />
        </section>
      </div>
    </>
  );
}
