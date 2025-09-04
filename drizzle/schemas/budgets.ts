import {
  pgTable,
  integer,
  timestamp,
  decimal,
  serial,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";
import { categories } from "./categories";
import { transactions } from "./transactions";
import { themes } from "./themes";

export const budgets = pgTable("budgets", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id),
  maximumAmount: decimal("maximum_amount", {
    precision: 12,
    scale: 2,
  }).notNull(),
  themeId: integer("theme_id")
    .notNull()
    .references(() => themes.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const budgetsRelations = relations(budgets, ({ one, many }) => ({
  user: one(users, {
    fields: [budgets.userId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [budgets.categoryId],
    references: [categories.id],
  }),
  theme: one(themes, {
    fields: [budgets.themeId],
    references: [themes.id],
  }),
  transactions: many(transactions),
}));
