import { IntentTable } from "../intent-table";
import { Toaster } from "@/components/ui/toaster";

export default function IntentTableExample() {
  const mockIntents = [
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
  ];

  return (
    <div className="p-6 bg-background">
      <IntentTable 
        intents={mockIntents}
        onRowClick={(intent) => console.log("Row clicked:", intent)}
      />
      <Toaster />
    </div>
  );
}
