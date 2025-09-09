"use client";

import { useCallback, useMemo, useState } from "react";

interface IntentInputState {
  content: string;
}

// Hash input on the client so we never store raw content
function sha256Hex(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  return crypto.subtle.digest("SHA-256", data).then((hash) => {
    const bytes = new Uint8Array(hash);
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  });
}

// Keep demo data in localStorage for a quick prototype experience
function getLocalIntentsKey(): string {
  return "anonintent:intents";
}

interface StoredIntent {
  id: string;
  hash: string;
  createdAt: number;
}

export default function IntentForm() {
  const [state, setState] = useState<IntentInputState>({ content: "" });
  const [submitting, setSubmitting] = useState(false);
  const [resultHash, setResultHash] = useState<string | null>(null);
  const [storedCount, setStoredCount] = useState<number>(0);

  // A few helpful examples to speed up testing the flow
  const presets: { label: string; content: string }[] = [
    { label: "Stake XAN at 20% APY", content: "Stake my XAN at ~20% APY for 90 days." },
    { label: "Batch stake window", content: "Join a coordinated staking window to optimize fees and execution." },
    { label: "Coordination batch", content: "Include my intent in the next anonymous coordination batch." },
  ];

  const isValid = useMemo(() => state.content.trim().length > 0, [state]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!isValid) return;
      setSubmitting(true);
      try {
        const payload = JSON.stringify({ content: state.content.trim() });
        const hash = await sha256Hex(payload);

        const storedRaw = localStorage.getItem(getLocalIntentsKey());
        const stored: StoredIntent[] = storedRaw ? JSON.parse(storedRaw) : [];
        const newItem: StoredIntent = {
          id: crypto.randomUUID(),
          hash,
          createdAt: Date.now(),
        };
        const updated = [newItem, ...stored].slice(0, 200);
        localStorage.setItem(getLocalIntentsKey(), JSON.stringify(updated));
        setStoredCount(updated.length);
        setResultHash(hash);
        setState({ content: "" });

        // Let live results pick this up and animate
        const event = new CustomEvent("intent:submitted", {
          detail: { hash: newItem.hash, createdAt: newItem.createdAt },
        });
        window.dispatchEvent(event);
      } finally {
        setSubmitting(false);
      }
    },
    [isValid, state.content]
  );

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 max-w-2xl rounded-xl border border-black/10 dark:border-white/10 p-5 bg-black/[0.02] dark:bg-white/[0.03]">
      <div className="flex flex-wrap gap-2 mb-1">
        {presets.map((p) => (
          <button
            key={p.label}
            type="button"
            className="px-3 py-1.5 rounded-md border border-black/10 dark:border-white/10 text-xs hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
            onClick={() => setState({ content: p.content })}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="grid gap-2">
        <label htmlFor="content" className="text-sm font-medium">
          Intent Content
        </label>
        <textarea
          id="content"
          className="rounded-md border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 min-h-28 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
          placeholder="Describe your intent without personal info..."
          value={state.content}
          onChange={(e) => setState((s) => ({ ...s, content: e.target.value }))}
        />
        <p className="text-xs opacity-70">We hash locally. No personal details are stored.</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-foreground text-background text-sm font-medium disabled:opacity-60 shadow hover:opacity-90"
          disabled={!isValid || submitting}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
        <div className="text-xs opacity-70">Stored: {storedCount}</div>
      </div>
      {resultHash && (
        <div className="grid gap-3">
          <div className="text-sm font-medium">Flow</div>
          <ol className="grid gap-2 text-sm">
            <li className="rounded-md border border-black/10 dark:border-white/10 p-3">1. Input captured (no personal data)</li>
            <li className="rounded-md border border-black/10 dark:border-white/10 p-3">2. Client-side SHA-256 hashing</li>
            <li className="rounded-md border border-black/10 dark:border-white/10 p-3">3. Stored locally for demo aggregation</li>
          </ol>
          <div className="rounded-md border border-black/10 dark:border-white/10 p-3 break-all text-xs">
            <div className="font-semibold mb-1">Intent Hash</div>
            <code>{resultHash}</code>
          </div>
        </div>
      )}
    </form>
  );
}


