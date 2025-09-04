import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { transactions } from "./transactions";

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  avatarUrl: text("avatar_url"),
});

export const contactsRelations = relations(contacts, ({ many }) => ({
  transactions: many(transactions),
}));
