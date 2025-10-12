import { MetricCard } from "../metric-card";
import { Activity } from "lucide-react";

export default function MetricCardExample() {
  return (
    <div className="p-6 bg-background">
      <MetricCard
        title="Total Intents"
        value="1,245,890"
        change={12.5}
        changeLabel="vs last month"
        icon={<Activity className="h-5 w-5" />}
      />
    </div>
  );
}
