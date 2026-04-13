'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { getTimelineEntries, subscribeTimelineEntries } from '@/lib/timelineStore';

const chartColors = {
  text: '#7c3aed',
  call: '#1f5a48',
  video: '#3fb37f',
};

const labels = {
  text: 'Text',
  call: 'Call',
  video: 'Video',
};

const buildChartData = (entries) => {
  const counts = {
    call: 0,
    text: 0,
    video: 0,
  };

  entries.forEach((entry) => {
    if (counts[entry.type] !== undefined) {
      counts[entry.type] += 1;
    }
  });

  return [
    { name: labels.text, key: 'text', value: counts.text },
    { name: labels.call, key: 'call', value: counts.call },
    { name: labels.video, key: 'video', value: counts.video },
  ];
};

export default function StatsPage() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const syncEntries = () => setEntries(getTimelineEntries());

    syncEntries();
    const unsubscribe = subscribeTimelineEntries(syncEntries);

    return () => {
      unsubscribe();
    };
  }, []);

  const chartData = useMemo(() => buildChartData(entries), [entries]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-4xl font-extrabold tracking-tight text-[#0f2747]">Friendship Analytics</h1>

      <section className="mt-6 rounded-lg border border-zinc-200 bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.05)] sm:p-6">
        <h2 className="text-sm font-medium text-[#425466]">By Interaction Type</h2>

        <div className="mt-3 h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="46%"
                innerRadius={56}
                outerRadius={88}
                dataKey="value"
                stroke="#f8fafc"
                strokeWidth={4}
                paddingAngle={2}
              >
                {chartData.map((slice) => (
                  <Cell key={slice.key} fill={chartColors[slice.key]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                formatter={(value) => <span className="text-xs text-[#64748b]">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
    </main>
  );
}
