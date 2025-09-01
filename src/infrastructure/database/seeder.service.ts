import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { users, categories, transactions, budgets, pots, potTransactions, userBalances } from '../../../drizzle/schemas';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SeederService {
  constructor(private readonly databaseService: DatabaseService) {}

  async seedDatabase(): Promise<void> {
    const dataPath = path.join(process.cwd(), 'data.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(rawData);

    console.log('Starting database seeding...');

    try {
      // Create a default user first
      const [user] = await this.databaseService.db
        .insert(users)
        .values({
          email: 'demo@example.com',
          name: 'Demo User',
          passwordHash: '$2b$12$dummy.hash.for.demo.user', // This should be properly hashed in production
        })
        .returning();

      console.log('Created demo user:', user.id);

      // Extract unique categories from transactions and budgets
      const transactionCategories = [...new Set(data.transactions.map((t: any) => t.category))];
      const budgetCategories = data.budgets.map((b: any) => b.category);
      const allCategories = [...new Set([...transactionCategories, ...budgetCategories])];

      // Insert categories
      const categoryInserts = allCategories.map(categoryName => ({
        name: categoryName,
        description: `${categoryName} category`,
        color: this.getCategoryColor(categoryName),
      }));

      const insertedCategories = await this.databaseService.db
        .insert(categories)
        .values(categoryInserts)
        .returning();

      console.log(`Created ${insertedCategories.length} categories`);

      // Create category lookup map
      const categoryMap = new Map(
        insertedCategories.map(cat => [cat.name, cat.id])
      );

      // Insert transactions
      const transactionInserts = data.transactions.map((transaction: any) => ({
        userId: user.id,
        categoryId: categoryMap.get(transaction.category),
        name: transaction.name,
        amount: Math.abs(transaction.amount), // Store as positive, use type to indicate direction
        type: transaction.amount >= 0 ? 'income' : 'expense',
        description: `Transaction with ${transaction.name}`,
        transactionDate: new Date(transaction.date),
        isRecurring: transaction.recurring,
        avatarUrl: transaction.avatar,
      }));

      const insertedTransactions = await this.databaseService.db
        .insert(transactions)
        .values(transactionInserts)
        .returning();

      console.log(`Created ${insertedTransactions.length} transactions`);

      // Insert budgets
      const budgetInserts = data.budgets.map((budget: any) => ({
        userId: user.id,
        categoryId: categoryMap.get(budget.category),
        maximumAmount: budget.maximum,
        period: 'monthly',
        theme: budget.theme,
      }));

      const insertedBudgets = await this.databaseService.db
        .insert(budgets)
        .values(budgetInserts)
        .returning();

      console.log(`Created ${insertedBudgets.length} budgets`);

      // Insert pots
      const potInserts = data.pots.map((pot: any) => ({
        userId: user.id,
        name: pot.name,
        targetAmount: pot.target,
        currentAmount: pot.total,
        theme: pot.theme,
      }));

      const insertedPots = await this.databaseService.db
        .insert(pots)
        .values(potInserts)
        .returning();

      console.log(`Created ${insertedPots.length} pots`);

      // Insert user balance
      await this.databaseService.db
        .insert(userBalances)
        .values({
          userId: user.id,
          currentBalance: data.balance.current,
          totalIncome: data.balance.income,
          totalExpenses: data.balance.expenses,
        });

      console.log('Created user balance record');
      console.log('Database seeding completed successfully!');
    } catch (error) {
      console.error('Error seeding database:', error);
      throw error;
    }
  }

  private getCategoryColor(categoryName: string): string {
    const colorMap: Record<string, string> = {
      'General': '#277C78',
      'Dining Out': '#F2CDAC',
      'Groceries': '#82C9D7',
      'Entertainment': '#626070',
      'Transportation': '#826CB0',
      'Lifestyle': '#AF81BA',
      'Shopping': '#597C7C',
      'Bills': '#277C78',
      'Personal Care': '#626070',
      'Education': '#82C9D7',
    };

    return colorMap[categoryName] || '#277C78';
  }

  async clearDatabase(): Promise<void> {
    console.log('Clearing database...');
    
    try {
      // Delete in reverse order of dependencies
      await this.databaseService.db.delete(potTransactions);
      await this.databaseService.db.delete(userBalances);
      await this.databaseService.db.delete(transactions);
      await this.databaseService.db.delete(budgets);
      await this.databaseService.db.delete(pots);
      await this.databaseService.db.delete(categories);
      await this.databaseService.db.delete(users);
      
      console.log('Database cleared successfully!');
    } catch (error) {
      console.error('Error clearing database:', error);
      throw error;
    }
  }
}