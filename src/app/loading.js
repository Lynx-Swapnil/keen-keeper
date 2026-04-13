export default function Loading() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-6xl items-center justify-center px-4 sm:px-6">
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-zinc-200 bg-white px-8 py-10 shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#d8e7e1] border-t-[#155946]" />
        <p className="text-sm font-medium text-[#62758f]">Loading KeenKeeper...</p>
      </div>
    </main>
  );
}