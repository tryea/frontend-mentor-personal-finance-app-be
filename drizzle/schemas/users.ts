import { pgTable, varchar, timestamp, serial } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { transactions } from "./transactions";
import { budgets } from "./budgets";
import { pots } from "./pots";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 200 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  transactions: many(transactions),
  budgets: many(budgets),
  pots: many(pots),
}));
