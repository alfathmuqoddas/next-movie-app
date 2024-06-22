import Layout from "../../components/Layout";
import Head from "next/head";

const index = () => {
  return (
    <>
      <Head>
        <title>Search | ALEFAST</title>
      </Head>
      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-[640px]">
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
