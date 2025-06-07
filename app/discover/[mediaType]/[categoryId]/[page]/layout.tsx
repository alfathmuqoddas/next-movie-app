import { getGenres } from "@/lib/getData";
import CategoryDropdown from "@/components/discover/CategoryDropdown";
export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ mediaType: "tv" | "movie" }>;
  children: React.ReactNode;
}) {
  const { mediaType } = await params;
  const { genres } = await getGenres(mediaType);
  return (
    <section
      aria-label="discover"
      className="pt-8 max-w-5xl mx-auto px-4 md:px-0"
    >
      <CategoryDropdown categoryData={genres} />
      {children}
      {/* pagination */}
    </section>
  );
}
