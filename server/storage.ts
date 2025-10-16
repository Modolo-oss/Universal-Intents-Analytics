import { intents, type Intent, type InsertIntent } from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql, count } from "drizzle-orm";

export interface IStorage {
  createIntent(intent: InsertIntent): Promise<Intent>;
  getIntent(id: string): Promise<Intent | undefined>;
  updateIntentStatus(id: string, status: string, event?: any): Promise<Intent | undefined>;
  getIntents(filters?: {
    status?: string;
    chain?: string;
    limit?: number;
    offset?: number;
  }): Promise<Intent[]>;
  getIntentCount(filters?: { status?: string; chain?: string }): Promise<number>;
  getAnalyticsSummary(): Promise<{
    totalIntents: number;
    successRate: number;
    activeChains: number;
    topProtocol: string;
  }>;
  getChainDistribution(): Promise<Array<{ name: string; value: number }>>;
  getProtocolRankings(): Promise<Array<{ name: string; intents: number; percentage: number }>>;
}

export class DatabaseStorage implements IStorage {
  async createIntent(insertIntent: InsertIntent): Promise<Intent> {
    const [intent] = await db
      .insert(intents)
      .values(insertIntent)
      .returning();
    return intent;
  }

  async getIntent(id: string): Promise<Intent | undefined> {
    const [intent] = await db.select().from(intents).where(eq(intents.id, id));
    return intent || undefined;
  }

  async updateIntentStatus(id: string, status: string, event?: any): Promise<Intent | undefined> {
    const existingIntent = await this.getIntent(id);
    if (!existingIntent) {
      return undefined;
    }

    // Append new event to existing events array
    const existingEvents = Array.isArray(existingIntent.events) ? existingIntent.events : [];
    const updatedEvents = [...existingEvents];
    
    if (event) {
      updatedEvents.push({
        type: event.type,
        timestamp: new Date().toISOString(),
        blockNumber: event.blockNumber,
        transactionHash: event.transactionHash,
      });
    }

    const [updatedIntent] = await db
      .update(intents)
      .set({ 
        status,
        events: updatedEvents,
      })
      .where(eq(intents.id, id))
      .returning();

    return updatedIntent || undefined;
  }

  async getIntents(filters?: {
    status?: string;
    chain?: string;
    limit?: number;
    offset?: number;
  }): Promise<Intent[]> {
    const conditions = [];
    
    if (filters?.status && filters.status !== "all") {
      conditions.push(eq(intents.status, filters.status));
    }
    
    if (filters?.chain && filters.chain !== "all") {
      // Normalize chain name: capitalize first letter
      const normalizedChain = filters.chain.charAt(0).toUpperCase() + filters.chain.slice(1);
      conditions.push(eq(intents.chain, normalizedChain));
    }

    const query = db
      .select()
      .from(intents)
      .orderBy(desc(intents.timestamp))
      .limit(filters?.limit || 50)
      .offset(filters?.offset || 0);

    if (conditions.length > 0) {
      return await query.where(and(...conditions));
    }

    return await query;
  }

  async getIntentCount(filters?: { status?: string; chain?: string }): Promise<number> {
    const conditions = [];
    
    if (filters?.status && filters.status !== "all") {
      conditions.push(eq(intents.status, filters.status));
    }
    
    if (filters?.chain && filters.chain !== "all") {
      // Normalize chain name: capitalize first letter
      const normalizedChain = filters.chain.charAt(0).toUpperCase() + filters.chain.slice(1);
      conditions.push(eq(intents.chain, normalizedChain));
    }

    const query = db.select({ count: count() }).from(intents);
    
    if (conditions.length > 0) {
      const [result] = await query.where(and(...conditions));
      return result.count;
    }

    const [result] = await query;
    return result.count;
  }

  async getAnalyticsSummary(): Promise<{
    totalIntents: number;
    successRate: number;
    activeChains: number;
    topProtocol: string;
  }> {
    const [totalResult] = await db.select({ count: count() }).from(intents);
    const totalIntents = totalResult.count;

    const [successResult] = await db
      .select({ count: count() })
      .from(intents)
      .where(eq(intents.status, "success"));
    const successCount = successResult.count;
    const successRate = totalIntents > 0 ? (successCount / totalIntents) * 100 : 0;

    const chainResult = await db
      .selectDistinct({ chain: intents.chain })
      .from(intents);
    const activeChains = chainResult.length;

    const protocolResult = await db
      .select({ 
        protocol: intents.protocol, 
        count: count() 
      })
      .from(intents)
      .groupBy(intents.protocol)
      .orderBy(desc(count()))
      .limit(1);
    const topProtocol = protocolResult[0]?.protocol || "N/A";

    return { totalIntents, successRate, activeChains, topProtocol };
  }

  async getChainDistribution(): Promise<Array<{ name: string; value: number }>> {
    const result = await db
      .select({ 
        chain: intents.chain, 
        count: count() 
      })
      .from(intents)
      .groupBy(intents.chain);

    return result.map(r => ({ name: r.chain, value: r.count }));
  }

  async getProtocolRankings(): Promise<Array<{ name: string; intents: number; percentage: number }>> {
    const [totalResult] = await db.select({ count: count() }).from(intents);
    const total = totalResult.count;

    const result = await db
      .select({ 
        protocol: intents.protocol, 
        count: count() 
      })
      .from(intents)
      .groupBy(intents.protocol)
      .orderBy(desc(count()))
      .limit(10);

    return result.map(r => ({
      name: r.protocol || "Unknown",
      intents: r.count,
      percentage: total > 0 ? Math.round((r.count / total) * 100) : 0,
    }));
  }
}

export const storage = new DatabaseStorage();
