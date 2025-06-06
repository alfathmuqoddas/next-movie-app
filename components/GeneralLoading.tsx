export default function Loading() {
  return (
    <div className="flex justify-center items-center w-full min-h-[calc(100vh-240px)]">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-neutral-500" />
    </div>
  );
}
