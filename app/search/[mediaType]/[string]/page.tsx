// app/search/[mediaType]/[string]/page.tsx (or a similar path)
import Link from "next/link";
import { CardHorizontal } from "../../../../components/Card";
import RadialRating from "../../../../components/RadialRating";
import { queryData } from "../../../../lib/getData";
import ButtonSearchToggle from "../../../../components/ButtonSearchToggle";

// Define a type for the search result item for better type safety
type SearchResultItem = {
  id: number;
  poster_path: string | null;
  title?: string; // Movie specific
  name?: string; // TV specific
  release_date?: string; // Movie specific
  first_air_date?: string; // TV specific
  vote_average: number;
  overview: string | null;
};

async function getSearchResults(mediaType: "movie" | "tv", string: string) {
  const searchData = await queryData(mediaType, string);
  const { results } = searchData;

  const props = {
    searchDatas: results.map((s: any) => ({
      id: s.id,
      poster_path: s.poster_path,
      // Conditionally map title/name and release_date/first_air_date
      title: mediaType === "movie" ? s.title : undefined,
      name: mediaType === "tv" ? s.name : undefined,
      release_date: mediaType === "movie" ? s.release_date : undefined,
      first_air_date: mediaType === "tv" ? s.first_air_date : undefined,
      vote_average: s.vote_average,
      overview: s.overview,
    })),
    string,
    mediaType, // Pass mediaType to props
  };

  const dataSize = JSON.stringify(props).length;
  console.log(`Data size for ${mediaType}: ${dataSize / 1024} KB`);

  return {
    props,
  };
}

export const generateMetadata = async ({ params }) => {
  const { string } = await params;

  return {
    title: `Search results for ${string}`,
    description: `Search results for ${string}. Find movies and TV series related to the search term.`,
    openGraph: {
      title: `Search results for ${string}`,
      description: `Search results for ${string}. Find movies and TV series related to the search term.`,
      images: [
        {
          url: `https://placehold.co/1200x630?text=Data+Unavailable`,
          width: 1200,
          height: 630,
          alt: `Search results for ${string}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Search results for ${string}`,
      description: `Search results for ${string}. Find movies and TV series related to the search term.`,
      images: [
        {
          url: `https://placehold.co/1200x630?text=Data+Unavailable`,
          width: 1200,
          height: 630,
          alt: `Search results for ${string}`,
        },
      ],
    },
  };
};

export default async function SearchPage({
  params,
}: {
  params: Promise<{ string: string; mediaType: "movie" | "tv" }>; // Add mediaType to params
}) {
  const { string, mediaType } = await params; // Destructure mediaType
  const { props } = await getSearchResults(mediaType, string);
  const { searchDatas } = props;

  const pageTitle = mediaType === "movie" ? "Movies" : "TV Series";
  const toggleMediaType = mediaType === "movie" ? "tv" : "movie";
  const toggleLabel = `Toggle Search for ${
    toggleMediaType === "tv" ? "TV Series" : "Movies"
  }`;

  return (
    <>
      <ButtonSearchToggle
        mediaType={toggleMediaType}
        string={string}
        label={toggleLabel}
      />
      <div className="flex flex-col gap-4">
        {searchDatas.length > 0 ? (
          searchDatas.map((searchItem: SearchResultItem) => {
            const {
              id,
              poster_path,
              // Use optional chaining or checks for title/name and dates
              title,
              name,
              release_date,
              first_air_date,
              vote_average,
              overview,
            } = searchItem;

            const displayTitle = mediaType === "movie" ? title : name;
            const displayDate =
              mediaType === "movie" ? release_date : first_air_date;

            return (
              <Link
                key={id}
                href={`/details/${mediaType}/${id}`} // Use mediaType in href
                title={overview ?? ""}
                scroll={false}
              >
                <CardHorizontal
                  img={
                    poster_path
                      ? `https://image.tmdb.org/t/p/w342/${poster_path}`
                      : "https://placehold.co/185x278?text=Data+Unavailable"
                  }
                  imgWidth="342"
                  imgHeight="513"
                  title={`${displayTitle} (${
                    displayDate ? displayDate.substring(0, 4) : "TBA"
                  })`}
                  subtitle={overview ?? "Data Unavailable"}
                  subtitle2={<RadialRating rating={vote_average} size="2rem" />}
                />
              </Link>
            );
          })
        ) : (
          <div className="min-h-[250px]">
            <p>{pageTitle} Not Exist</p> {/* Dynamic "Not Exist" message */}
          </div>
        )}
      </div>
    </>
  );
}
