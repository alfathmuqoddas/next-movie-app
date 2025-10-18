import RadialRating from "../RadialRating";
import { CardHorizontal } from "../Card";

export default function SeasonsCard({ seasons }) {
  return (
    <div className="mx-4 md:mx-0 px-4 border rounded-[20px] border-neutral-500">
      <h3 className="text-2xl font-bold py-4">Seasons</h3>
      <div className="max-h-[360px] overflow-auto flex flex-col gap-4 pb-4">
        {seasons.map((season) => {
          const {
            air_date,
            episode_count,
            id,
            name,
            overview,
            poster_path,
            //season_number,
            vote_average,
          } = season;
          return (
            <CardHorizontal
              key={id}
              title={name}
              subtitle={
                overview
                  ? overview.length > 240
                    ? overview.substring(0, 240) + "..."
                    : overview
                  : "Description data not exist"
              }
              img={
                poster_path
                  ? `https://image.tmdb.org/t/p/w342${poster_path}`
                  : "https://placehold.co/185x278?text=Data+Unavailable"
              }
              subtitle2={`${
                air_date ? air_date.substring(0, 4) : "Data Unavailable"
              }, ${episode_count} Episode(s)`}
              subtitle3={<RadialRating rating={vote_average} size="1.5rem" />}
            />
          );
        })}
      </div>
    </div>
  );
}
