import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertIntentSchema } from "@shared/schema";
import { indexer } from "./indexer";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize indexer and generate sample data
  indexer.initialize().then(async () => {
    await indexer.generateSampleData();
    // Optionally start listening for real events
    // await indexer.startIndexing();
  });

  // Get all intents with optional filters
  app.get("/api/intents", async (req, res) => {
    try {
      const { status, chain, limit, offset } = req.query;
      
      const intents = await storage.getIntents({
        status: status as string,
        chain: chain as string,
        limit: limit ? parseInt(limit as string) : 50,
        offset: offset ? parseInt(offset as string) : 0,
      });

      const total = await storage.getIntentCount({
        status: status as string,
        chain: chain as string,
      });

      res.json({ intents, total });
    } catch (error) {
      console.error("Error fetching intents:", error);
      res.status(500).json({ error: "Failed to fetch intents" });
    }
  });

  // Get single intent by ID
  app.get("/api/intents/:id", async (req, res) => {
    try {
      const intent = await storage.getIntent(req.params.id);
      
      if (!intent) {
        return res.status(404).json({ error: "Intent not found" });
      }

      res.json(intent);
    } catch (error) {
      console.error("Error fetching intent:", error);
      res.status(500).json({ error: "Failed to fetch intent" });
    }
  });

  // Create new intent (for manual testing)
  app.post("/api/intents", async (req, res) => {
    try {
      const validatedIntent = insertIntentSchema.parse(req.body);
      const intent = await storage.createIntent(validatedIntent);
      res.status(201).json(intent);
    } catch (error) {
      console.error("Error creating intent:", error);
      res.status(400).json({ error: "Invalid intent data" });
    }
  });

  // Get analytics summary
  app.get("/api/analytics/summary", async (req, res) => {
    try {
      const summary = await storage.getAnalyticsSummary();
      res.json(summary);
    } catch (error) {
      console.error("Error fetching analytics summary:", error);
      res.status(500).json({ error: "Failed to fetch analytics summary" });
    }
  });

  // Get chain distribution
  app.get("/api/analytics/chain-distribution", async (req, res) => {
    try {
      const distribution = await storage.getChainDistribution();
      res.json(distribution);
    } catch (error) {
      console.error("Error fetching chain distribution:", error);
      res.status(500).json({ error: "Failed to fetch chain distribution" });
    }
  });

  // Get protocol rankings
  app.get("/api/analytics/protocol-rankings", async (req, res) => {
    try {
      const rankings = await storage.getProtocolRankings();
      res.json(rankings);
    } catch (error) {
      console.error("Error fetching protocol rankings:", error);
      res.status(500).json({ error: "Failed to fetch protocol rankings" });
    }
  });

  // Export data endpoint
  app.get("/api/export", async (req, res) => {
    try {
      const { format = "json", range = "all" } = req.query;
      
      const intents = await storage.getIntents({ limit: 1000 });

      if (format === "csv") {
        // Convert to CSV
        const headers = ["ID", "Type", "Chain", "Status", "Solver", "Timestamp"];
        const csvRows = [headers.join(",")];
        
        for (const intent of intents) {
          csvRows.push([
            intent.id,
            intent.type,
            intent.chain,
            intent.status,
            intent.solver,
            intent.timestamp.toISOString(),
          ].join(","));
        }

        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", `attachment; filename="intents-${Date.now()}.csv"`);
        res.send(csvRows.join("\n"));
      } else {
        // JSON format
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Content-Disposition", `attachment; filename="intents-${Date.now()}.json"`);
        res.json(intents);
      }
    } catch (error) {
      console.error("Error exporting data:", error);
      res.status(500).json({ error: "Failed to export data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
