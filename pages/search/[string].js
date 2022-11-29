import Layout from "../../components/Layout";
import Head from "next/head";
import { CardHorizontal } from "../../components/Card";
import Link from "next/link";

export const getServerSideProps = async (context) => {
  const { string } = context.query;
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=403829fffc80d8184aa974d631a475c5&language=en-US&query=${string}&page=1&include_adult=false`
  );

  const searchResultData = await res.json();
  const searchDatas = searchResultData.results;

  return {
    props: {
      searchDatas,
      string,
    },
  };
};

const SearchResult = ({ searchDatas, string }) => {
  return (
    <>
      <Head>
        <title>Search results for {string} | ALEFAST</title>
      </Head>
      <Layout>
        <h1 className="text-2xl my-12">
          Search Results for <i>{'"' + string + '"'}</i>
        </h1>
        <div className="max-w-screen-md">
          {searchDatas.map((searchDat) => (
            <Link key={searchDat.id} href={`/details/${searchDat.id}`}>
              <CardHorizontal
                img={searchDat.poster_path}
                title={searchDat.title}
                subtitle={
                  searchDat.release_date
                    ? searchDat.release_date.substring(0, 4)
                    : "TBA"
                }
                subtitle2={searchDat.vote_average * 10}
              />
            </Link>
          ))}
        </div>
      </Layout>
    </>
  );
};

export default SearchResult;
