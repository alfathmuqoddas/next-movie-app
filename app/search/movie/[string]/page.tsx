import Link from "next/link";
import { CardHorizontal } from "../../../../components/Card";
import RadialRating from "../../../../components/RadialRating";
import { queryData } from "../../../../lib/getData";
import ButtonSearchToggle from "../../../../components/ButtonSearchToggle";

async function getMovieSearchResult(string: string) {
  const searchData = await queryData("movie", string);

  const { results: searchDatas } = searchData;

  const props = {
    searchDatas: searchDatas.map((s: any) => ({
      id: s.id,
      poster_path: s.poster_path,
      title: s.title,
      release_date: s.release_date,
      vote_average: s.vote_average,
      overview: s.overview,
    })),
    string,
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
  const { props } = await getMovieSearchResult(string);
  const { searchDatas } = props;
  return (
    <>
      <ButtonSearchToggle
        mediaType="tv"
        string={string}
        label="Toggle Search for TV"
      />
      <div className="flex flex-col gap-4">
        {searchDatas.length > 0 ? (
          searchDatas.map((searchDat) => {
            const {
              id,
              poster_path,
              title: titleData,
              release_date,
              vote_average,
              overview,
            } = searchDat;
            return (
              <Link
                key={id}
                href={`/details/movie/${id}`}
                title={overview ?? ""}
              >
                <CardHorizontal
                  img={
                    poster_path
                      ? `https://image.tmdb.org/t/p/w342/${poster_path}`
                      : "https://placehold.co/185x278?text=Data+Unavailable"
                  }
                  imgWidth="342"
                  imgHeight="513"
                  title={`${titleData} (${
                    release_date ? release_date.substring(0, 4) : "TBA"
                  })`}
                  subtitle={overview ?? "Data Unavailable"}
                  subtitle2={<RadialRating rating={vote_average} size="2rem" />}
                />
              </Link>
            );
          })
        ) : (
          <div className="min-h-[250px]">
            <p>Movies Not Exist</p>
          </div>
        )}
      </div>
    </>
  );
}
