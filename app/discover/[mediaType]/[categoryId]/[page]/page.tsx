import { getDiscover, getGenres } from "@/lib/getData";

export default async function DiscoverCategoryPage({
  params,
}: {
  params: Promise<{ categoryId: string; mediaType: string; page: string }>;
}) {
  const { categoryId, mediaType, page } = await params;
  const data = await getDiscover("", categoryId, page, mediaType);
  const genres = await getGenres(mediaType);

  return (
    <>
      categoryId: {categoryId}, mediaType: {mediaType}, page: {page}
    </>
  );
}
