import Link from "next/link";

export default function TableData({ data, isMovie = false }) {
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
                          scroll={false}
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
                          scroll={false}
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
}
