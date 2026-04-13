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
  const [sortOrder, setSortOrder] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const syncEntries = () => setEntries(getTimelineEntries());

    syncEntries();
    const unsubscribe = subscribeTimelineEntries(syncEntries);

    return () => {
      unsubscribe();
    };
  }, []);

  const visibleEntries = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filtered = entries.filter((entry) => {
      const matchesType = filter === 'all' ? true : entry.type === filter;

      if (!matchesType) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const searchableText = [
        entry.friendName,
        entry.type,
        entry.title,
        entry.text,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });

    return filtered.sort((a, b) => {
      const first = new Date(a.date || a.createdAt).getTime();
      const second = new Date(b.date || b.createdAt).getTime();
      const safeFirst = Number.isNaN(first) ? 0 : first;
      const safeSecond = Number.isNaN(second) ? 0 : second;

      return sortOrder === 'newest' ? safeSecond - safeFirst : safeFirst - safeSecond;
    });
  }, [entries, filter, sortOrder, searchQuery]);

  const hasActiveSearchOrFilter = searchQuery.trim().length > 0 || filter !== 'all';

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-4xl font-extrabold tracking-tight text-[#0f2747]">Timeline</h1>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div>
          <label className="sr-only" htmlFor="timeline-filter">
            Filter timeline
          </label>
          <select
            id="timeline-filter"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="h-11 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-[#64748b] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none focus:border-[#155946]"
          >
            <option value="all">Filter timeline</option>
            <option value="call">Calls</option>
            <option value="text">Texts</option>
            <option value="video">Videos</option>
          </select>
        </div>

        <div>
          <label className="sr-only" htmlFor="timeline-search">
            Search timeline
          </label>
          <input
            id="timeline-search"
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by friend or type"
            className="h-11 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-[#64748b] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none focus:border-[#155946]"
          />
        </div>

        <div>
          <label className="sr-only" htmlFor="timeline-sort">
            Sort timeline
          </label>
          <select
            id="timeline-sort"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
            className="h-11 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-[#64748b] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none focus:border-[#155946]"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>

      <section className="mt-6 space-y-3">
        {visibleEntries.length === 0 ? (
          <div className="rounded-md border border-zinc-200 bg-white px-4 py-4 text-sm text-[#64748b] shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
            {hasActiveSearchOrFilter
              ? 'No results found. Try another search term or filter.'
              : 'No timeline yet. Interactions will appear here.'}
          </div>
        ) : null}

        {visibleEntries.map((entry) => {
          const Icon = iconMap[entry.type] || FiMessageSquare;
          const displayTitle = entry.title || entry.text || `${entry.type} with ${entry.friendName}`;
          const displayDate = entry.displayDate || formatDate(entry.date || entry.createdAt);

          return (
            <article
              key={entry.id}
              className="flex flex-col gap-3 rounded-md border border-zinc-200 bg-white px-4 py-3 shadow-[0_1px_2px_rgba(16,24,40,0.05)] sm:flex-row sm:items-center"
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