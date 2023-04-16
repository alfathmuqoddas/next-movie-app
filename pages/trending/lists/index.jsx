import Layout from "../../../components/Layout";
import Link from "next/link";

export async function getStaticProps() {
  const results = [];
  for (let page = 1; page <= 100; page++) {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=403829fffc80d8184aa974d631a475c5&language=en-US&page=${
        page | 1
      }`
    );
    const trendingData = await res.json();
    results.push(...trendingData.results);
  }

  return { props: { results } };
}

export const MovieTrendingLists = ({ results }) => {
  return (
    <Layout>
      <ol className="list-decimal">
        {results.map((result) => {
          return (
            <li key={result.id}>
              <Link href={`/trending/${result.id}`}>{result.title}</Link>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export default MovieTrendingLists;
