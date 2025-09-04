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
import { themes } from "./themes";

export const pots = pgTable("pots", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  targetAmount: decimal("target_amount", { precision: 12, scale: 2 }).notNull(),
  themeId: integer("theme_id")
    .notNull()
    .references(() => themes.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const potsRelations = relations(pots, ({ one, many }) => ({
  user: one(users, {
    fields: [pots.userId],
    references: [users.id],
  }),
  theme: one(themes, {
    fields: [pots.themeId],
    references: [themes.id],
  }),
  potTransactions: many(potTransactions),
}));
