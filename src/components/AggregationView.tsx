"use client";

import { useEffect, useMemo, useState } from "react";

interface StoredIntent {
  id: string;
  hash: string;
  createdAt: number;
}

function getLocalIntentsKey(): string {
  return "anonintent:intents";
}

function groupByTime(intents: StoredIntent[]): { label: string; count: number }[] {
  const now = Date.now();
  const buckets = [
    { label: "Last 1h", start: now - 60 * 60 * 1000, count: 0 },
    { label: "Last 24h", start: now - 24 * 60 * 60 * 1000, count: 0 },
    { label: "All time", start: 0, count: 0 },
  ];
  for (const it of intents) {
    if (it.createdAt >= buckets[0].start) buckets[0].count++;
    if (it.createdAt >= buckets[1].start) buckets[1].count++;
    buckets[2].count++;
  }
  return buckets.map(({ label, count }) => ({ label, count }));
}

export default function AggregationView() {
  const [intents, setIntents] = useState<StoredIntent[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(getLocalIntentsKey());
    const parsed: StoredIntent[] = raw ? JSON.parse(raw) : [];
    setIntents(parsed);
  }, []);

  const total = intents.length;
  const byTime = useMemo(() => groupByTime(intents), [intents]);

  return (
    <div className="grid gap-6">
      <div className="rounded-xl border border-black/10 dark:border-white/10 p-5">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-sm opacity-70">Total Intents</div>
            <div className="text-2xl font-semibold">{total}</div>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {byTime.map((b) => (
          <div key={b.label} className="rounded-xl border border-black/10 dark:border-white/10 p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">{b.label}</div>
              <div className="text-sm opacity-70">{b.count}</div>
            </div>
            <div className="h-2 rounded bg-black/5 dark:bg-white/10 overflow-hidden">
              <div className="h-full bg-foreground" style={{ width: `${total > 0 ? Math.round((b.count / total) * 100) : 0}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


