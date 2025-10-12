import { MetricCard } from "@/components/metric-card";
import { VolumeChart } from "@/components/volume-chart";
import { ChainDistribution } from "@/components/chain-distribution";
import { ProtocolRankings } from "@/components/protocol-rankings";
import { IntentTable } from "@/components/intent-table";
import { TimeRangeSelector } from "@/components/time-range-selector";
import { Activity, CheckCircle2, Layers, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

interface Intent {
  id: string;
  type: string;
  chain: string;
  status: "success" | "failed" | "pending" | "executing";
  solver: string;
  timestamp: string;
}

interface Summary {
  totalIntents: number;
  successRate: number;
  activeChains: number;
  topProtocol: string;
}

interface ChainData {
  name: string;
  value: number;
}

interface ProtocolData {
  name: string;
  intents: number;
  percentage: number;
}

export default function Dashboard() {
  const { data: summary } = useQuery<Summary>({
    queryKey: ["/api/analytics/summary"],
  });

  const { data: chainData } = useQuery<ChainData[]>({
    queryKey: ["/api/analytics/chain-distribution"],
  });

  const { data: protocolsData } = useQuery<ProtocolData[]>({
    queryKey: ["/api/analytics/protocol-rankings"],
  });

  const { data: intentsData } = useQuery({
    queryKey: ["/api/intents"],
    queryFn: async () => {
      const res = await fetch("/api/intents?limit=10");
      return res.json();
    },
  });

  const volumeData = [
    { date: "Jan 1", ethereum: 4000, optimism: 2400, arbitrum: 1800, base: 1200 },
    { date: "Jan 5", ethereum: 3000, optimism: 1398, arbitrum: 2100, base: 980 },
    { date: "Jan 10", ethereum: 5000, optimism: 3800, arbitrum: 2500, base: 1500 },
    { date: "Jan 15", ethereum: 2780, optimism: 3908, arbitrum: 1900, base: 1200 },
    { date: "Jan 20", ethereum: 4890, optimism: 4800, arbitrum: 3100, base: 2100 },
    { date: "Jan 25", ethereum: 6390, optimism: 3800, arbitrum: 2900, base: 1800 },
    { date: "Jan 30", ethereum: 7490, optimism: 4300, arbitrum: 3500, base: 2300 },
  ];

  const recentIntents = intentsData?.intents?.map((intent: Intent) => ({
    ...intent,
    timestamp: formatDistanceToNow(new Date(intent.timestamp), { addSuffix: true }),
  })) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Real-time analytics for ERC-7683 intent activities
          </p>
        </div>
        <TimeRangeSelector />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Intents"
          value={summary?.totalIntents?.toLocaleString() || "0"}
          icon={<Activity className="h-5 w-5" />}
        />
        <MetricCard
          title="Success Rate"
          value={summary?.successRate ? `${summary.successRate.toFixed(1)}%` : "0%"}
          icon={<CheckCircle2 className="h-5 w-5" />}
        />
        <MetricCard
          title="Active Chains"
          value={summary?.activeChains?.toString() || "0"}
          icon={<Layers className="h-5 w-5" />}
        />
        <MetricCard
          title="Top Protocol"
          value={summary?.topProtocol || "N/A"}
          icon={<TrendingUp className="h-5 w-5" />}
        />
      </div>

      <VolumeChart data={volumeData} />

      <div className="grid gap-6 lg:grid-cols-2">
        <ChainDistribution data={chainData || []} />
        <ProtocolRankings protocols={protocolsData || []} />
      </div>

      <div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Recent Intents</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Latest intent transactions across all chains
          </p>
        </div>
        <IntentTable 
          intents={recentIntents}
          onRowClick={(intent) => console.log("Navigate to intent details:", intent.id)}
        />
      </div>
    </div>
  );
}
