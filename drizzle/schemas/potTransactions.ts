import {
  pgTable,
  timestamp,
  decimal,
  serial,
  integer,
  text,
} from "drizzle-orm/pg-core";
import { pots } from "./pots";

export const potTransactions = pgTable("pot_transactions", {
  id: serial("id").primaryKey(),
  potId: integer("pot_id")
    .notNull()
    .references(() => pots.id, { onDelete: "cascade" }),
  type: text("type", { enum: ["ADD", "WITHDRAW"] }).notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
