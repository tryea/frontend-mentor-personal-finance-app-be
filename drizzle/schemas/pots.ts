import {
  pgTable,
  varchar,
  timestamp,
  decimal,
  serial,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";
import { potTransactions } from "./potTransactions";

export const pots = pgTable("pots", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  targetAmount: decimal("target_amount", { precision: 12, scale: 2 }).notNull(),
  themeId: integer("theme_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const potsRelations = relations(pots, ({ one, many }) => ({
  user: one(users, {
    fields: [pots.userId],
    references: [users.id],
  }),
  potTransactions: many(potTransactions),
}));
