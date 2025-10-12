import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const intents = pgTable("intents", {
  id: varchar("id", { length: 66 }).primaryKey(),
  type: text("type").notNull(),
  chain: text("chain").notNull(),
  chainId: integer("chain_id").notNull(),
  status: text("status").notNull(),
  solver: varchar("solver", { length: 42 }).notNull(),
  fromAddress: varchar("from_address", { length: 42 }),
  toAddress: varchar("to_address", { length: 42 }),
  amount: text("amount"),
  protocol: text("protocol"),
  parameters: jsonb("parameters"),
  events: jsonb("events"),
  blockNumber: integer("block_number"),
  transactionHash: varchar("transaction_hash", { length: 66 }),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
}, (table) => ({
  statusIdx: index("status_idx").on(table.status),
  chainIdx: index("chain_idx").on(table.chain),
  solverIdx: index("solver_idx").on(table.solver),
  timestampIdx: index("timestamp_idx").on(table.timestamp),
}));

export const insertIntentSchema = createInsertSchema(intents).omit({
  timestamp: true,
});

export type InsertIntent = z.infer<typeof insertIntentSchema>;
export type Intent = typeof intents.$inferSelect;
