import Link from 'next/link';
import { MdArrowLeft } from 'react-icons/md';
import friends from '../../../../public/friends.json';
import FriendDetailsPanel from '@/components/Friends/FriendDetailsPanel';

export default async function FriendDetailPage({ params }) {
  const { id } = await params;
  const friend = friends.find((item) => item.id === Number(id));

  if (!friend) {
    return (
      <main className="mx-auto w-full max-w-4xl px-6 py-14">
        <h1 className="text-3xl font-bold text-[#0f2747]">Friend not found</h1>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1 rounded-md bg-[#155946] px-4 py-2 text-base font-semibold text-white"
        >
          <MdArrowLeft aria-hidden="true" className="text-lg" />
          Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <Link href="/" className="inline-flex items-center gap-0.5 text-base font-semibold text-[#155946] hover:underline">
        <MdArrowLeft aria-hidden="true" className="text-lg" />
        Back to Home
      </Link>

      <FriendDetailsPanel friend={friend} />
    </main>
  );
}
