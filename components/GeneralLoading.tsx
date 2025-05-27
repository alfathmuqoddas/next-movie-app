export default function Loading() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-64px)] w-full">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-neutral-500" />
    </div>
  );
}
