import Layout from "../components/Layout";
import GetPopular from "../components/GetPopular";
import GetNowPlaying from "../components/GetNowPlaying";
import GetTopRated from "../components/GetTopRated";
import Head from "next/head";

export default function Index() {
  return (
    <>
      <Head>
        <title>Next Movie App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <GetPopular />
        <GetNowPlaying />
        <GetTopRated />
      </Layout>
    </>
  );
}
