import React from 'react';
import { FiPlus } from 'react-icons/fi';
import Friends from '@/components/Friends/Friends';

const summaryCards = [
    { value: '10', label: 'Total Friends' },
    { value: '3', label: 'On Track' },
    { value: '6', label: 'Need Attention' },
    { value: '12', label: 'Interactions This Month' },
];

const HomePage = () => {
    return (
        <main className="mx-auto w-full max-w-6xl px-6 pb-14 pt-14">
            <section className="flex flex-col items-center text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-[#0f2747] sm:text-5xl">
                    Friends to keep close in your life
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-[#5d7088] sm:text-base">
                    Your personal shelf of meaningful connections. Browse, tend, and nurture
                    the <br /> relationships that matter most.
                </p>

                <button
                    type="button"
                    className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#155946] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#104739]"
                >
                    <FiPlus className="text-base" aria-hidden="true" />
                    Add a Friend
                </button>
            </section>

            <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {summaryCards.map((card) => (
                    <article
                        key={card.label}
                        className="rounded-xl border border-zinc-200 bg-white px-6 py-8 text-center shadow-[0_1px_2px_rgba(16,24,40,0.05)]"
                    >
                        <p className="text-4xl font-semibold leading-none text-[#1f5f50]">
                            {card.value}
                        </p>
                        <p className="mt-3 text-sm font-medium text-[#62758f]">{card.label}</p>
                    </article>
                ))}
            </section>

            <hr className="mt-10 border-zinc-200" />

            <Friends />
        </main>
    );
};

export default HomePage;