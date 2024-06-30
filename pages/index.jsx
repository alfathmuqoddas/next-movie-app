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

export const getStaticProps = async () => {
  const popularDatas = await getPopularData("movie");
  const popularTvDatas = await getPopularData("tv");
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
        <div className="py-8">
          <div className="flex justify-between items-center px-8">
            <h3 className="text-2xl font-extrabold">Trending</h3>
            <Link href="/trending">
              <h4 className="hover:underline">See More →</h4>
            </Link>
          </div>
          <TemplateFront2
            content={trendingDatas}
            seeAll="trending"
            contentLink=""
          />
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
