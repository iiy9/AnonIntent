"use client";

import { useEffect, useState } from "react";

interface LivePayload {
  hash: string;
  createdAt: number;
}

export default function LiveResult() {
  const [last, setLast] = useState<LivePayload | null>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    function onIntent(e: Event) {
      const custom = e as CustomEvent<LivePayload>;
      setLast(custom.detail);
      setAnimate(true);
      const t = setTimeout(() => setAnimate(false), 1200);
      return () => clearTimeout(t);
    }
    window.addEventListener("intent:submitted", onIntent as EventListener);
    return () => {
      window.removeEventListener("intent:submitted", onIntent as EventListener);
    };
  }, []);

  if (!last) {
    return (
      <div className="rounded-xl border border-black/10 dark:border-white/10 p-5 h-full flex items-center justify-center text-sm opacity-70">
        Submit an intent to see live result here.
      </div>
    );
  }

  return (
    <div className={`p-[1px] rounded-2xl bg-gradient-to-r from-fuchsia-500/60 via-sky-500/60 to-violet-500/60 ${animate ? "shadow-[0_0_0_3px_rgba(255,255,255,0.08)]" : ""}`}>
      <div className="rounded-2xl bg-background p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className={`h-6 w-6 rounded-full bg-foreground text-background flex items-center justify-center text-xs ${animate ? "animate-pulse" : ""}`}>✓</div>
          <div className="font-medium">Intent submitted</div>
        </div>
        <div className="grid gap-1 text-sm">
          <div className="opacity-70">Hash</div>
          <code className="break-all text-xs">{last.hash}</code>
          <div className="opacity-70 mt-2">Time</div>
          <div className="text-xs">{new Date(last.createdAt).toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}


