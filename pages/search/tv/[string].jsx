import Link from "next/link";
import { CardHorizontal } from "../../../components/Card";
import RadialRating from "../../../components/RadialRating";
import { queryData } from "../../../lib/getData";
import SearchLayout from "../SearchLayout";
import ButtonSearchToggle from "../ButtonSearchToggle";

export const getServerSideProps = async (context) => {
  const { string } = context.query;

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
};

const SearchResult = ({ searchTVDatas, string }) => {
  return (
    <SearchLayout string={string}>
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
              <Link key={id} href={`/details/tv/${id}`}>
                <CardHorizontal
                  img={
                    poster_path
                      ? `https://image.tmdb.org/t/p/w342/${poster_path}`
                      : "https://placehold.co/185x278?text=Data+Unavailable"
                  }
                  title={`${name} (${
                    first_air_date ? first_air_date.substring(0, 4) : "TBA"
                  })`}
                  subtitle={
                    overview.length > 240
                      ? overview.slice(0, 240) + "..."
                      : overview
                  }
                  subtitle2={<RadialRating rating={vote_average} size="2rem" />}
                  imgSize={36}
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
    </SearchLayout>
  );
};

export default SearchResult;