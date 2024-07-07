import { useState } from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import Link from "next/link";
import {
  getPopularData,
  getTopRatedData,
  getNowPlayingData,
  getTrendingData,
} from "../lib/getData";
import { TemplateFront2 } from "../components/TemplateFront";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { IResultsMovieData, IResultsTvData } from "../lib/type";
// import RadioGroup from "../components/RadioGroup";

export const getStaticProps = (async () => {
  const [
    popularDatas,
    popularTvDatas,
    nowPlayingDatas,
    topRatedDatas,
    trendingDatas,
    trendingDatasWeek,
  ] = await Promise.all([
    getPopularData("movie", 1),
    getPopularData("tv", 1),
    getNowPlayingData(1),
    getTopRatedData(1),
    getTrendingData("day", 1),
    getTrendingData("week", 1),
  ]);

  return {
    props: {
      popularDatas,
      popularTvDatas,
      nowPlayingDatas,
      topRatedDatas,
      trendingDatas,
      trendingDatasWeek,
    },
    revalidate: 3600,
  };
}) satisfies GetStaticProps<{
  popularDatas: IResultsMovieData;
  popularTvDatas: IResultsTvData;
  nowPlayingDatas: IResultsMovieData;
  topRatedDatas: IResultsMovieData;
  trendingDatas: IResultsMovieData | IResultsTvData;
  trendingDatasWeek: IResultsMovieData | IResultsTvData;
}>;

export default function Index({
  popularDatas,
  nowPlayingDatas,
  topRatedDatas,
  popularTvDatas,
  trendingDatas,
  trendingDatasWeek,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [isTrendingToday, setTrendingToday] = useState(true);

  console.log(isTrendingToday);
  return (
    <div>
      <Head>
        <title>ALEFAST</title>
      </Head>
      <Layout>
        <div className="py-8">
          <div className="flex justify-between gap-8 items-center px-8">
            <div>
              <h3 className="text-2xl font-extrabold">
                {isTrendingToday ? "Trending Today" : "Trending This Week"}
              </h3>
              <button onClick={() => setTrendingToday(!isTrendingToday)}>
                {isTrendingToday ? <>Today</> : <>This Week</>}
              </button>
            </div>
            <Link
              href={
                isTrendingToday
                  ? "/trending?timeframe=day"
                  : "/trending?timeframe=week"
              }
            >
              <h4 className="hover:underline">See More →</h4>
            </Link>
          </div>
          {isTrendingToday ? (
            <TemplateFront2 content={trendingDatas} contentLink="" size="" />
          ) : (
            <TemplateFront2
              content={trendingDatasWeek}
              contentLink=""
              size=""
            />
          )}
        </div>
        <div className="py-8">
          <div className="flex justify-start gap-8 items-center px-8">
            <h3 className="text-2xl font-extrabold">Popular Movies</h3>
            <Link href="/popular">
              <h4 className="hover:underline">See More →</h4>
            </Link>
          </div>
          <TemplateFront2 content={popularDatas} contentLink="/movie" />
        </div>
        <div className="py-8">
          <div className="flex justify-start gap-8 items-center px-8">
            <h3 className="text-2xl font-extrabold">Popular TV</h3>
            <Link href="/popular-tv">
              <h4 className="hover:underline">See More →</h4>
            </Link>
          </div>
          <TemplateFront2 content={popularTvDatas} contentLink="/tv" />
        </div>
        <div className="py-8">
          <div className="flex justify-start gap-8 items-center px-8">
            <h3 className="text-2xl font-extrabold">Now Playing</h3>
            <Link href="/now-playing">
              <h4 className="hover:underline">See More →</h4>
            </Link>
          </div>
          <TemplateFront2 content={nowPlayingDatas} contentLink="/movie" />
        </div>
        {/* <TemplateFront2
          templateName={`TOP RATED`}
          content={topRatedDatas}
          seeAll="top-rated"
        /> */}
      </Layout>
    </div>
  );
}
