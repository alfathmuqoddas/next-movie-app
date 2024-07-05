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
import { GetStaticProps } from "next";
import RadioGroup from "../components/RadioGroup";

export const getStaticProps = (async () => {
  const popularDatas = await getPopularData("movie", 1);
  const popularTvDatas = await getPopularData("tv", 1);
  const nowPlayingDatas = await getNowPlayingData(1);
  const topRatedDatas = await getTopRatedData(1);
  const trendingDatas = await getTrendingData("day", 1);
  const trendingDatasWeek = await getTrendingData("week", 1);

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
}) satisfies GetStaticProps;

export default function Index({
  popularDatas,
  nowPlayingDatas,
  topRatedDatas,
  popularTvDatas,
  trendingDatas,
  trendingDatasWeek,
}) {
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
            <TemplateFront2 content={trendingDatas} contentLink="" />
          ) : (
            <TemplateFront2 content={trendingDatasWeek} contentLink="" />
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
