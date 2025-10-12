import { IntentTable } from "@/components/intent-table";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Filter } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

export default function Explorer() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [chainFilter, setChainFilter] = useState("all");

  const { data: intentsData } = useQuery({
    queryKey: ["/api/intents", statusFilter, chainFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (chainFilter !== "all") params.append("chain", chainFilter);
      params.append("limit", "50");
      
      const res = await fetch(`/api/intents?${params.toString()}`);
      return res.json();
    },
  });

  const allIntents = intentsData?.intents?.map((intent: any) => ({
    ...intent,
    timestamp: formatDistanceToNow(new Date(intent.timestamp), { addSuffix: true }),
  })) || [];

  const handleExport = async () => {
    const format = "json";
    const url = `/api/export?format=${format}`;
    window.open(url, '_blank');
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
          Showing <span className="font-medium text-foreground">{allIntents.length}</span> of <span className="font-medium text-foreground">{intentsData?.total || 0}</span> intents
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
