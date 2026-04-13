import Link from 'next/link';
import Image from 'next/image';
import friends from '../../../../../public/friends.json';

export default async function FriendDetailPage({ params }) {
  const { id } = await params;
  const friend = friends.find((item) => item.id === Number(id));

  if (!friend) {
    return (
      <main className="mx-auto w-full max-w-4xl px-6 py-14">
        <h1 className="text-3xl font-bold text-[#0f2747]">Friend not found</h1>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-md bg-[#155946] px-4 py-2 text-sm font-semibold text-white"
        >
          Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-14">
      <Link href="/" className="text-sm font-semibold text-[#155946] hover:underline">
        Back to Home
      </Link>

      <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-8 shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <Image
            src={friend.picture}
            alt={friend.name}
            width={96}
            height={96}
            className="h-24 w-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold text-[#0f2747]">{friend.name}</h1>
            <p className="mt-1 text-sm text-[#62758f]">{friend.email}</p>
            <p className="mt-2 text-sm font-medium text-[#1f5f50]">
              {friend.days_since_contact} days since last contact
            </p>
          </div>
        </div>

        <p className="mt-6 text-[#334155]">{friend.bio}</p>
      </section>
    </main>
  );
}
