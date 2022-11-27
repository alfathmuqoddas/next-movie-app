import Layout from "../../components/Layout";
import Head from "next/head";

const index = () => {
  return (
    <>
      <Head>
        <title>Search | ALEFAST</title>
      </Head>
      <Layout>
        <h1 className="text-2xl">
          Search for movies using the search feature above
        </h1>
      </Layout>
    </>
  );
};

export default index;
