import { getCityColorByCount } from "@/lib/utils";

const items = [
  { count: 3, label: "Low (≤3)" },
  { count: 7, label: "Medium (~7)" },
  { count: 9, label: "High (≥9)" },
];

const Legend = () => (
  <div className="absolute right-4 bottom-4 z-10 flex flex-col items-end space-y-1 rounded-xl bg-black/60 p-3 text-sm text-white shadow-md ring-1 ring-slate-600">
    {items.map(({ count, label }) => (
      <div
        key={count}
        className="flex items-center gap-2"
      >
        <div
          aria-label={label}
          className="h-3 w-6 rounded-sm"
          style={{ backgroundColor: getCityColorByCount(count) }}
        />
        <span>{label}</span>
      </div>
    ))}
  </div>
);

export default Legend;
