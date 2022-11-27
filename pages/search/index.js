import Layout from "../../components/Layout";
import Head from "next/head";

const index = () => {
  return (
    <>
      <Head>
        <title>Search | ALEFAST</title>
      </Head>
      <Layout>
        <h1 className="text-2xl mb-4">Search for Movies</h1>
        <form>
          <input type="text" placeholder="Search Here..." />
          <input
            type="submit"
            value="Search"
            className="btn btn-sm btn-primary"
          />
        </form>
      </Layout>
    </>
  );
};

export default index;
