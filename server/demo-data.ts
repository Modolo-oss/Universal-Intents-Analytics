// Demo data for Railway deployment when database is not available
export const demoData = {
  summary: {
    totalIntents: 1247,
    successRate: 78.5,
    activeChains: 4,
    topProtocol: "Across Protocol"
  },
  chainData: [
    { name: "Arbitrum", value: 456 },
    { name: "Base", value: 389 },
    { name: "Ethereum", value: 234 },
    { name: "Optimism", value: 168 }
  ],
  protocolsData: [
    { name: "Across Protocol", intents: 456, percentage: 37 },
    { name: "UniswapX", intents: 389, percentage: 31 },
    { name: "1inch Fusion", intents: 234, percentage: 19 },
    { name: "Other", intents: 168, percentage: 13 }
  ],
  intents: [
    {
      id: "0xabc123...",
      type: "Cross-Chain Swap",
      chain: "Arbitrum",
      status: "success",
      solver: "0x742d35...",
      timestamp: new Date().toISOString()
    },
    {
      id: "0xdef456...",
      type: "Bridge",
      chain: "Base",
      status: "pending",
      solver: "0x8f3a21...",
      timestamp: new Date().toISOString()
    },
    {
      id: "0xghi789...",
      type: "Cross-Chain Swap",
      chain: "Ethereum",
      status: "success",
      solver: "0x1a2b3c...",
      timestamp: new Date().toISOString()
    },
    {
      id: "0xjkl012...",
      type: "Bridge",
      chain: "Optimism",
      status: "failed",
      solver: "0x4d5e6f...",
      timestamp: new Date().toISOString()
    },
    {
      id: "0xmno345...",
      type: "Cross-Chain Swap",
      chain: "Arbitrum",
      status: "success",
      solver: "0x7g8h9i...",
      timestamp: new Date().toISOString()
    }
  ]
};
