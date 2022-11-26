import Layout from "../components/Layout";
import Head from "next/head";
import {
  getPopularData,
  getTopRatedData,
  getNowPlayingData,
} from "../lib/getData";
import Card from "../components/Card";
import TemplateFront from "../components/TemplateFront";

export const getStaticProps = async () => {
  const popularDatas = await getPopularData();
  const nowPlayingDatas = await getNowPlayingData();
  const topRatedDatas = await getTopRatedData();

  return { props: { popularDatas, nowPlayingDatas, topRatedDatas } };
};

export default function Index({
  popularDatas,
  nowPlayingDatas,
  topRatedDatas,
}) {
  return (
    <>
      <Head>
        <title>Next Movie App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <TemplateFront
          templateName={`Popular`}
          content={popularDatas.map((popData) => (
            <Card
              key={popData.id}
              img={"https://image.tmdb.org/t/p/w500" + popData.poster_path}
              title={popData.original_title}
              year={popData.release_date.substring(0, 4)}
            />
          ))}
        />
        <TemplateFront
          templateName={`Now Playing`}
          content={nowPlayingDatas.map((nopData) => (
            <Card
              key={nopData.id}
              img={"https://image.tmdb.org/t/p/w500" + nopData.poster_path}
              title={nopData.original_title}
              year={nopData.release_date.substring(0, 4)}
            />
          ))}
        />
        <TemplateFront
          templateName={`Top Rated`}
          content={topRatedDatas.map((topData) => (
            <Card
              key={topData.id}
              img={"https://image.tmdb.org/t/p/w500" + topData.poster_path}
              title={topData.original_title}
              year={topData.release_date.substring(0, 4)}
              rating={topData.vote_average}
            />
          ))}
        />
        {/*
        <GetNowPlaying />
        <GetTopRated /> */}
      </Layout>
    </>
  );
}
