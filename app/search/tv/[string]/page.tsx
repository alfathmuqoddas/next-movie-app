import Link from "next/link";
import { CardHorizontal } from "../../../../components/Card";
import RadialRating from "../../../../components/RadialRating";
import { queryData } from "../../../../lib/getData";
import ButtonSearchToggle from "../../../../components/ButtonSearchToggle";

async function getTvSearchResults(string: string) {
  const searchTVData = await queryData("tv", string);

  const { results: searchTVDatas } = searchTVData;

  const props = {
    string,
    searchTVDatas: searchTVDatas.map((s) => ({
      id: s.id,
      poster_path: s.poster_path,
      name: s.name,
      first_air_date: s.first_air_date,
      vote_average: s.vote_average,
      overview: s.overview,
    })),
  };

  const dataSize = JSON.stringify(props).length;
  console.log(`Data size: ${dataSize / 1024} KB`);

  return {
    props,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ string: string }>;
}) {
  const { string } = await params;
  const { props } = await getTvSearchResults(string);
  const { searchTVDatas } = props;

  return (
    <>
      <ButtonSearchToggle
        mediaType="movie"
        string={string}
        label="Toggle Search for Movies"
      />
      <div className="flex flex-col gap-4">
        {searchTVDatas.length > 0 ? (
          searchTVDatas.map((searchTVData) => {
            const {
              id,
              poster_path,
              name,
              first_air_date,
              vote_average,
              overview,
            } = searchTVData;
            return (
              <Link key={id} href={`/details/tv/${id}`} title={overview ?? ""}>
                <CardHorizontal
                  img={
                    poster_path
                      ? `https://image.tmdb.org/t/p/w342/${poster_path}`
                      : "https://placehold.co/185x278?text=Data+Unavailable"
                  }
                  imgWidth="342"
                  imgHeight="513"
                  title={`${name} (${
                    first_air_date ? first_air_date.substring(0, 4) : "TBA"
                  })`}
                  subtitle={overview ?? "Data Unavailable"}
                  subtitle2={<RadialRating rating={vote_average} size="2rem" />}
                />
              </Link>
            );
          })
        ) : (
          <div className="min-h-[250px]">
            <p>TV Series Not Exist</p>
          </div>
        )}
      </div>
    </>
  );
}
