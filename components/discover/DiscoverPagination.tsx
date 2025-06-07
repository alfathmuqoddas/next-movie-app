"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DiscoverPagination({ page, total_pages }) {
  const router = useRouter();
  const goToPage = (currentPage: string, type: "previous" | "next") => {
    let newPage = Number(currentPage);
    if (type === "previous") {
      newPage = newPage - 1;
    } else {
      newPage = newPage + 1;
    }
    router.push(newPage.toString());
  };
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        className="btn btn-outline btn-sm"
        onClick={() => goToPage(page, "previous")}
        disabled={page <= 1}
      >
        <ArrowLeft />
      </button>
      <button className="btn btn-ghost btn-sm">
        <span>{page}</span>
        <span>/</span>
        <span>{total_pages}</span>
      </button>
      <button
        className="btn btn-outline btn-sm"
        onClick={() => goToPage(page, "next")}
        disabled={page >= total_pages}
      >
        <ArrowRight />
      </button>
    </div>
  );
}
