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
import RadioGroup from "../components/RadioGroup";

export const getStaticProps = async () => {
  const popularDatas = await getPopularData("movie");
  const popularTvDatas = await getPopularData("tv");
  const nowPlayingDatas = await getNowPlayingData();
  const topRatedDatas = await getTopRatedData();
  const trendingDatas = await getTrendingData();
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
};

export default function Index({
  popularDatas,
  nowPlayingDatas,
  topRatedDatas,
  popularTvDatas,
  trendingDatas,
  trendingDatasWeek,
}) {
  const [isTrendingToday, setTrendingToday] = useState(true);

  const trendingOptions = [
    { value: true, label: "Today" },
    { value: false, label: "This Week" },
  ];

  const handleChangeTrendingTime = (value) => {
    setTrendingToday(value);
  };
  console.log(isTrendingToday);
  return (
    <div>
      <Head>
        <title>ALEFAST</title>
      </Head>
      <Layout>
        <div className="py-8">
          <div className="flex justify-between items-center px-8">
            <h3 className="text-2xl font-extrabold">Trending</h3>
            <RadioGroup
              options={trendingOptions}
              name="trending-option"
              onChange={handleChangeTrendingTime}
            />
            <Link href="/trending">
              <h4 className="hover:underline">See More →</h4>
            </Link>
          </div>
          {isTrendingToday ? (
            <TemplateFront2
              content={trendingDatas}
              seeAll="trending"
              contentLink=""
            />
          ) : (
            <TemplateFront2
              content={trendingDatasWeek}
              seeAll="trending"
              contentLink=""
            />
          )}
        </div>
        <div className="py-8">
          <TemplateFront2
            content={popularDatas}
            seeAll="popular"
            contentLink="/movie"
          />
        </div>
        <div className="py-8">
          <TemplateFront2
            content={popularTvDatas}
            seeAll="popular-tv"
            contentLink="/tv"
          />
        </div>
        <div className="py-8">
          <TemplateFront2
            content={nowPlayingDatas}
            seeAll="now-playing"
            contentLink="/movie"
          />
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
