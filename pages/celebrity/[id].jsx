import Link from "next/link";
import Layout from "../../components/Layout";
import Head from "next/head";
import { CardHorizontal } from "../../components/Card";
import { getCelebData } from "../../lib/getData";

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  const personDetails = await getCelebData(id, "");
  const personMovieCredits = await getCelebData(id, "/movie_credits");
  const personTVCredits = await getCelebData(id, "/tv_credits");

  return {
    props: {
      personDetails,
      personMovieCredits,
      personTVCredits,
    },
  };
};

const TableData = ({ data, isMovie }) => {
  return (
    <div className="mb-8">
      <h1 className="text-xl mb-2 font-bold">
        {isMovie ? "Film" : "Television"}
      </h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>No.</th>
              <th>{isMovie ? "Year" : "First Air Date"}</th>
              <th>Title</th>
              <th>Role</th>
              <th>Vote Average</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((dat) => (
                <tr key={dat.id} className="">
                  <th>{data.indexOf(dat) + 1}</th>
                  <td>
                    {isMovie
                      ? dat.release_date.slice(0, 4)
                      : dat.first_air_date.slice(0, 4)}
                  </td>
                  <td className="text-wrap">
                    {isMovie ? (
                      <Link
                        href={`/details/movie/${dat.id}`}
                        className="active:underline hover:underline"
                      >
                        {dat.title}
                      </Link>
                    ) : (
                      <Link
                        href={`/details/tv/${dat.id}`}
                        className="active:underline hover:underline"
                      >
                        {dat.name}
                      </Link>
                    )}
                  </td>
                  <td className="text-wrap">{dat.character}</td>
                  <td>{Math.round(dat.vote_average * 10)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <th>1</th>
                <td>No Data</td>
                <td>No Data</td>
                <td>No Data</td>
                <td>No Data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function sortByDate(data, isMovie = true) {
  return data.sort((obj1, obj2) => {
    const date1 = new Date(isMovie ? obj1.release_date : obj1.first_air_date);
    const date2 = new Date(isMovie ? obj2.release_date : obj2.first_air_date);
    return date1.getTime() - date2.getTime();
  });
}

const Celebrity = ({ personDetails, personMovieCredits, personTVCredits }) => {
  const {
    name,
    biography,
    birthday,
    gender,
    place_of_birth,
    imdb_id,
    known_for_department,
    deathday,
    profile_path,
  } = personDetails;
  const { cast } = personMovieCredits;
  const { cast: tvCast } = personTVCredits;

  return (
    <>
      <Head>
        <title>Celebrity | ALEFAST</title>
      </Head>
      <Layout>
        <div className="max-w-4xl px-4 mx-auto mb-4 mt-12">
          <CardHorizontal
            img={
              profile_path
                ? `https://image.tmdb.org/t/p/w185/${profile_path}`
                : "https://placehold.co/185x278?text=Data+Unavailable"
            }
            title={name}
            subtitle={biography}
            subtitle2={`Known For: ${known_for_department}`}
            subtitle3={`Born: ${place_of_birth}, ${birthday}`}
            subtitle4={`Died: ${deathday}`}
            imgSize={36}
            flexType="items-start"
            cardBodyPadding="pl-4"
          />
          <TableData data={sortByDate(cast)} isMovie />
          <TableData data={sortByDate(tvCast, false)} isMovie={false} />
          {/* <>{JSON.stringify(personTVCredits.cast)}</> */}
        </div>
      </Layout>
    </>
  );
};

export default Celebrity;
