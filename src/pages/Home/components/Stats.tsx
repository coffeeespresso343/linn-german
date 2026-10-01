const STATS = [
  { value: "6", label: "CEFR levels, A1 to C2" },
  { value: "3", label: "explanation languages" },
  { value: "10", label: "planned A1 units" },
  { value: "15", label: "grammar categories" },
];

export function Stats() {
  return (
    <div className="border-y border-border bg-surface">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label}>
            <dd className="text-3xl font-semibold tracking-tight">{s.value}</dd>
            <dt className="mt-1 text-sm text-muted">{s.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}
