'use client';

import React, { useMemo, useState } from 'react';
import { FiMessageSquare, FiPhone, FiVideo } from 'react-icons/fi';
import { toast } from 'react-toastify';
import FriendCard from './FriendCard';
import { addTimelineEntry } from '@/lib/timelineStore';

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
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const title = `${type[0].toUpperCase() + type.slice(1)} with ${friend.name}`;

    const newEntry = {
      id: `${friend.id}-${type}-${today.getTime()}`,
      friendId: friend.id,
      friendName: friend.name,
      type,
      title,
      date: today.toISOString(),
      displayDate: formattedDate,
      createdAt: today.toISOString(),
      text: title,
    };

    addTimelineEntry(newEntry);
    setFeedback(`${type[0].toUpperCase() + type.slice(1)} entry added to timeline.`);
    toast.success(`${title} added to timeline`);
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
              className="btn btn-ghost rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm font-medium normal-case text-[#64748b] hover:bg-zinc-50"
            >
              Edit
            </button>
          </div>

          <p className="mt-3 text-[#64748b]">
            Connect every <span className="font-semibold text-[#334155]">{friend.goal} days</span>
          </p>
        </section>

        <section className="rounded-md border border-zinc-200 bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
          <h2 className="text-3xl font-semibold tracking-tight text-[#2f4f45]">Quick Check-In</h2>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {checkInButtons.map(({ key, label, Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => handleQuickCheckIn(key)}
                className="btn flex h-24 flex-col items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-[#eef2f6] px-4 py-3 text-[#1f2937] transition-colors hover:bg-[#e8edf3]"
              >
                <Icon aria-hidden="true" className="text-2xl sm:text-3xl" />
                <span className="text-lg font-medium leading-none sm:text-2xl">{label}</span>
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
