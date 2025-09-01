import { pgTable, bigint, varchar, timestamp, decimal, serial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users';

export const pots = pgTable('pots', {
  id: serial('id').primaryKey(),
  userId: bigint('user_id', { mode: 'number' }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  targetAmount: decimal('target_amount', { precision: 12, scale: 2 }).notNull(),
  currentAmount: decimal('current_amount', { precision: 12, scale: 2 }).notNull().default('0.00'),
  themeColor: varchar('theme_color', { length: 7 }).notNull().default('#10B981'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const potTransactions = pgTable('pot_transactions', {
  id: serial('id').primaryKey(),
  potId: bigint('pot_id', { mode: 'number' }).notNull().references(() => pots.id, { onDelete: 'cascade' }),
  userId: bigint('user_id', { mode: 'number' }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
  transactionType: varchar('transaction_type', { length: 20 }).notNull(), // 'deposit' or 'withdrawal'
  description: varchar('description', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const potsRelations = relations(pots, ({ one, many }) => ({
  user: one(users, {
    fields: [pots.userId],
    references: [users.id],
  }),
  transactions: many(potTransactions),
}));

export const potTransactionsRelations = relations(potTransactions, ({ one }) => ({
  pot: one(pots, {
    fields: [potTransactions.potId],
    references: [pots.id],
  }),
  user: one(users, {
    fields: [potTransactions.userId],
    references: [users.id],
  }),
}));