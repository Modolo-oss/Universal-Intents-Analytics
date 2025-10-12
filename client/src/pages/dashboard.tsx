import { MetricCard } from "@/components/metric-card";
import { VolumeChart } from "@/components/volume-chart";
import { ChainDistribution } from "@/components/chain-distribution";
import { ProtocolRankings } from "@/components/protocol-rankings";
import { IntentTable } from "@/components/intent-table";
import { TimeRangeSelector } from "@/components/time-range-selector";
import { Activity, CheckCircle2, Layers, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const volumeData = [
    { date: "Jan 1", ethereum: 4000, optimism: 2400, arbitrum: 1800, base: 1200 },
    { date: "Jan 5", ethereum: 3000, optimism: 1398, arbitrum: 2100, base: 980 },
    { date: "Jan 10", ethereum: 5000, optimism: 3800, arbitrum: 2500, base: 1500 },
    { date: "Jan 15", ethereum: 2780, optimism: 3908, arbitrum: 1900, base: 1200 },
    { date: "Jan 20", ethereum: 4890, optimism: 4800, arbitrum: 3100, base: 2100 },
    { date: "Jan 25", ethereum: 6390, optimism: 3800, arbitrum: 2900, base: 1800 },
    { date: "Jan 30", ethereum: 7490, optimism: 4300, arbitrum: 3500, base: 2300 },
  ];

  const chainData = [
    { name: "Ethereum", value: 45 },
    { name: "Optimism", value: 25 },
    { name: "Arbitrum", value: 18 },
    { name: "Base", value: 12 },
  ];

  const protocols = [
    { name: "UniswapX", intents: 458230, percentage: 42 },
    { name: "1inch Fusion", intents: 324156, percentage: 30 },
    { name: "CowSwap", intents: 216104, percentage: 20 },
    { name: "0x Protocol", intents: 86442, percentage: 8 },
  ];

  const recentIntents = [
    {
      id: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p",
      type: "Cross-Chain Swap",
      chain: "Ethereum",
      solver: "0x9876543210fedcba9876543210fedcba",
      status: "success" as const,
      timestamp: "2 mins ago",
    },
    {
      id: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q",
      type: "Bridge",
      chain: "Optimism",
      solver: "0x8765432109edcba98765432109edcba9",
      status: "executing" as const,
      timestamp: "5 mins ago",
    },
    {
      id: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r",
      type: "Swap",
      chain: "Arbitrum",
      solver: "0x7654321098dcba987654321098dcba98",
      status: "failed" as const,
      timestamp: "12 mins ago",
    },
    {
      id: "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s",
      type: "Cross-Chain Swap",
      chain: "Base",
      solver: "0x6543210987cba9876543210987cba987",
      status: "success" as const,
      timestamp: "18 mins ago",
    },
    {
      id: "0x5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
      type: "Swap",
      chain: "Ethereum",
      solver: "0x543210986ba98765432109876ba9876",
      status: "pending" as const,
      timestamp: "22 mins ago",
    },
  ];

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
          value="1,245,890"
          change={12.5}
          changeLabel="vs last month"
          icon={<Activity className="h-5 w-5" />}
        />
        <MetricCard
          title="Success Rate"
          value="94.2%"
          change={2.1}
          changeLabel="vs last month"
          icon={<CheckCircle2 className="h-5 w-5" />}
        />
        <MetricCard
          title="Active Chains"
          value="8"
          change={0}
          changeLabel="stable"
          icon={<Layers className="h-5 w-5" />}
        />
        <MetricCard
          title="Top Protocol"
          value="UniswapX"
          change={5.3}
          changeLabel="market share"
          icon={<TrendingUp className="h-5 w-5" />}
        />
      </div>

      <VolumeChart data={volumeData} />

      <div className="grid gap-6 lg:grid-cols-2">
        <ChainDistribution data={chainData} />
        <ProtocolRankings protocols={protocols} />
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
