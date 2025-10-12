import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TimeRangeSelector } from "@/components/time-range-selector";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Analytics() {
  const comparisonData = [
    { protocol: "UniswapX", success: 458, failed: 12, pending: 8 },
    { protocol: "1inch", success: 324, failed: 8, pending: 5 },
    { protocol: "CowSwap", success: 216, failed: 15, pending: 6 },
    { protocol: "0x", success: 86, failed: 3, pending: 2 },
  ];

  const performanceData = [
    { month: "Aug", avgTime: 2.4, volume: 12000 },
    { month: "Sep", avgTime: 2.1, volume: 15000 },
    { month: "Oct", avgTime: 1.9, volume: 18000 },
    { month: "Nov", avgTime: 1.8, volume: 22000 },
    { month: "Dec", avgTime: 1.6, volume: 28000 },
    { month: "Jan", avgTime: 1.5, volume: 35000 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Deep-dive performance metrics and comparisons
          </p>
        </div>
        <TimeRangeSelector />
      </div>

      <div className="flex items-center gap-3">
        <Select defaultValue="protocol">
          <SelectTrigger className="w-[200px]" data-testid="select-metric">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="protocol">By Protocol</SelectItem>
            <SelectItem value="chain">By Chain</SelectItem>
            <SelectItem value="solver">By Solver</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Protocol Performance Comparison</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Success vs failure rates across protocols
          </p>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="protocol" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
              }}
            />
            <Legend />
            <Bar dataKey="success" fill="hsl(var(--chart-2))" name="Success" />
            <Bar dataKey="failed" fill="hsl(var(--destructive))" name="Failed" />
            <Bar dataKey="pending" fill="hsl(var(--chart-3))" name="Pending" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Execution Performance Trends</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Average execution time and volume over 6 months
          </p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              yAxisId="left"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              label={{ value: 'Avg Time (s)', angle: -90, position: 'insideLeft' }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              label={{ value: 'Volume', angle: 90, position: 'insideRight' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
              }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="avgTime" fill="hsl(var(--chart-1))" name="Avg Time (s)" />
            <Bar yAxisId="right" dataKey="volume" fill="hsl(var(--chart-4))" name="Volume" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Best Performing Chain</h3>
          <p className="text-2xl font-semibold">Optimism</p>
          <p className="text-sm text-chart-2 mt-1">98.5% success rate</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Fastest Execution</h3>
          <p className="text-2xl font-semibold">1.2s</p>
          <p className="text-sm text-chart-2 mt-1">Average response time</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Top Solver</h3>
          <p className="text-2xl font-semibold font-mono">0x9876...</p>
          <p className="text-sm text-chart-2 mt-1">24,582 intents solved</p>
        </Card>
      </div>
    </div>
  );
}
