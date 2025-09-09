import IntentForm from "@/components/IntentForm";
import AggregationView from "@/components/AggregationView";
import CoordinationSuggestions from "@/components/CoordinationSuggestions";
import LiveResult from "@/components/LiveResult";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      {/* Top heading keeps context clear. Keep copy short and human. */}
      <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-8">Anonymous intent coordination (demo)</h1>
      {/* Two equal columns: left = input, right = live and insights */}
      <section id="app" className="grid gap-6 sm:gap-8 sm:grid-cols-2 sm:items-stretch">
        <div className="space-y-6 min-h-[28rem] flex flex-col">
          <div className="rounded-2xl p-[1px] bg-gradient-to-br from-fuchsia-500/40 via-sky-500/40 to-violet-500/40">
            <div className="rounded-2xl bg-background p-5 h-full">
              <h3 className="font-semibold mb-2">Submit intent</h3>
              <IntentForm />
            </div>
          </div>
        </div>
        <div className="min-h-[28rem] flex flex-col gap-6">
          <div className="flex-1">
            <LiveResult />
          </div>
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5">
            <h3 className="font-semibold mb-2">Aggregation</h3>
            <AggregationView />
          </div>
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5">
            <h3 className="font-semibold mb-2">Coordination suggestions</h3>
            <CoordinationSuggestions />
          </div>
        </div>
      </section>

      <section id="features" className="mt-16 grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-5">
          <h3 className="font-semibold mb-2">Anonymous intent</h3>
          <p className="opacity-80 text-sm">Share what you want to do without revealing who you are. We hash locally and never store personal info.</p>
        </div>
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-5">
          <h3 className="font-semibold mb-2">Private aggregation</h3>
          <p className="opacity-80 text-sm">We only keep hashed entries and simple counts to spot overlaps for coordination.</p>
        </div>
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-5">
          <h3 className="font-semibold mb-2">Coordination</h3>
          <p className="opacity-80 text-sm">When enough similar intents show up, we suggest a time window or batch to act together.</p>
        </div>
      </section>

      <section id="goals" className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">Demo Goals</h2>
        <ul className="list-disc pl-5 space-y-2 opacity-90">
          <li>Show how anonymous intents can coordinate without doxxing anyone.</li>
          <li>Offer a simple prototype: submit → aggregate → suggest.</li>
          <li>Leave room to grow into real cases with XAN or others.</li>
        </ul>
      </section>

      {/* Informational sections below the app */}
    </main>
  );
}
