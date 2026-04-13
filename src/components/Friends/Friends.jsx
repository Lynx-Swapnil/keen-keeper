import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import friends from '../../../public/friends.json';

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

const Friends = () => {
    return (
        <section className="mt-12">
            <h2 className="text-[34px] font-bold tracking-tight text-[#0f2747]">Your Friends</h2>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {friends.map((friend) => (
                    <Link
                        key={friend.id}
                        href={`/friends/${friend.id}`}
                        className="rounded-xl border border-zinc-200 bg-white px-6 py-6 text-center shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <Image
                            src={friend.picture}
                            alt={friend.name}
                            width={74}
                            height={74}
                            className="mx-auto h-18.5 w-18.5 rounded-full object-cover"
                        />

                        <h3 className="mt-4 text-[31px] font-semibold tracking-tight text-[#1f2937]">
                            {friend.name}
                        </h3>

                        <p className="mt-1 text-[17px] font-medium text-[#94a3b8]">
                            {friend.days_since_contact}d ago
                        </p>

                        <div className="mt-3 flex flex-wrap justify-center gap-2">
                            {friend.tags.map((tag) => (
                                <span
                                    key={`${friend.id}-${tag}`}
                                    className="rounded-full bg-[#bdeccf] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#235f4f]"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="mt-3">
                            <span
                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[friend.status]}`}
                            >
                                {formatStatus(friend.status)}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Friends;