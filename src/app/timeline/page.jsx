'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { FiMessageSquare, FiPhone, FiVideo } from 'react-icons/fi';
import { getTimelineEntries, subscribeTimelineEntries } from '@/lib/timelineStore';

const iconMap = {
  call: FiPhone,
  text: FiMessageSquare,
  video: FiVideo,
};

const formatDate = (value) => {
  if (!value) {
    return '';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export default function TimelinePage() {
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const syncEntries = () => setEntries(getTimelineEntries());

    syncEntries();
    const unsubscribe = subscribeTimelineEntries(syncEntries);

    return () => {
      unsubscribe();
    };
  }, []);

  const visibleEntries = useMemo(() => {
    if (filter === 'all') {
      return entries;
    }

    return entries.filter((entry) => entry.type === filter);
  }, [entries, filter]);

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <h1 className="text-4xl font-extrabold tracking-tight text-[#0f2747]">Timeline</h1>

      <div className="mt-4 flex justify-start">
        <label className="sr-only" htmlFor="timeline-filter">
          Filter timeline
        </label>
        <select
          id="timeline-filter"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="h-11 w-64 rounded-md border border-zinc-200 bg-white px-3 text-sm text-[#64748b] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none focus:border-[#155946]"
        >
          <option value="all">Filter timeline</option>
          <option value="call">Calls</option>
          <option value="text">Texts</option>
          <option value="video">Videos</option>
        </select>
      </div>

      <section className="mt-6 space-y-3">
        {visibleEntries.map((entry) => {
          const Icon = iconMap[entry.type] || FiMessageSquare;
          const displayTitle = entry.title || entry.text || `${entry.type} with ${entry.friendName}`;
          const displayDate = entry.displayDate || formatDate(entry.date || entry.createdAt);

          return (
            <article
              key={entry.id}
              className="flex items-center gap-4 rounded-md border border-zinc-200 bg-white px-4 py-3 shadow-[0_1px_2px_rgba(16,24,40,0.05)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8fafc] text-[#155946]">
                <Icon className="text-xl" />
              </div>

              <div>
                <h2 className="text-sm font-medium text-[#0f2747]">{displayTitle}</h2>
                <p className="text-xs text-[#64748b]">{displayDate}</p>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}