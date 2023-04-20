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
          templateName={`TRENDING`}
          content={trendingDatas}
          seeAll="trending"
        />
        <TemplateFront2
          templateName={`POPULAR`}
          content={popularDatas}
          seeAll="popular"
        />
        <TemplateFront2
          templateName={`NOW PLAYING`}
          content={nowPlayingDatas}
          seeAll="now-playing"
        />
        <TemplateFront2
          templateName={`TOP RATED`}
          content={topRatedDatas}
          seeAll="top-rated"
        />
      </Layout>
    </div>
  );
}
