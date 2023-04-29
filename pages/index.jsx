import Layout from "../components/Layout";
import Link from "next/link";
import Head from "next/head";
import {
  getPopularData,
  getTopRatedData,
  getNowPlayingData,
  getTrendingData,
  getPopularTvData,
} from "../lib/getData";
import { TemplateFront2 } from "../components/TemplateFront";

export const getStaticProps = async () => {
  const popularDatas = await getPopularData();
  const popularTvDatas = await getPopularTvData();
  const nowPlayingDatas = await getNowPlayingData();
  const topRatedDatas = await getTopRatedData();
  const trendingDatas = await getTrendingData();

  return {
    props: {
      popularDatas,
      popularTvDatas,
      nowPlayingDatas,
      topRatedDatas,
      trendingDatas,
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
}) {
  return (
    <div>
      <Head>
        <title>ALEFAST</title>
      </Head>
      <Layout>
        <TemplateFront2
          templateName={`TRENDING`}
          content={trendingDatas}
          seeAll="trending"
          contentLink=""
        />
        <TemplateFront2
          templateName={`POPULAR MOVIES`}
          content={popularDatas}
          seeAll="popular"
          contentLink=""
        />
        <TemplateFront2
          templateName={`POPULAR TV SERIES`}
          content={popularTvDatas}
          seeAll="popular-tv"
          contentLink="/tv"
        />
        <TemplateFront2
          templateName={`NOW PLAYING`}
          content={nowPlayingDatas}
          seeAll="now-playing"
          contentLink=""
        />
        {/* <TemplateFront2
          templateName={`TOP RATED`}
          content={topRatedDatas}
          seeAll="top-rated"
        /> */}
      </Layout>
    </div>
  );
}
