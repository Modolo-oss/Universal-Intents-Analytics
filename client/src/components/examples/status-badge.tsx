import { StatusBadge } from "../status-badge";

export default function StatusBadgeExample() {
  return (
    <div className="p-6 bg-background flex gap-2 flex-wrap">
      <StatusBadge status="success" />
      <StatusBadge status="failed" />
      <StatusBadge status="pending" />
      <StatusBadge status="executing" />
    </div>
  );
}
