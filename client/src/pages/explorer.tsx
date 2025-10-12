import { IntentTable } from "@/components/intent-table";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Filter } from "lucide-react";
import { useState } from "react";

export default function Explorer() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [chainFilter, setChainFilter] = useState("all");

  const allIntents = [
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
    {
      id: "0x6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u",
      type: "Bridge",
      chain: "Optimism",
      solver: "0x43210985a9876543210985a98765432",
      status: "success" as const,
      timestamp: "28 mins ago",
    },
    {
      id: "0x7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v",
      type: "Cross-Chain Swap",
      chain: "Arbitrum",
      solver: "0x321098498765432109854987654321098",
      status: "failed" as const,
      timestamp: "35 mins ago",
    },
    {
      id: "0x8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w",
      type: "Swap",
      chain: "Base",
      solver: "0x2109837876543210983787654321098",
      status: "success" as const,
      timestamp: "42 mins ago",
    },
  ];

  const handleExport = () => {
    console.log("Exporting data...");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Intents Explorer</h1>
        <p className="text-muted-foreground mt-1">
          Search, filter, and explore all intent transactions
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <SearchBar />
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]" data-testid="select-status-filter">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="executing">Executing</SelectItem>
            </SelectContent>
          </Select>

          <Select value={chainFilter} onValueChange={setChainFilter}>
            <SelectTrigger className="w-[140px]" data-testid="select-chain-filter">
              <SelectValue placeholder="Chain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Chains</SelectItem>
              <SelectItem value="ethereum">Ethereum</SelectItem>
              <SelectItem value="optimism">Optimism</SelectItem>
              <SelectItem value="arbitrum">Arbitrum</SelectItem>
              <SelectItem value="base">Base</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            onClick={handleExport}
            data-testid="button-export"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="bg-muted/30 rounded-lg p-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{allIntents.length}</span> intents
        </p>
        <p className="text-sm text-muted-foreground">
          Filters: <span className="font-medium text-foreground">{statusFilter === "all" ? "All Status" : statusFilter}</span>, <span className="font-medium text-foreground">{chainFilter === "all" ? "All Chains" : chainFilter}</span>
        </p>
      </div>

      <IntentTable 
        intents={allIntents}
        onRowClick={(intent) => console.log("View intent details:", intent.id)}
      />
    </div>
  );
}
