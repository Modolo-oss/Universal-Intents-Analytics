import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "./status-badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Status = "success" | "failed" | "pending" | "executing";

interface Intent {
  id: string;
  type: string;
  chain: string;
  status: Status;
  solver: string;
  timestamp: string;
  amount?: string;
}

interface IntentTableProps {
  intents: Intent[];
  onRowClick?: (intent: Intent) => void;
}

export function IntentTable({ intents, onRowClick }: IntentTableProps) {
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${label} copied successfully`,
    });
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Intent ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Chain</TableHead>
            <TableHead>Solver</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {intents.map((intent) => (
            <TableRow
              key={intent.id}
              className="cursor-pointer hover-elevate"
              onClick={() => onRowClick?.(intent)}
              data-testid={`row-intent-${intent.id}`}
            >
              <TableCell className="font-mono text-sm">
                <div className="flex items-center gap-2">
                  <span>{truncateAddress(intent.id)}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(intent.id, "Intent ID");
                    }}
                    data-testid={`button-copy-${intent.id}`}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="font-medium">{intent.type}</TableCell>
              <TableCell>
                <span className="px-2 py-1 rounded-md bg-muted text-sm">
                  {intent.chain}
                </span>
              </TableCell>
              <TableCell className="font-mono text-sm">
                {truncateAddress(intent.solver)}
              </TableCell>
              <TableCell>
                <StatusBadge status={intent.status} />
              </TableCell>
              <TableCell className="text-muted-foreground">
                {intent.timestamp}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("View details for", intent.id);
                  }}
                  data-testid={`button-view-${intent.id}`}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
