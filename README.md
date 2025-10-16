# Universal Intents Analytics Platform

> Open-source blockchain analytics platform for indexing, analyzing, and visualizing ERC-7683/OIF (Open Intents Framework) intent activities across Ethereum and EVM-compatible chains.

![Platform Status](https://img.shields.io/badge/status-MVP%20v1.0-success)
![License](https://img.shields.io/badge/license-MIT-blue)
![Gitcoin](https://img.shields.io/badge/Gitcoin-GG24-purple)

## 🎯 Overview

The Universal Intents Analytics Platform is a comprehensive monitoring solution designed for developers, researchers, and ecosystem builders who need visibility into cross-chain intent transactions, execution patterns, and protocol performance.

### Key Features

- 📊 **Real-time Dashboard** - Live metrics showing total intents, success rates, and protocol analytics
- 🔍 **Advanced Explorer** - Filterable intent table with chain and status filtering
- 📈 **Analytics & Visualizations** - Interactive charts for protocol rankings, chain distribution, and performance trends
- 🔌 **REST API** - Public endpoints for programmatic access to intent data
- 📤 **Data Export** - CSV and JSON export functionality for analysis
- ⛓️ **Multi-chain Support** - Ethereum, Optimism, Arbitrum, Base, and more

## 🏗️ How It Works

### System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        BLOCKCHAIN LAYER                          │
│  Ethereum │ Optimism │ Arbitrum │ Base │ ... (EVM Chains)       │
│           ERC-7683 Intent Contracts                             │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ Events: CrossChainOrderOpened
                         │         CrossChainOrderFilled
                         │         CrossChainOrderCancelled
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      INDEXER SERVICE                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Event        │  │ Data Parser  │  │ Storage      │          │
│  │ Listeners    │→ │ & Validator  │→ │ Writer       │          │
│  │ (ethers.js)  │  │              │  │              │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      POSTGRESQL DATABASE                         │
│  ┌─────────────────────────────────────────────────────┐        │
│  │  intents table:                                      │        │
│  │  - id, chain, status, solver, amount, protocol       │        │
│  │  - timestamps, transaction hashes, events (JSONB)    │        │
│  │  - Indexed: status, chain, solver, timestamp         │        │
│  └─────────────────────────────────────────────────────┘        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                         REST API                                 │
│  Express.js + Drizzle ORM                                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ /api/intents │  │ /api/        │  │ /api/export  │          │
│  │              │  │ analytics    │  │ (CSV/JSON)   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ Dashboard   │  │ Explorer    │  │ Analytics   │             │
│  │ (Metrics)   │  │ (Table)     │  │ (Charts)    │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                  │
│  TanStack Query → API Calls → Real-time UI Updates              │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow Explanation

#### 1. **Blockchain Event Emission**
```
Smart Contract (ERC-7683) → Emits Event → Event Log on Blockchain
```
When users create, fill, or cancel cross-chain orders, the ERC-7683 contract emits events:
- `CrossChainOrderOpened` - New intent created
- `CrossChainOrderFilled` - Intent successfully executed
- `CrossChainOrderCancelled` - Intent cancelled

#### 2. **Event Indexing**
```
RPC Node → WebSocket Connection → Indexer Listener → Parse Event Data
```
The indexer service:
- Maintains WebSocket connections to multiple chains (Ethereum, Optimism, etc.)
- Listens for ERC-7683 events in real-time
- Parses event parameters (orderId, user, solver, amount, etc.)
- Validates and normalizes data

#### 3. **Data Storage**
```
Parsed Event → Database Insert/Update → PostgreSQL
```
Processed intent data is stored with:
- Transaction metadata (hash, block number, timestamp)
- Intent details (chain, protocol, status, amounts)
- Participant addresses (user, solver, destination)
- Event history (JSONB for full audit trail)

#### 4. **API Layer**
```
Database → Drizzle ORM → REST Endpoints → JSON Response
```
Express.js API provides:
- Intent queries with filtering (status, chain, pagination)
- Aggregated analytics (success rates, protocol rankings)
- Export functionality (CSV/JSON downloads)

#### 5. **Frontend Display**
```
API Response → TanStack Query → React State → UI Components
```
React application:
- Fetches data via API endpoints
- Caches with TanStack Query for performance
- Renders interactive dashboards and charts
- Auto-refreshes for near real-time updates

### Use Case Scenarios

#### Scenario 1: Developer Monitoring Intent Activity
```
1. Developer opens Dashboard
2. Views total intents across all chains (e.g., 150 intents)
3. Checks success rate (22%) and identifies performance issues
4. Navigates to Explorer to filter failed intents
5. Exports failed intents as CSV for analysis
6. Identifies problematic solver or chain
```

#### Scenario 2: Researcher Analyzing Protocol Performance
```
1. Researcher visits Analytics page
2. Reviews protocol rankings (UniswapX, 1inch Fusion, etc.)
3. Checks chain distribution pie chart
4. Filters intents by specific protocol via API
5. Downloads JSON data for academic research
6. Publishes findings on cross-chain intent adoption
```

#### Scenario 3: Real-time Intent Tracking
```
1. New intent created on Ethereum (CrossChainOrderOpened event)
2. Indexer detects event within ~15 seconds
3. Data parsed and stored in database
4. Dashboard auto-refreshes (React Query polling)
5. New intent appears in Explorer table
6. Metrics update (total intents +1)
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/universal-intents-analytics.git
cd universal-intents-analytics
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Database connection
DATABASE_URL=your_postgresql_connection_string

# Session secret
SESSION_SECRET=your_session_secret
```

4. Start the application:
```bash
npm run dev
```

5. Open your browser at `http://localhost:5000`

## 📊 Current Data Source

**✅ LIVE BLOCKCHAIN DATA**: The platform is now indexing **real ERC-7683 events** from production contracts!

- ✅ **Live Across Protocol contracts** on Arbitrum and Base mainnet
- ✅ **Real-time event listening** via WebSocket connections
- ✅ **Production-ready infrastructure** with proper error handling
- ✅ **CrossChainOrderOpened, CrossChainOrderFilled, CrossChainOrderCancelled** events indexed

### Current Live Contracts

The platform is actively monitoring these **AcrossOriginSettler** contracts:

| Chain | Contract Address | Status |
|-------|------------------|--------|
| **Arbitrum** | `0xB0B07055F214Ce59ccB968663d3435B9f3294998` | ✅ Live |
| **Base** | `0x4afb570AC68BfFc26Bb02FdA3D801728B0f93C9E` | ✅ Live |
| **Sepolia** | `0x43f133FE6fDFA17c417695c476447dc2a449Ba5B` | ✅ Testnet |
| **Sepolia** | `0x5b3acAADE6c53eFCD113dCa116F71312f2df666d` | ✅ Testnet |

### ERC-7683 Deployment Status

**Live Contracts (Currently Monitored):**
- ✅ **Arbitrum Mainnet** - `0xB0B07055F214Ce59ccB968663d3435B9f3294998` (AcrossOriginSettler)
- ✅ **Base Mainnet** - `0x4afb570AC68BfFc26Bb02FdA3D801728B0f93C9E` (AcrossOriginSettler)
- ✅ **Sepolia Testnet** - `0x43f133FE6fDFA17c417695c476447dc2a449Ba5B` (Across Testnet Spoke1)
- ✅ **Sepolia Testnet** - `0x5b3acAADE6c53eFCD113dCa116F71312f2df666d` (Across Testnet Spoke2)

**Not Yet Publicly Available:**
- ⏳ **Optimism Mainnet** - Superchain integration in progress
- ⏳ **Ethereum Mainnet** - Still L2-focused deployment
- ⏳ **Other Chains** (Polygon, Avalanche, etc.) - No public ERC-7683 deployments found

**Implementation Notes:**
- **Across Protocol** is the primary ERC-7683 implementer with live contracts
- **UniswapX** uses ERC-7683 backend but hasn't published specific contract addresses
- Platform is ready to add new contracts as they become available

### What This Means

- **Real intent transactions** are being indexed as they happen
- **Live success/failure rates** reflect actual Across Protocol performance
- **Production data** powers all analytics and dashboards
- **No more sample data** - everything is authentic blockchain activity

## 🎉 Production Status: LIVE & OPERATIONAL

The platform is **already running on live blockchain data**! No migration needed.

### Current Live Infrastructure

✅ **WebSocket RPC Connections** - Reliable real-time event listening
✅ **Across Protocol Integration** - Monitoring live AcrossOriginSettler contracts  
✅ **Multi-chain Support** - Arbitrum and Base mainnet + Sepolia testnet
✅ **Event Processing** - CrossChainOrderOpened, CrossChainOrderFilled, CrossChainOrderCancelled
✅ **Error Handling** - Robust connection management and failure recovery
✅ **Database Storage** - PostgreSQL with optimized indexes for performance

### What's Happening Right Now

- **Live event monitoring** across multiple chains
- **Real-time intent indexing** as transactions occur
- **Automatic status updates** when intents are filled or cancelled
- **Production analytics** based on actual Across Protocol activity
- **WebSocket reliability** with automatic reconnection handling

### Technical Architecture

```typescript
// Live contract configurations (server/indexer.ts)
const CHAIN_CONFIGS = [
  {
    name: "Arbitrum",
    chainId: 42161,
    rpcUrl: "wss://arbitrum-one-rpc.publicnode.com",
    contractAddress: "0xB0B07055F214Ce59ccB968663d3435B9f3294998", // Across AcrossOriginSettler
  },
  {
    name: "Base", 
    chainId: 8453,
    rpcUrl: "wss://base.publicnode.com",
    contractAddress: "0x4afb570AC68BfFc26Bb02FdA3D801728B0f93C9E", // Across AcrossOriginSettler
  }
];
```

## 🏗️ Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** - Build tool and dev server
- **Shadcn/ui** - UI component library
- **TanStack Query** - Server state management
- **Recharts** - Data visualization
- **Wouter** - Client-side routing

### Backend
- **Node.js** with Express.js
- **PostgreSQL** - Database (Neon serverless)
- **Drizzle ORM** - Type-safe database operations
- **ethers.js** - Blockchain interaction

### Blockchain Indexing
- **ERC-7683 (OIF)** event monitoring
- **Multi-chain support** - Ethereum, Optimism, Arbitrum, Base
- **WebSocket RPC** connections for real-time events

## 📁 Project Structure

```
universal-intents-analytics/
├── client/                      # Frontend React application
│   ├── src/
│   │   ├── pages/              # Page components
│   │   │   ├── dashboard.tsx   # Main dashboard with metrics
│   │   │   ├── explorer.tsx    # Intent explorer with filtering
│   │   │   ├── analytics.tsx   # Advanced analytics charts
│   │   │   ├── api-docs.tsx    # API documentation
│   │   │   └── settings.tsx    # User settings
│   │   ├── components/         # Reusable UI components
│   │   │   ├── ui/             # Shadcn components (button, card, etc.)
│   │   │   ├── metric-card.tsx # Dashboard metric cards
│   │   │   └── app-sidebar.tsx # Navigation sidebar
│   │   ├── lib/                # Utilities and configurations
│   │   │   ├── queryClient.ts  # TanStack Query setup
│   │   │   └── utils.ts        # Helper functions
│   │   ├── hooks/              # Custom React hooks
│   │   └── App.tsx             # Root component with routing
│   └── index.html              # Entry HTML
│
├── server/                     # Backend Express server
│   ├── index.ts               # Server entry point
│   ├── routes.ts              # REST API route definitions
│   ├── storage.ts             # Database operations & queries
│   ├── indexer.ts             # Blockchain event indexer
│   ├── db.ts                  # Database connection setup
│   └── vite.ts                # Vite middleware integration
│
├── shared/                     # Shared TypeScript types
│   └── schema.ts              # Database schema & Zod validation
│
├── design_guidelines.md        # UI/UX design system
├── replit.md                  # Project documentation
├── drizzle.config.ts          # Drizzle ORM configuration
└── package.json               # Dependencies & scripts
```

### Key Files Explained

#### Frontend
- **`client/src/pages/dashboard.tsx`** - Main dashboard displaying metrics, charts, and protocol rankings
- **`client/src/pages/explorer.tsx`** - Searchable table with advanced filtering (chain, status, pagination)
- **`client/src/lib/queryClient.ts`** - Configured TanStack Query client with default fetcher

#### Backend
- **`server/indexer.ts`** - Core blockchain indexer that listens to ERC-7683 events
- **`server/storage.ts`** - Database abstraction layer with all CRUD operations
- **`server/routes.ts`** - Express routes for intents, analytics, and export endpoints

#### Shared
- **`shared/schema.ts`** - Single source of truth for data types, used by both frontend and backend

## 🗄️ Database Schema

### Intents Table

The core `intents` table stores all intent transaction data:

```sql
CREATE TABLE intents (
  id VARCHAR PRIMARY KEY,              -- Intent/Order ID (0x...)
  type VARCHAR NOT NULL,               -- "Cross-Chain Swap", "Bridge", etc.
  chain VARCHAR NOT NULL,              -- "Ethereum", "Optimism", etc.
  chain_id INTEGER NOT NULL,           -- 1, 10, 42161, etc.
  status VARCHAR NOT NULL,             -- "success", "failed", "pending", "executing"
  solver VARCHAR,                      -- Solver address (0x...)
  from_address VARCHAR,                -- User address
  to_address VARCHAR,                  -- Destination address
  amount VARCHAR,                      -- Amount in wei (BigInt as string)
  protocol VARCHAR,                    -- "UniswapX", "1inch Fusion", etc.
  parameters JSONB,                    -- Additional intent parameters
  events JSONB,                        -- Event history array
  block_number INTEGER,                -- Block number
  transaction_hash VARCHAR,            -- Transaction hash
  timestamp TIMESTAMP DEFAULT NOW()    -- Record creation time
);

-- Indexes for performance
CREATE INDEX idx_intents_status ON intents(status);
CREATE INDEX idx_intents_chain ON intents(chain);
CREATE INDEX idx_intents_solver ON intents(solver);
CREATE INDEX idx_intents_timestamp ON intents(timestamp);
```

### Sample Intent Record

```json
{
  "id": "0xd44098c2dab330000000000000000000000000000000000000000000000000",
  "type": "Cross-Chain Swap",
  "chain": "Ethereum",
  "chainId": 1,
  "status": "success",
  "solver": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0",
  "fromAddress": "0x1234567890123456789012345678901234567890",
  "toAddress": "0x0987654321098765432109876543210987654321",
  "amount": "1000000000000000000",
  "protocol": "UniswapX",
  "parameters": {
    "inputToken": "0x...",
    "outputToken": "0x...",
    "deadline": 1234567890
  },
  "events": [
    {
      "type": "OrderOpened",
      "timestamp": "2025-10-12T21:30:00Z",
      "blockNumber": 18500000,
      "transactionHash": "0xabc..."
    }
  ],
  "blockNumber": 18500000,
  "transactionHash": "0xabcdef1234567890...",
  "timestamp": "2025-10-12T21:30:00Z"
}
```

## 🔌 API Endpoints

### Intent Data
- `GET /api/intents` - List intents with filtering (status, chain, pagination)
- `GET /api/intents/:id` - Get single intent details

### Analytics
- `GET /api/analytics/summary` - Overall metrics (total, success rate, etc.)
- `GET /api/analytics/chain-distribution` - Intent count per chain
- `GET /api/analytics/protocol-rankings` - Intent count per protocol

### Export
- `GET /api/export/csv` - Export intents as CSV
- `GET /api/export/json` - Export intents as JSON

## 🧪 Testing

The platform includes comprehensive end-to-end testing:

```bash
# Run all tests
npm test

# The test suite covers:
# - Dashboard metrics and visualizations
# - Intent explorer filtering
# - Analytics page functionality
# - API endpoint responses
```

## 🎯 Gitcoin GG24 Submission

This platform was built for the Gitcoin Grants Round 24 (GG24).

**Current Status**: ✅ **PRODUCTION LIVE** - Fully Operational Platform

- ✅ **Live blockchain indexing** - Real ERC-7683 events from Across Protocol
- ✅ **Production-ready infrastructure** - WebSocket connections, error handling, database optimization
- ✅ **Complete feature set** - Dashboard, explorer, analytics, API endpoints, data export
- ✅ **Multi-chain support** - Arbitrum, Base mainnet + Sepolia testnet
- ✅ **Real-time monitoring** - Intent transactions indexed as they happen

### Key Achievements

🎉 **SUCCESSFULLY MIGRATED TO LIVE DATA** - No more sample data, everything is real!
🔧 **ALL CRITICAL ISSUES RESOLVED** - Proper error handling, connection management, status updates
📊 **PRODUCTION ANALYTICS** - Live success rates, protocol rankings, chain distribution
⚡ **REAL-TIME PERFORMANCE** - WebSocket connections for efficient event listening

### Critical Issues Resolved

During development, several critical issues were identified and resolved:

1. **✅ Intent Status Updates** - Added `updateIntentStatus()` method for tracking intent lifecycle
2. **✅ Error Handling** - Fixed `initialize()` to properly throw errors when connections fail
3. **✅ Production Readiness** - Removed sample data generation, enabled live blockchain indexing
4. **✅ Connection Management** - Implemented robust WebSocket connection handling with proper cleanup

These fixes ensure the platform operates reliably in production with real blockchain data.

## 🛣️ Roadmap

### ✅ Completed (Production Ready)
- [x] **Connect to live ERC-7683 contracts on mainnet** - Arbitrum & Base live
- [x] **WebSocket support for real-time updates** - Implemented and operational
- [x] **Production error handling** - Robust connection management
- [x] **Live intent status tracking** - Real-time updates for fills/cancels

### 🚀 Future Enhancements
- [ ] **Additional chain support** - Polygon, Avalanche, Optimism mainnet
- [ ] **User authentication** - Saved filters and personalized dashboards
- [ ] **Historical data backfilling** - Complete intent history from contract deployment
- [ ] **Advanced analytics** - MEV detection, solver performance analysis
- [ ] **Notification system** - Real-time alerts for intent monitoring
- [ ] **API rate limiting** - Production-grade API protection
- [ ] **Data retention policies** - Automated cleanup and archiving

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built for the ERC-7683/OIF ecosystem** | **Gitcoin GG24 Submission**
