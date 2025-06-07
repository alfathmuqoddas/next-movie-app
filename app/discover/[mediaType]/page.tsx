import { redirect, notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ mediaType: "tv" | "movie" }>;
}) {
  const { mediaType } = await params;
  if (mediaType === "tv") {
    redirect("tv/10751/1");
  } else if (mediaType === "movie") {
    redirect("movie/28/1");
  } else {
    notFound();
  }
}
