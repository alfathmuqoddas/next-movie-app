// app/search/[mediaType]/[string]/page.tsx (or a similar path)
import Link from "next/link";
import { SearchCard } from "@/components/card/index";
import RadialRating from "../../../../components/RadialRating";
import { queryData } from "../../../../lib/getData";
import ButtonSearchToggle from "../../../../components/ButtonSearchToggle";
import ScrollRestore from "@/components/ScrollRestore";
// import Toggle from "./Toggle";

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

  return { results };
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
  const { results: searchDatas } = await getSearchResults(mediaType, string);

  const pageTitle = mediaType === "movie" ? "Movies" : "TV Series";
  const toggleMediaType = mediaType === "movie" ? "tv" : "movie";
  const toggleLabel = `Toggle Search for ${
    toggleMediaType === "tv" ? "TV Series" : "Movies"
  }`;

  return (
    <>
      <ScrollRestore />
      <ButtonSearchToggle
        mediaType={toggleMediaType}
        string={string}
        label={toggleLabel}
      />
      {/* <div className="flex justify-center items-center">
        <Toggle mediaType={toggleMediaType} currentSearch={string} />
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 md:gap-x-0 gap-y-8">
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
              >
                <SearchCard
                  img={
                    poster_path
                      ? `https://image.tmdb.org/t/p/w185/${poster_path}`
                      : "https://placehold.co/185x278?text=Data+Unavailable"
                  }
                  title={`${displayTitle?.toString()} (${displayDate?.substring(
                    0,
                    4
                  )})`}
                  subtitle={
                    <RadialRating rating={vote_average} size="1.5rem" />
                  }
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
