export default async function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-5xl px-4 mx-auto flex flex-col pt-12 gap-12 min-h-[calc(100vh-240px)]">
      {children}
    </div>
  );
}
