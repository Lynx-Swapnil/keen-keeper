"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import Friends from '@/components/Friends/Friends';
import { getTimelineEntries, subscribeTimelineEntries } from '@/lib/timelineStore';

const LoadingView = () => (
    <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-zinc-200 bg-white px-8 py-10 shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#d8e7e1] border-t-[#155946]" />
            <p className="text-sm font-medium text-[#62758f]">Loading friends...</p>
        </div>
    </div>
);

const HomePage = () => {
    const [friends, setFriends] = useState([]);
    const [timelineEntries, setTimelineEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadFriends = async () => {
            try {
                const response = await fetch('/friends.json');
                const data = await response.json();

                if (isMounted) {
                    setFriends(data);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadFriends();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        const syncEntries = () => setTimelineEntries(getTimelineEntries());

        syncEntries();
        const unsubscribe = subscribeTimelineEntries(syncEntries);

        return () => {
            unsubscribe();
        };
    }, []);

    const summaryCards = useMemo(() => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const onTrackCount = friends.filter((friend) => friend.status === 'on-track').length;
        const needAttentionCount = friends.filter((friend) => friend.status !== 'on-track').length;
        const interactionsThisMonth = timelineEntries.filter((entry) => {
            const interactionDate = new Date(entry.date || entry.createdAt);

            if (Number.isNaN(interactionDate.getTime())) {
                return false;
            }

            return (
                interactionDate.getMonth() === currentMonth &&
                interactionDate.getFullYear() === currentYear
            );
        }).length;

        return [
            { value: friends.length, label: 'Total Friends' },
            { value: onTrackCount, label: 'On Track' },
            { value: needAttentionCount, label: 'Need Attention' },
            { value: interactionsThisMonth, label: 'Interactions This Month' },
        ];
    }, [friends, timelineEntries]);

    if (isLoading) {
        return (
            <main className="mx-auto w-full max-w-6xl px-4 pb-14 pt-10 sm:px-6 sm:pt-14">
                <LoadingView />
            </main>
        );
    }

    return (
        <main className="mx-auto w-full max-w-6xl px-4 pb-14 pt-10 sm:px-6 sm:pt-14">
            <section className="flex flex-col items-center text-center">
                <h1 className="text-3xl font-extrabold tracking-tight text-[#0f2747] sm:text-5xl">
                    Friends to keep close in your life
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-[#5d7088] sm:text-base">
                    Your personal shelf of meaningful connections. Browse, tend, and nurture the
                    relationships that matter most.
                </p>

                <button
                    type="button"
                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#155946] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#104739] sm:w-auto"
                >
                    <FiPlus className="text-base" aria-hidden="true" />
                    Add a Friend
                </button>
            </section>

            <section className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
                {summaryCards.map((card) => (
                    <article
                        key={card.label}
                        className="rounded-xl border border-zinc-200 bg-white px-4 py-6 text-center shadow-[0_1px_2px_rgba(16,24,40,0.05)] sm:px-6 sm:py-8"
                    >
                        <p className="text-2xl font-semibold leading-none text-[#1f5f50] sm:text-4xl">
                            {card.value}
                        </p>
                        <p className="mt-3 text-xs font-medium text-[#62758f] sm:text-sm">
                            {card.label}
                        </p>
                    </article>
                ))}
            </section>

            <hr className="mt-10 border-zinc-200" />

            <Friends friends={friends} />
        </main>
    );
};

export default HomePage;