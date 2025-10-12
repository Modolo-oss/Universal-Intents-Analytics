import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, FileJson, Database } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ApiDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">API Documentation</h1>
        <p className="text-muted-foreground mt-1">
          REST API endpoints for accessing intent analytics data
        </p>
      </div>

      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <Code className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Base URL</h3>
            <code className="px-3 py-1.5 bg-muted rounded-md font-mono text-sm">
              https://api.universalintents.io/v1
            </code>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="intents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="intents" data-testid="tab-intents">Intents</TabsTrigger>
          <TabsTrigger value="analytics" data-testid="tab-analytics">Analytics</TabsTrigger>
          <TabsTrigger value="chains" data-testid="tab-chains">Chains</TabsTrigger>
        </TabsList>

        <TabsContent value="intents" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-chart-2/15 text-chart-2 border-chart-2/30">GET</Badge>
              <code className="text-sm font-mono">/intents</code>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Retrieve a list of intents with optional filters
            </p>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium mb-2">Query Parameters</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <code className="px-2 py-1 bg-muted rounded text-xs">status</code>
                    <span className="text-muted-foreground">Filter by status (success, failed, pending, executing)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <code className="px-2 py-1 bg-muted rounded text-xs">chain</code>
                    <span className="text-muted-foreground">Filter by blockchain network</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <code className="px-2 py-1 bg-muted rounded text-xs">limit</code>
                    <span className="text-muted-foreground">Number of results (default: 50, max: 100)</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Example Response</h4>
                <pre className="p-4 bg-muted rounded-lg text-xs font-mono overflow-x-auto">
{`{
  "intents": [
    {
      "id": "0x1a2b3c...",
      "type": "Cross-Chain Swap",
      "chain": "Ethereum",
      "status": "success",
      "solver": "0x9876...",
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 1245890,
  "page": 1
}`}
                </pre>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-chart-2/15 text-chart-2 border-chart-2/30">GET</Badge>
              <code className="text-sm font-mono">/intents/:id</code>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Get detailed information about a specific intent
            </p>
            <div>
              <h4 className="text-sm font-medium mb-2">Example Response</h4>
              <pre className="p-4 bg-muted rounded-lg text-xs font-mono overflow-x-auto">
{`{
  "id": "0x1a2b3c4d5e6f...",
  "type": "Cross-Chain Swap",
  "chain": "Ethereum",
  "status": "success",
  "solver": "0x9876543210...",
  "timestamp": "2024-01-15T10:30:00Z",
  "parameters": {
    "from": "0xabc...",
    "to": "0xdef...",
    "amount": "1000000000000000000"
  },
  "events": [...]
}`}
              </pre>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-chart-2/15 text-chart-2 border-chart-2/30">GET</Badge>
              <code className="text-sm font-mono">/analytics/summary</code>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Get overall analytics summary and metrics
            </p>
            <div>
              <h4 className="text-sm font-medium mb-2">Example Response</h4>
              <pre className="p-4 bg-muted rounded-lg text-xs font-mono overflow-x-auto">
{`{
  "totalIntents": 1245890,
  "successRate": 94.2,
  "activeChains": 8,
  "topProtocol": "UniswapX",
  "volumeByChain": {...},
  "trends": {...}
}`}
              </pre>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="chains" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-chart-2/15 text-chart-2 border-chart-2/30">GET</Badge>
              <code className="text-sm font-mono">/chains</code>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              List all supported chains and their statistics
            </p>
            <div>
              <h4 className="text-sm font-medium mb-2">Example Response</h4>
              <pre className="p-4 bg-muted rounded-lg text-xs font-mono overflow-x-auto">
{`{
  "chains": [
    {
      "name": "Ethereum",
      "chainId": 1,
      "intents": 560500,
      "successRate": 95.1
    },
    ...
  ]
}`}
              </pre>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <Database className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Data Export</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Export intent data in CSV or JSON format for external analysis
            </p>
            <code className="px-3 py-1.5 bg-background rounded-md font-mono text-sm">
              GET /export?format=csv&range=30d
            </code>
          </div>
        </div>
      </Card>
    </div>
  );
}
