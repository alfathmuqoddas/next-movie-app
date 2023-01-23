import Layout from "../components/Layout";
import Link from "next/link";
import Head from "next/head";
import {
  getPopularData,
  getTopRatedData,
  getNowPlayingData,
  getTrendingData,
} from "../lib/getData";
import { TemplateFront2 } from "../components/TemplateFront";

export const getStaticProps = async () => {
  const popularDatas = await getPopularData();
  const nowPlayingDatas = await getNowPlayingData();
  const topRatedDatas = await getTopRatedData();
  const trendingDatas = await getTrendingData();

  return {
    props: { popularDatas, nowPlayingDatas, topRatedDatas, trendingDatas },
    revalidate: 3600,
  };
};

export default function Index({
  popularDatas,
  nowPlayingDatas,
  topRatedDatas,
  trendingDatas,
}) {
  return (
    <div>
      <Head>
        <title>ALEFAST</title>
      </Head>
      <Layout>
        <TemplateFront2
          templateName={`Trending`}
          content={trendingDatas}
          seeAll="trending"
        />
        <TemplateFront2
          templateName={`Popular`}
          content={popularDatas}
          seeAll="popular"
        />
        <TemplateFront2
          templateName={`Now Playing`}
          content={nowPlayingDatas}
          seeAll="now-playing"
        />
        <TemplateFront2
          templateName={`Top Rated`}
          content={topRatedDatas}
          seeAll="top-rated"
        />
      </Layout>
    </div>
  );
}
