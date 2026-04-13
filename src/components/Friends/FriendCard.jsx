import React from 'react';
import Image from 'next/image';
import { FiArchive, FiClock, FiTrash2 } from 'react-icons/fi';

const statusStyles = {
    overdue: 'bg-[#ef4444] text-white',
    'almost due': 'bg-[#f59e0b] text-white',
    'on-track': 'bg-[#1f5f50] text-white',
};

const formatStatus = (status) => {
    if (status === 'on-track') {
        return 'On-Track';
    }

    return status
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const FriendCard = ({ friend }) => {
    return (
        <aside className="space-y-3">
            <section className="rounded-xl border border-zinc-200 bg-white px-6 py-5 text-center shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
                <Image
                    src={friend.picture}
                    alt={friend.name}
                    width={74}
                    height={74}
                    className="mx-auto h-18.5 w-18.5 rounded-full object-cover"
                />

                <h1 className="mt-3 text-2xl font-semibold tracking-tight text-[#1f2937]">
                    {friend.name}
                </h1>

                <div className="mt-2">
                    <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[friend.status]}`}
                    >
                        {formatStatus(friend.status)}
                    </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                    {friend.tags.map((tag) => (
                        <span
                            key={`${friend.id}-${tag}`}
                            className="rounded-full bg-[#bdeccf] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#235f4f]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <p className="mt-4 text-sm italic text-[#64748b]">
                    &ldquo;{friend.bio}&rdquo;
                </p>
                <p className="mt-2 text-sm text-[#94a3b8]">Preferred: {friend.email}</p>
            </section>

            <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-[#0f2747]"
            >
                <FiClock className="text-base" />
                Snooze 2 Weeks
            </button>

            <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-[#0f2747]"
            >
                <FiArchive className="text-base" />
                Archive
            </button>

            <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-[#ef4444]"
            >
                <FiTrash2 className="text-base" />
                Delete
            </button>
        </aside>
    );
};

export default FriendCard;