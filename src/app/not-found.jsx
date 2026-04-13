import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-4xl items-center justify-center px-4 sm:px-6">
      <section className="w-full rounded-2xl border border-zinc-200 bg-white px-6 py-12 text-center shadow-[0_1px_2px_rgba(16,24,40,0.05)] sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#155946]">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#0f2747] sm:text-5xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#64748b] sm:text-base">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-md bg-[#155946] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#104739]"
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
}