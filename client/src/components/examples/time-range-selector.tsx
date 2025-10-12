import { TimeRangeSelector } from "../time-range-selector";

export default function TimeRangeSelectorExample() {
  return (
    <div className="p-6 bg-background">
      <TimeRangeSelector onRangeChange={(range) => console.log("Selected range:", range)} />
    </div>
  );
}
