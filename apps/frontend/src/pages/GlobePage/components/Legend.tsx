import { getCityColorByCount } from "@/lib/utils";

const Legend = () => (
  <div className="absolute right-4 bottom-4 z-10 flex flex-col items-end space-y-1 rounded-xl bg-black/60 p-3 text-sm text-white shadow-md ring-1 ring-slate-600">
    <div className="flex items-center gap-2">
      <div
        className="h-3 w-6 rounded-sm"
        style={{ backgroundColor: getCityColorByCount(3) }}
      />
      <span>Low (≤3)</span>
    </div>
    <div className="flex items-center gap-2">
      <div
        className="h-3 w-6 rounded-sm"
        style={{ backgroundColor: getCityColorByCount(7) }}
      />
      <span>Medium (~7)</span>
    </div>
    <div className="flex items-center gap-2">
      <div
        className="h-3 w-6 rounded-sm"
        style={{ backgroundColor: getCityColorByCount(9) }}
      />
      <span>High (≥9)</span>
    </div>
  </div>
);

export default Legend;
