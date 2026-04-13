'use client';

import React, { useMemo, useState } from 'react';
import { FiMessageSquare, FiPhone, FiVideo } from 'react-icons/fi';
import FriendCard from './FriendCard';

const TIMELINE_STORAGE_KEY = 'keenkeeper_timeline_entries';

const checkInButtons = [
  { key: 'call', label: 'Call', Icon: FiPhone },
  { key: 'text', label: 'Text', Icon: FiMessageSquare },
  { key: 'video', label: 'Video', Icon: FiVideo },
];

const formatDate = (isoDate) => {
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const FriendDetailsPanel = ({ friend }) => {
  const [feedback, setFeedback] = useState('');

  const stats = useMemo(
    () => [
      { label: 'Days Since Contact', value: friend.days_since_contact },
      { label: 'Goal (Days)', value: friend.goal },
      { label: 'Next Due', value: formatDate(friend.next_due_date) },
    ],
    [friend.days_since_contact, friend.goal, friend.next_due_date]
  );

  const handleQuickCheckIn = (type) => {
    const existing = window.localStorage.getItem(TIMELINE_STORAGE_KEY);
    const parsedEntries = existing ? JSON.parse(existing) : [];

    const newEntry = {
      id: `${friend.id}-${type}-${parsedEntries.length + 1}`,
      friendId: friend.id,
      friendName: friend.name,
      type,
      createdAt: 'now',
      text: `${type[0].toUpperCase() + type.slice(1)} check-in with ${friend.name}`,
    };

    const nextEntries = [newEntry, ...parsedEntries];

    window.localStorage.setItem(TIMELINE_STORAGE_KEY, JSON.stringify(nextEntries));
    window.dispatchEvent(new CustomEvent('keenkeeper:timeline-updated'));
    setFeedback(`${type[0].toUpperCase() + type.slice(1)} entry added to timeline.`);
  };

  return (
    <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
      <FriendCard friend={friend} />

      <div className="space-y-4">
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-md border border-zinc-200 bg-white px-4 py-5 text-center shadow-[0_1px_2px_rgba(16,24,40,0.05)]"
            >
              <p className="text-4xl font-semibold leading-none text-[#1f5f50]">{stat.value}</p>
              <p className="mt-2 text-sm text-[#62758f]">{stat.label}</p>
            </article>
          ))}
        </section>

        <section className="rounded-md border border-zinc-200 bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#334155]">Relationship Goal</h2>
            <button
              type="button"
              className="rounded-md border border-zinc-200 px-3 py-1 text-sm font-medium text-[#64748b]"
            >
              Edit
            </button>
          </div>

          <p className="mt-3 text-[#64748b]">
            Connect every <span className="font-semibold text-[#334155]">{friend.goal} days</span>
          </p>
        </section>

        <section className="rounded-md border border-zinc-200 bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
          <h2 className="text-xl font-semibold text-[#334155]">Quick Check-In</h2>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {checkInButtons.map(({ key, label, Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => handleQuickCheckIn(key)}
                className="flex items-center justify-center gap-2 rounded-md border border-zinc-200 bg-[#f8fafc] px-4 py-4 text-sm font-medium text-[#0f2747] transition-colors hover:bg-zinc-100"
              >
                <Icon className="text-base" />
                {label}
              </button>
            ))}
          </div>

          {feedback ? <p className="mt-3 text-sm text-[#1f5f50]">{feedback}</p> : null}
        </section>
      </div>
    </section>
  );
};

export default FriendDetailsPanel;
