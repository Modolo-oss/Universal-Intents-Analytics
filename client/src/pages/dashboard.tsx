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
  // Demo data for all charts
  const demoSummary: Summary = {
    totalIntents: 1247,
    successRate: 78.5,
    activeChains: 4,
    topProtocol: "Across Protocol"
  };

  const demoChainData: ChainData[] = [
    { name: "Arbitrum", value: 456 },
    { name: "Base", value: 389 },
    { name: "Ethereum", value: 234 },
    { name: "Optimism", value: 168 }
  ];

  const demoProtocolsData: ProtocolData[] = [
    { name: "Across Protocol", intents: 456, percentage: 37 },
    { name: "UniswapX", intents: 389, percentage: 31 },
    { name: "1inch Fusion", intents: 234, percentage: 19 },
    { name: "Other", intents: 168, percentage: 13 }
  ];

  const demoIntents: Intent[] = [
    {
      id: "0xabc123...",
      type: "Cross-Chain Swap",
      chain: "Arbitrum",
      status: "success",
      solver: "0x742d35...",
      timestamp: "2 minutes ago"
    },
    {
      id: "0xdef456...",
      type: "Bridge",
      chain: "Base",
      status: "pending",
      solver: "0x8f3a21...",
      timestamp: "5 minutes ago"
    },
    {
      id: "0xghi789...",
      type: "Cross-Chain Swap",
      chain: "Ethereum",
      status: "success",
      solver: "0x1a2b3c...",
      timestamp: "8 minutes ago"
    },
    {
      id: "0xjkl012...",
      type: "Bridge",
      chain: "Optimism",
      status: "failed",
      solver: "0x4d5e6f...",
      timestamp: "12 minutes ago"
    },
    {
      id: "0xmno345...",
      type: "Cross-Chain Swap",
      chain: "Arbitrum",
      status: "success",
      solver: "0x7g8h9i...",
      timestamp: "15 minutes ago"
    }
  ];

  const { data: summary } = useQuery<Summary>({
    queryKey: ["/api/analytics/summary"],
    initialData: demoSummary,
  });

  const { data: chainData } = useQuery<ChainData[]>({
    queryKey: ["/api/analytics/chain-distribution"],
    initialData: demoChainData,
  });

  const { data: protocolsData } = useQuery<ProtocolData[]>({
    queryKey: ["/api/analytics/protocol-rankings"],
    initialData: demoProtocolsData,
  });

  const { data: intentsData } = useQuery({
    queryKey: ["/api/intents"],
    queryFn: async () => {
      const res = await fetch("/api/intents?limit=10");
      return res.json();
    },
    initialData: { intents: demoIntents },
  });

  const volumeData = [
    { date: "Dec 1", arbitrum: 456, base: 389, ethereum: 234, optimism: 168 },
    { date: "Dec 5", arbitrum: 523, base: 412, ethereum: 198, optimism: 145 },
    { date: "Dec 10", arbitrum: 489, base: 445, ethereum: 267, optimism: 189 },
    { date: "Dec 15", arbitrum: 567, base: 398, ethereum: 234, optimism: 201 },
    { date: "Dec 20", arbitrum: 612, base: 456, ethereum: 289, optimism: 223 },
    { date: "Dec 25", arbitrum: 534, base: 423, ethereum: 256, optimism: 187 },
    { date: "Dec 30", arbitrum: 678, base: 512, ethereum: 312, optimism: 245 },
  ];

  const recentIntents = intentsData?.intents || demoIntents;

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
