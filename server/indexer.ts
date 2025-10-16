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
    
    const connectionResults: { success: number; failed: number } = { success: 0, failed: 0 };
    
    for (const config of CHAIN_CONFIGS) {
      try {
        // Use WebSocketProvider for wss:// URLs, JsonRpcProvider for https://
        const provider = config.rpcUrl.startsWith('wss://')
          ? new ethers.WebSocketProvider(config.rpcUrl)
          : new ethers.JsonRpcProvider(config.rpcUrl);
        
        // Test connection by getting network info
        await provider.getNetwork();
        
        this.providers.set(config.name, provider);

        const contract = new ethers.Contract(
          config.contractAddress,
          INTENT_ABI,
          provider
        );
        this.contracts.set(config.name, contract);

        console.log(`✓ Connected to ${config.name} (${config.rpcUrl.startsWith('wss://') ? 'WebSocket' : 'HTTP'})`);
        connectionResults.success++;
      } catch (error) {
        console.error(`✗ Failed to connect to ${config.name}:`, error);
        connectionResults.failed++;
      }
    }
    
    // Throw error if NO providers connected successfully
    if (connectionResults.success === 0) {
      throw new Error(`Failed to connect to any blockchain providers (0/${CHAIN_CONFIGS.length} succeeded)`);
    }
    
    if (connectionResults.failed > 0) {
      console.warn(`⚠ Connected to ${connectionResults.success}/${CHAIN_CONFIGS.length} chains (${connectionResults.failed} failed)`);
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
          const updatedIntent = await storage.updateIntentStatus(orderId, "success", {
            type: "OrderFilled",
            blockNumber: event.log.blockNumber,
            transactionHash: event.log.transactionHash,
          });
          
          if (updatedIntent) {
            console.log(`✓ Intent ${orderId.slice(0, 10)}... filled on ${chainName} (status: success)`);
          }
        } catch (error) {
          console.error("Error updating intent:", error);
        }
      });

      // Listen for CrossChainOrderCancelled events
      contract.on("CrossChainOrderCancelled", async (orderId: string, user: string, event: any) => {
        try {
          const updatedIntent = await storage.updateIntentStatus(orderId, "failed", {
            type: "OrderCancelled",
            blockNumber: event.log.blockNumber,
            transactionHash: event.log.transactionHash,
          });
          
          if (updatedIntent) {
            console.log(`✓ Intent ${orderId.slice(0, 10)}... cancelled on ${chainName} (status: failed)`);
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
}

export const indexer = new IntentIndexer();
