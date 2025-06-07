import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  redirect(`${categoryId}/1`);
}
