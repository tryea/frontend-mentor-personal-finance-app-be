import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { budgets } from "./budgets";
import { pots } from "./pots";

export const themes = pgTable("themes", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  hexColor: varchar("hex_color", { length: 7 }).notNull(),
});

export const themesRelations = relations(themes, ({ many }) => ({
  budgets: many(budgets),
  pots: many(pots),
}));
