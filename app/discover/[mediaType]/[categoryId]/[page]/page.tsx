import { getDiscover, getGenres } from "@/lib/getData";
import { CardGrid } from "@/components/Card";
import DiscoverPagination from "@/components/DiscoverPagination";
import ScrollRestore from "@/components/ScrollRestore";

export function generateMetadata() {
  return {
    title: "Discover | ALEFAST",
    description: "Discover movies and TV series",
    openGraph: {
      title: "Discover | ALEFAST",
      description: "Discover movies and TV series",
      images: [
        {
          url: "https://placehold.co/1200x630?text=Data+Unavailable",
          width: 1200,
          height: 630,
          alt: "Discover | ALEFAST",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Discover | ALEFAST",
      description: "Discover movies and TV series",
      images: [
        {
          url: "https://placehold.co/1200x630?text=Data+Unavailable",
          width: 1200,
          height: 630,
          alt: "Discover | ALEFAST",
        },
      ],
    },
  };
}

export default async function DiscoverCategoryPage({
  params,
}: {
  params: Promise<{
    categoryId: string;
    mediaType: "tv" | "movie";
    page: string;
  }>;
}) {
  const { categoryId, mediaType, page } = await params;
  const { results, total_pages } = await getDiscover(
    "",
    categoryId,
    page,
    mediaType
  );

  return (
    <>
      <ScrollRestore />
      {results.length > 0 ? (
        <article className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-8">
          {results.map((result: any) => (
            <CardGrid
              key={result.id}
              img={
                result.poster_path
                  ? `https://image.tmdb.org/t/p/w342/${result.poster_path}`
                  : "https://placehold.co/185x278?text=Data+Unavailable"
              }
              title={mediaType === "movie" ? result.title : result.name}
              link={`/details/${mediaType}/${result.id}`}
            />
          ))}
        </article>
      ) : (
        <div className="flex justify-center items-center gap-4 mt-12">
          <p>No results found</p>
        </div>
      )}
      <DiscoverPagination page={page} total_pages={total_pages} />
    </>
  );
}
