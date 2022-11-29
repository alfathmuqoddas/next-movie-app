import Layout from "../components/Layout";
import Link from "next/link";
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

  return {
    props: { popularDatas, nowPlayingDatas, topRatedDatas },
    revalidate: 3600,
  };
};

export default function Index({
  popularDatas,
  nowPlayingDatas,
  topRatedDatas,
}) {
  return (
    <>
      <Head>
        <title>ALEFAST</title>
      </Head>
      <Layout>
        <TemplateFront
          templateName={`Popular`}
          content={popularDatas.map((popData) => (
            <Link key={popData.id} href={`/details/${popData.id}`}>
              <Card
                img={popData.poster_path}
                title={popData.title}
                year={popData.release_date.substring(0, 4)}
              />
            </Link>
          ))}
        />
        <TemplateFront
          templateName={`Now Playing`}
          content={nowPlayingDatas.map((nopData) => (
            <Link key={nopData.id} href={`/details/${nopData.id}`}>
              <Card
                img={nopData.poster_path}
                title={nopData.title}
                year={nopData.release_date.substring(0, 4)}
              />
            </Link>
          ))}
        />
        <TemplateFront
          templateName={`Top Rated`}
          content={topRatedDatas.map((topData) => (
            <Link key={topData.id} href={`/details/${topData.id}`}>
              <Card
                img={"https://image.tmdb.org/t/p/w500" + topData.poster_path}
                title={topData.title}
                year={topData.release_date.substring(0, 4)}
                rating={topData.vote_average}
              />
            </Link>
          ))}
        />
        {/*
        <GetNowPlaying />
        <GetTopRated /> */}
      </Layout>
    </>
  );
}
