import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Clock, Loader2 } from "lucide-react";

type Status = "success" | "failed" | "pending" | "executing";

interface StatusBadgeProps {
  status: Status;
  showIcon?: boolean;
}

const statusConfig = {
  success: {
    label: "Success",
    className: "bg-chart-2/15 text-chart-2 border-chart-2/30",
    icon: CheckCircle2,
  },
  failed: {
    label: "Failed",
    className: "bg-destructive/15 text-destructive border-destructive/30",
    icon: XCircle,
  },
  pending: {
    label: "Pending",
    className: "bg-chart-3/15 text-chart-3 border-chart-3/30",
    icon: Clock,
  },
  executing: {
    label: "Executing",
    className: "bg-chart-1/15 text-chart-1 border-chart-1/30",
    icon: Loader2,
  },
};

export function StatusBadge({ status, showIcon = true }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge 
      variant="outline" 
      className={cn("font-medium", config.className)}
      data-testid={`badge-status-${status}`}
    >
      {showIcon && <Icon className={cn("h-3 w-3 mr-1", status === "executing" && "animate-spin")} />}
      {config.label}
    </Badge>
  );
}
