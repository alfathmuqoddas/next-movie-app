import Link from "next/link";
import Layout from "../../components/Layout";
import Head from "next/head";
import { CardHorizontal } from "../../components/Card";
import { getCelebData } from "../../lib/getData";

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const [personDetails, personMovieCredits, personTVCredits] =
    await Promise.all([
      getCelebData(id, ""),
      getCelebData(id, "/movie_credits"),
      getCelebData(id, "/tv_credits"),
    ]);

  const props = {
    personDetails: {
      name: personDetails.name,
      biography: personDetails.biography,
      birthday: personDetails.birthday,
      place_of_birth: personDetails.place_of_birth,
      known_for_department: personDetails.known_for_department,
      deathday: personDetails.deathday,
      profile_path: personDetails.profile_path,
    },
    personMovieCredits: {
      cast: personMovieCredits.cast?.map((cast) => ({
        poster_path: cast.poster_path,
        title: cast.title,
        vote_average: cast.vote_average,
        id: cast.id,
        release_date: cast.release_date,
        character: cast.character,
      })),
    },
    personTVCredits: {
      cast: personTVCredits.cast?.map((cast) => ({
        poster_path: cast.poster_path,
        name: cast.name,
        vote_average: cast.vote_average,
        id: cast.id,
        first_air_date: cast.first_air_date,
        character: cast.character,
      })),
    },
  };

  const dataSize = JSON.stringify(props).length;
  console.log(`Data size: ${dataSize / 1024} KB`);

  return {
    props,
  };
};

const TableData = ({ data, isMovie = false }) => {
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
              <th>Year</th>
              <th>Title</th>
              <th>Role</th>
              <th>Vote Average</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((dat, index) => (
                <tr key={index} className="">
                  <th>{data.indexOf(dat) + 1}</th>
                  <td>
                    {isMovie
                      ? dat.release_date.slice(0, 4)
                      : dat.first_air_date.slice(0, 4)}
                  </td>
                  <td className="text-wrap">
                    {isMovie ? (
                      <div className="flex flex-col md:flex-row items-center gap-4">
                        <img
                          src={
                            dat.poster_path
                              ? `https://image.tmdb.org/t/p/w92/${dat.poster_path}`
                              : "https://placehold.co/92x130?text=Data+Unavailable"
                          }
                          alt="card-thumbnail"
                          className="rounded-lg"
                          loading="lazy"
                        />
                        <Link
                          href={`/details/movie/${dat.id}`}
                          className="active:underline hover:underline text-blue-500"
                        >
                          {dat.title}
                        </Link>
                      </div>
                    ) : (
                      <div className="flex flex-col md:flex-row items-center gap-4">
                        <img
                          src={
                            dat.poster_path
                              ? `https://image.tmdb.org/t/p/w92/${dat.poster_path}`
                              : "https://placehold.co/92x130?text=Data+Unavailable"
                          }
                          alt="card-thumbnail"
                          className="rounded-lg"
                          loading="lazy"
                        />
                        <Link
                          href={`/details/tv/${dat.id}`}
                          className="active:underline hover:underline text-blue-500"
                        >
                          {dat.name}
                        </Link>
                      </div>
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
    place_of_birth,
    known_for_department,
    deathday,
    profile_path,
  } = personDetails;
  const { cast } = personMovieCredits;
  const { cast: tvCast } = personTVCredits;

  console.log({ personDetails, personMovieCredits, personTVCredits });

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
            imgSize="36"
            flexType="items-start"
            cardBodyPadding="pl-4"
          />
          <div className="mt-8">
            <TableData data={sortByDate(cast)} isMovie />
            <TableData data={sortByDate(tvCast, false)} />
          </div>
          {/* <>{JSON.stringify(personTVCredits.cast)}</> */}
        </div>
      </Layout>
    </>
  );
};

export default Celebrity;
