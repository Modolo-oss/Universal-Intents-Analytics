import { ethers } from "ethers";
import { storage } from "./storage";
import type { InsertIntent } from "@shared/schema";

// ERC-7683 CrossChainOrder event ABI (simplified for demo)
const INTENT_ABI = [
  "event CrossChainOrderOpened(bytes32 indexed orderId, address indexed user, address indexed solver, uint256 amount)",
  "event CrossChainOrderFilled(bytes32 indexed orderId, address indexed solver, uint256 fillAmount)",
  "event CrossChainOrderCancelled(bytes32 indexed orderId, address indexed user)"
];

interface ChainConfig {
  name: string;
  chainId: number;
  rpcUrl: string;
  contractAddress: string;
}

// Production chain configurations with real Across Protocol (AcrossOriginSettler) contracts
// Using WebSocket providers for efficient real-time event listening
const CHAIN_CONFIGS: ChainConfig[] = [
  {
    name: "Arbitrum",
    chainId: 42161,
    rpcUrl: "wss://arbitrum-one-rpc.publicnode.com", // WebSocket for reliable event listening
    contractAddress: "0xB0B07055F214Ce59ccb968663d3435B9f3294998", // Across AcrossOriginSettler
  },
  {
    name: "Base",
    chainId: 8453,
    rpcUrl: "wss://base.publicnode.com", // WebSocket for reliable event listening
    contractAddress: "0x4afb570AC68BfFc26Bb02FdA3D801728B0f93C9E", // Across AcrossOriginSettler
  },
  // Testnet configuration (uncomment for testing)
  // {
  //   name: "Sepolia",
  //   chainId: 11155111,
  //   rpcUrl: "wss://ethereum-sepolia-rpc.publicnode.com",
  //   contractAddress: "0x43f133FE6fDFA17c417695c476447dc2a449Ba5B", // Across Testnet Spoke1
  // },
];

class IntentIndexer {
  private providers: Map<string, ethers.WebSocketProvider | ethers.JsonRpcProvider> = new Map();
  private contracts: Map<string, ethers.Contract> = new Map();
  private isRunning = false;

  async initialize() {
    console.log("Initializing Intent Indexer...");
    
    for (const config of CHAIN_CONFIGS) {
      try {
        // Use WebSocketProvider for wss:// URLs, JsonRpcProvider for https://
        const provider = config.rpcUrl.startsWith('wss://')
          ? new ethers.WebSocketProvider(config.rpcUrl)
          : new ethers.JsonRpcProvider(config.rpcUrl);
        
        this.providers.set(config.name, provider);

        const contract = new ethers.Contract(
          config.contractAddress,
          INTENT_ABI,
          provider
        );
        this.contracts.set(config.name, contract);

        console.log(`✓ Connected to ${config.name} (${config.rpcUrl.startsWith('wss://') ? 'WebSocket' : 'HTTP'})`);
      } catch (error) {
        console.error(`✗ Failed to connect to ${config.name}:`, error);
      }
    }
  }

  async startIndexing() {
    if (this.isRunning) {
      console.log("Indexer already running");
      return;
    }

    this.isRunning = true;
    console.log("Starting intent indexing...");

    // Subscribe to events on each chain
    for (const [chainName, contract] of Array.from(this.contracts.entries())) {
      const config = CHAIN_CONFIGS.find(c => c.name === chainName)!;

      // Listen for CrossChainOrderOpened events
      contract.on("CrossChainOrderOpened", async (orderId: string, user: string, solver: string, amount: bigint, event: any) => {
        try {
          const intent: InsertIntent = {
            id: orderId,
            type: "Cross-Chain Swap",
            chain: chainName,
            chainId: config.chainId,
            status: "pending",
            solver: solver,
            fromAddress: user,
            toAddress: null,
            amount: amount.toString(),
            protocol: "ERC-7683",
            parameters: {
              user,
              solver,
              amount: amount.toString(),
            },
            events: [
              {
                type: "OrderOpened",
                timestamp: new Date().toISOString(),
                blockNumber: event.log.blockNumber,
                transactionHash: event.log.transactionHash,
              }
            ],
            blockNumber: event.log.blockNumber,
            transactionHash: event.log.transactionHash,
          };

          await storage.createIntent(intent);
          console.log(`✓ Indexed new intent: ${orderId.slice(0, 10)}... on ${chainName}`);
        } catch (error) {
          console.error("Error indexing intent:", error);
        }
      });

      // Listen for CrossChainOrderFilled events
      contract.on("CrossChainOrderFilled", async (orderId: string, solver: string, fillAmount: bigint, event: any) => {
        try {
          const existingIntent = await storage.getIntent(orderId);
          if (existingIntent) {
            // Update intent status to success
            // Note: In production, you'd want an update method in storage
            console.log(`✓ Intent ${orderId.slice(0, 10)}... filled on ${chainName}`);
          }
        } catch (error) {
          console.error("Error updating intent:", error);
        }
      });

      // Listen for CrossChainOrderCancelled events
      contract.on("CrossChainOrderCancelled", async (orderId: string, user: string, event: any) => {
        try {
          const existingIntent = await storage.getIntent(orderId);
          if (existingIntent) {
            // Update intent status to failed
            console.log(`✓ Intent ${orderId.slice(0, 10)}... cancelled on ${chainName}`);
          }
        } catch (error) {
          console.error("Error updating cancelled intent:", error);
        }
      });
    }

    console.log("✓ Indexer listening for events on all chains");
  }

  async stopIndexing() {
    this.isRunning = false;
    
    for (const contract of Array.from(this.contracts.values())) {
      contract.removeAllListeners();
    }
    
    // Close WebSocket connections
    for (const provider of Array.from(this.providers.values())) {
      if (provider instanceof ethers.WebSocketProvider) {
        await provider.destroy();
      }
    }
    
    console.log("Indexer stopped");
  }

  // Generate sample data for demo purposes
  async generateSampleData() {
    console.log("Generating sample intent data...");
    
    const protocols = ["UniswapX", "1inch Fusion", "CowSwap", "0x Protocol"];
    const chains = ["Ethereum", "Optimism", "Arbitrum", "Base"];
    const statuses = ["success", "failed", "pending", "executing"];
    const types = ["Cross-Chain Swap", "Bridge", "Swap"];

    const sampleIntents: InsertIntent[] = [];
    
    for (let i = 0; i < 50; i++) {
      const chain = chains[Math.floor(Math.random() * chains.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      sampleIntents.push({
        id: `0x${Math.random().toString(16).slice(2).padEnd(64, '0')}`,
        type: types[Math.floor(Math.random() * types.length)],
        chain,
        chainId: chains.indexOf(chain) + 1,
        status,
        solver: `0x${Math.random().toString(16).slice(2).padEnd(40, '0')}`,
        fromAddress: `0x${Math.random().toString(16).slice(2).padEnd(40, '0')}`,
        toAddress: `0x${Math.random().toString(16).slice(2).padEnd(40, '0')}`,
        amount: (Math.random() * 1000000000000000000).toString(),
        protocol: protocols[Math.floor(Math.random() * protocols.length)],
        parameters: {},
        events: [],
        blockNumber: Math.floor(Math.random() * 1000000) + 18000000,
        transactionHash: `0x${Math.random().toString(16).slice(2).padEnd(64, '0')}`,
      });
    }

    for (const intent of sampleIntents) {
      try {
        await storage.createIntent(intent);
      } catch (error) {
        // Ignore duplicate errors
      }
    }

    console.log(`✓ Generated ${sampleIntents.length} sample intents`);
  }
}

export const indexer = new IntentIndexer();
