import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { TransactionsController } from './controllers/transactions.controller';
import { BudgetsController } from './controllers/budgets.controller';
import { PotsController } from './controllers/pots.controller';
import { DashboardController } from './controllers/dashboard.controller';
import { UsersController } from './controllers/users.controller';
import { CategoriesController } from './controllers/categories.controller';

@Module({
  controllers: [
    AuthController,
    TransactionsController,
    BudgetsController,
    PotsController,
    DashboardController,
    UsersController,
    CategoriesController,
  ],
  providers: [],
  exports: [],
})
export class PresentationModule {}