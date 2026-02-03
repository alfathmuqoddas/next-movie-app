import { getGenres } from "@/lib/getData";
import CategoryDropdown from "@/components/discover/CategoryDropdown";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    mediaType: "tv" | "movie"; // Don't restrict to "tv" | "movie" here
    categoryId: string;
    page: string;
  }>;
}

export default async function Layout({ params, children }: LayoutProps) {
  const { mediaType } = await params;
  const { genres } = await getGenres(mediaType);
  return (
    <section
      aria-label="discover"
      className="pt-8 max-w-5xl mx-auto px-4 md:px-0"
    >
      <CategoryDropdown categoryData={genres} />
      {children}
    </section>
  );
}
