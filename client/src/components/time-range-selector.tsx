import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

type TimeRange = "24h" | "7d" | "30d" | "90d" | "all";

interface TimeRangeSelectorProps {
  onRangeChange?: (range: TimeRange) => void;
}

const ranges: { value: TimeRange; label: string }[] = [
  { value: "24h", label: "24H" },
  { value: "7d", label: "7D" },
  { value: "30d", label: "30D" },
  { value: "90d", label: "90D" },
  { value: "all", label: "All" },
];

export function TimeRangeSelector({ onRangeChange }: TimeRangeSelectorProps) {
  const [selected, setSelected] = useState<TimeRange>("30d");

  const handleSelect = (range: TimeRange) => {
    setSelected(range);
    onRangeChange?.(range);
    console.log("Time range changed to:", range);
  };

  return (
    <div className="flex items-center gap-1 p-1 bg-muted rounded-md">
      {ranges.map((range) => (
        <Button
          key={range.value}
          variant="ghost"
          size="sm"
          onClick={() => handleSelect(range.value)}
          className={cn(
            "h-8 px-3 text-sm font-medium transition-colors",
            selected === range.value 
              ? "bg-background shadow-sm" 
              : "hover:bg-background/50"
          )}
          data-testid={`button-range-${range.value}`}
        >
          {range.label}
        </Button>
      ))}
    </div>
  );
}
