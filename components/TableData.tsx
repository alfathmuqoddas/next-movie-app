import Link from "next/link";
import { createSlug } from "@/lib/helper";

const MovieCard = ({
  poster_path,
  title,
  type,
  id,
}: {
  poster_path: string;
  title: string;
  type: "movie" | "tv";
  id: string;
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w92/${poster_path}`
            : "https://placehold.co/92x130?text=Data+Unavailable"
        }
        alt="card-thumbnail"
        className="rounded-lg"
        loading="lazy"
      />
      <Link
        href={`/details/${type}/${createSlug(title, id)}`}
        className="active:underline hover:underline text-blue-500"
      >
        {title}
      </Link>
    </div>
  );
};

export default function TableData({
  data,
  isMovie = false,
}: {
  data: any[];
  isMovie: boolean;
}) {
  // Defensive: ensure data is an array
  if (!Array.isArray(data)) {
    return (
      <section className="overflow-x-auto mb-8">
        <p className="text-gray-500">No data available.</p>
      </section>
    );
  }

  return (
    <section className="overflow-x-auto mb-8">
      <table className="table-zebra table lg:table-lg">
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
          {data?.map((dat, index) => {
            const year = isMovie
              ? dat.release_date.slice(0, 4)
              : dat.first_air_date.slice(0, 4);
            const key = `row-${index}`;
            return (
              <tr key={key}>
                <th>{index + 1}</th>
                <td>{year}</td>
                <td className="text-wrap">
                  {isMovie ? (
                    <MovieCard
                      id={dat.id}
                      poster_path={dat.poster_path}
                      title={dat.title}
                      type="movie"
                    />
                  ) : (
                    <MovieCard
                      id={dat.id}
                      poster_path={dat.poster_path}
                      title={dat.name}
                      type="tv"
                    />
                  )}
                </td>
                <td className="text-wrap">{dat.character}</td>
                <td>{Math.round(dat.vote_average * 10)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
