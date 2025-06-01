import { getDiscover, getGenres } from "@/lib/getData";
import CategoryDropdown from "@/components/discover/CategoryDropdown";

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
  const { results } = await getDiscover("", categoryId, page, mediaType);
  const { genres } = await getGenres(mediaType);

  console.log({ results, genres });

  return (
    <>
      <CategoryDropdown categoryData={genres} />
      categoryId: {categoryId}, mediaType: {mediaType}, page: {page}
    </>
  );
}
