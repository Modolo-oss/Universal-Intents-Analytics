import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
}

export function MetricCard({ title, value, change, changeLabel, icon }: MetricCardProps) {
  const isPositive = change !== undefined && change >= 0;
  
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-semibold tabular-nums">{value}</h3>
          </div>
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {isPositive ? (
                <TrendingUp className="h-3.5 w-3.5 text-chart-2" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-destructive" />
              )}
              <span className={cn(
                "text-sm font-medium",
                isPositive ? "text-chart-2" : "text-destructive"
              )}>
                {isPositive ? "+" : ""}{change}%
              </span>
              {changeLabel && (
                <span className="text-sm text-muted-foreground">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div className="p-2.5 rounded-md bg-primary/10 text-primary">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
