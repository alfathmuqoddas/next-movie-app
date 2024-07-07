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
import RadioButtonGroup from "../components/RadioButtonGroup";

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

  const trendingOptions = [
    { value: "day", label: "Today" },
    { value: "week", label: "This Week" },
  ];

  const popularRadio = [
    { value: "movie", label: "Movie" },
    { value: "tv", label: "TV" },
  ];

  return (
    <div>
      <Head>
        <title>ALEFAST</title>
      </Head>
      <Layout>
        <div className="py-8">
          <div className="flex gap-4 px-4 md:px-8">
            <h1 className="text-2xl font-bold">TRENDING</h1>
            <div className="flex border rounded-full">
              <RadioButtonGroup
                contents={trendingOptions}
                checkedFunction={trendingTime}
                onChange={handleTrendingChange}
              />
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
          <div className="flex gap-4 px-4 md:px-8">
            <h1 className="text-2xl font-bold">POPULAR</h1>
            <div className="flex border rounded-full">
              <RadioButtonGroup
                contents={popularRadio}
                onChange={handlePopularChange}
                checkedFunction={popularType}
              />
            </div>
          </div>

          {popularType === "movie" ? (
            <TemplateFront2 content={popularDatas} contentLink="/movie" />
          ) : (
            <TemplateFront2 content={popularTvDatas} contentLink="/tv" />
          )}
        </div>

        <div className="py-8">
          <div className="px-4 md:px-8">
            <h1 className="text-2xl font-bold">NOW PLAYING</h1>
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
