import {
  pgTable,
  timestamp,
  decimal,
  boolean,
  serial,
  integer,
  date,
  text,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";
import { contacts } from "./contacts";
import { budgets } from "./budgets";

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  contactId: integer("contact_id")
    .notNull()
    .references(() => contacts.id),
  budgetId: integer("budget_id")
    .notNull()
    .references(() => budgets.id),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  type: text("type", { enum: ["INCOME", "EXPENSE"] }).notNull(),
  transactionDate: date("transaction_date").notNull(),
  isRecurring: boolean("is_recurring").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, {
    fields: [transactions.userId],
    references: [users.id],
  }),
  contact: one(contacts, {
    fields: [transactions.contactId],
    references: [contacts.id],
  }),
  budget: one(budgets, {
    fields: [transactions.budgetId],
    references: [budgets.id],
  }),
}));
