import Layout from "../../components/Layout";
import Head from "next/head";

const index = () => {
  return (
    <>
      <Head>
        <title>Search | ALEFAST</title>
      </Head>
      <Layout>
        <div className="mx-4">
          <div className="flex items-center justify-center h-[calc(100vh-11rem)]">
            <h1 className="text-2xl">
              Search for movies using the search feature above
            </h1>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default index;
