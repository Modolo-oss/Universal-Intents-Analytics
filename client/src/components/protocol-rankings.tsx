import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Protocol {
  name: string;
  intents: number;
  percentage: number;
}

interface ProtocolRankingsProps {
  protocols: Protocol[];
}

export function ProtocolRankings({ protocols }: ProtocolRankingsProps) {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Top Protocols</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Most active intent protocols
        </p>
      </div>
      <div className="space-y-4">
        {protocols.map((protocol, index) => (
          <div key={protocol.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {index + 1}
                </span>
                <span className="font-medium">{protocol.name}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold tabular-nums">{protocol.intents.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{protocol.percentage}%</p>
              </div>
            </div>
            <Progress value={protocol.percentage} className="h-2" />
          </div>
        ))}
      </div>
    </Card>
  );
}
