import Layout from "../components/Layout";
import Head from "next/head";
import { useState } from "react";
import {
  getPopularData,
  getTopRatedData,
  getNowPlayingData,
  getTrendingData,
} from "../lib/getData";
import { TemplateFront2 } from "../components/TemplateFront";

export const getStaticProps = async () => {
  const [
    popularData,
    popularTvData,
    nowPlayingData,
    topRatedData,
    trendingDataDay,
    trendingDataWeek,
  ] = await Promise.all([
    getPopularData("movie"),
    getPopularData("tv"),
    getNowPlayingData(),
    getTopRatedData(),
    getTrendingData("day", 1),
    getTrendingData("week", 1),
  ]);

  const { results: popularDatas } = popularData;
  const { results: popularTvDatas } = popularTvData;
  const { results: nowPlayingDatas } = nowPlayingData;
  const { results: trendingDatasDay } = trendingDataDay;
  const { results: trendingDatasWeek } = trendingDataWeek;
  const { results: topRatedDatas } = topRatedData;

  return {
    props: {
      popularDatas,
      popularTvDatas,
      nowPlayingDatas,
      topRatedDatas,
      trendingDatasDay,
      trendingDatasWeek,
    },
    revalidate: 3600,
  };
};

export const RadioChildrenStyle =
  "rounded-full bg-black text-white peer-checked:bg-white transition-all peer-checked:text-black py-1 px-6";
export const RadioParentStyle = "peer sr-only";

export default function Index({
  popularDatas,
  nowPlayingDatas,
  topRatedDatas,
  popularTvDatas,
  trendingDatasDay,
  trendingDatasWeek,
}) {
  const [trendingTime, setTrendingTime] = useState("day");
  const [popularType, setPopularType] = useState("movie");

  const handleTrendingChange = (e) => {
    setTrendingTime(e.target.value);
  };

  const handlePopularChange = (e) => {
    setPopularType(e.target.value);
  };

  return (
    <div>
      <Head>
        <title>ALEFAST</title>
      </Head>
      <Layout>
        <div className="py-8">
          <div className="flex gap-4 px-8">
            <h1 className="text-2xl font-bold">Trending</h1>
            <div className="flex border rounded-full">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="day"
                  checked={trendingTime === "day"}
                  className={RadioParentStyle}
                  onChange={handleTrendingChange}
                />
                <div className={RadioChildrenStyle}>Today</div>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="week"
                  checked={trendingTime === "week"}
                  className={RadioParentStyle}
                  onChange={handleTrendingChange}
                />
                <div className={RadioChildrenStyle}>This Week</div>
              </label>
            </div>
          </div>
          {trendingTime === "day" ? (
            <TemplateFront2 content={trendingDatasDay} contentLink="" />
          ) : trendingTime === "week" ? (
            <TemplateFront2 content={trendingDatasWeek} contentLink="" />
          ) : (
            <></>
          )}
        </div>

        <div className="py-8">
          <div className="flex gap-4 px-8">
            <h1 className="text-2xl font-bold">Popular</h1>
            <div className="flex border rounded-full">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="movie"
                  checked={popularType === "movie"}
                  className={RadioParentStyle}
                  onChange={handlePopularChange}
                />
                <div className={RadioChildrenStyle}>Movie</div>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="tv"
                  checked={popularType === "tv"}
                  className={RadioParentStyle}
                  onChange={handlePopularChange}
                />
                <div className={RadioChildrenStyle}>TV</div>
              </label>
            </div>
          </div>
        </div>
        {popularType === "movie" ? (
          <TemplateFront2 content={popularDatas} contentLink="/movie" />
        ) : (
          <TemplateFront2 content={popularTvDatas} contentLink="/tv" />
        )}

        <div className="py-8">
          <div className="px-8">
            <h1 className="text-2xl font-bold">Now Playing</h1>
          </div>
          <TemplateFront2 content={nowPlayingDatas} contentLink="/movie" />
        </div>
        {/* <div className="py-8">
          <div className="px-8">
            <h1 className="text-2xl font-bold">Top Rated</h1>
          </div>
          <TemplateFront2 content={topRatedDatas} contentLink="/top-rated" />
        </div> */}
      </Layout>
    </div>
  );
}
