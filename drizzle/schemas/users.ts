import { pgTable, bigint, varchar, timestamp, decimal, serial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 200 }).notNull(),
  avatarUrl: varchar('avatar_url', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const userBalances = pgTable('user_balances', {
  id: serial('id').primaryKey(),
  userId: bigint('user_id', { mode: 'number' }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  currentBalance: decimal('current_balance', { precision: 12, scale: 2 }).notNull().default('0.00'),
  totalIncome: decimal('total_income', { precision: 12, scale: 2 }).notNull().default('0.00'),
  totalExpenses: decimal('total_expenses', { precision: 12, scale: 2 }).notNull().default('0.00'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  balance: one(userBalances, {
    fields: [users.id],
    references: [userBalances.userId],
  }),
}));

export const userBalancesRelations = relations(userBalances, ({ one }) => ({
  user: one(users, {
    fields: [userBalances.userId],
    references: [users.id],
  }),
}));