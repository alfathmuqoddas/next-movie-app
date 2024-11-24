import Layout from "../../components/Layout";
import Head from "next/head";

const SearchLayout = ({ children, string }) => {
  return (
    <Layout>
      <Head>
        <title>{`Search results for ${string} | ALEFAST`}</title>
        <meta
          name="description"
          content={`Search results for ${string}. Find movies and TV series related to the search term. | ALEFAST`}
        />
        <meta
          name="keywords"
          content={`${string}, search, movies, TV series, related`}
        />
      </Head>
      <div className="container max-w-4xl px-4 pt-8 mx-auto">{children}</div>
    </Layout>
  );
};

export default SearchLayout;
