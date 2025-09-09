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

export default function CoordinationSuggestions() {
  const [intents, setIntents] = useState<StoredIntent[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(getLocalIntentsKey());
    const parsed: StoredIntent[] = raw ? JSON.parse(raw) : [];
    setIntents(parsed);
  }, []);

  const suggestions = useMemo(() => {
    const total = intents.length;
    const list: { title: string; detail: string }[] = [];
    if (total >= 8) {
      list.push({
        title: "Open coordination batch",
        detail:
          "Enough anonymous intents detected. Suggest opening a time-bounded batch to co-execute for better fees and liveness.",
      });
    }
    if (total >= 3) {
      list.push({
        title: "Announce soft coordination window",
        detail:
          "Signal a soft window for participants to submit intents, improving matching without exposing identities.",
      });
    }
    if (list.length === 0) {
      list.push({
        title: "Waiting for more intents",
        detail:
          "As intents accumulate, coordination opportunities will be proposed here.",
      });
    }
    return list;
  }, [intents]);

  return (
    <div className="grid gap-4">
      {suggestions.map((s, i) => (
        <div key={i} className="rounded-xl border border-black/10 dark:border-white/10 p-5">
          <div className="font-medium mb-1">{s.title}</div>
          <p className="opacity-80 text-sm">{s.detail}</p>
        </div>
      ))}
    </div>
  );
}


