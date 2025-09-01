import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { User } from '../../../domain/entities/user.entity';
import { UserBalance } from '../../../domain/entities/user-balance.entity';
import {
  CreateUserDto,
  UpdateUserDto,
  UserRepository,
} from '../../../domain/repositories/user.repository';
import { users, userBalances } from '../../../../drizzle/schemas';
import { DATABASE_CONNECTION } from '../database.module';

@Injectable()
export class UserRepositoryImpl extends UserRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: any,
  ) {
    super();
  }

  async create(userData: CreateUserDto): Promise<User> {
    const [newUser] = await this.db
      .insert(users)
      .values({
        email: userData.email,
        passwordHash: userData.passwordHash,
        firstName: userData.firstName,
        lastName: userData.lastName,
        avatarUrl: userData.avatarUrl || null,
      })
      .returning();

    // Create initial user balance
    await this.db.insert(userBalances).values({
      userId: newUser.id,
      currentBalance: 0,
      totalIncome: 0,
      totalExpenses: 0,
    });

    return new User(
      newUser.id,
      newUser.email,
      newUser.passwordHash,
      newUser.firstName,
      newUser.lastName,
      newUser.avatarUrl,
      newUser.createdAt,
      newUser.updatedAt,
    );
  }

  async findById(id: number): Promise<User | null> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (!user) return null;

    return new User(
      user.id,
      user.email,
      user.passwordHash,
      user.firstName,
      user.lastName,
      user.avatarUrl,
      user.createdAt,
      user.updatedAt,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) return null;

    return new User(
      user.id,
      user.email,
      user.passwordHash,
      user.firstName,
      user.lastName,
      user.avatarUrl,
      user.createdAt,
      user.updatedAt,
    );
  }

  async update(id: number, userData: UpdateUserDto): Promise<User | null> {
    const [updatedUser] = await this.db
      .update(users)
      .set({
        ...userData,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();

    if (!updatedUser) return null;

    return new User(
      updatedUser.id,
      updatedUser.email,
      updatedUser.passwordHash,
      updatedUser.firstName,
      updatedUser.lastName,
      updatedUser.avatarUrl,
      updatedUser.createdAt,
      updatedUser.updatedAt,
    );
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.delete(users).where(eq(users.id, id));
    return result.rowCount > 0;
  }

  async getUserBalance(userId: number): Promise<UserBalance | null> {
    const [balance] = await this.db
      .select()
      .from(userBalances)
      .where(eq(userBalances.userId, userId))
      .limit(1);

    if (!balance) return null;

    return new UserBalance(
      balance.id,
      balance.userId,
      parseFloat(balance.currentBalance),
      parseFloat(balance.totalIncome),
      parseFloat(balance.totalExpenses),
      balance.updatedAt,
    );
  }

  async updateUserBalance(
    userId: number,
    balanceData: Partial<UserBalance>,
  ): Promise<UserBalance | null> {
    const [updatedBalance] = await this.db
      .update(userBalances)
      .set({
        ...balanceData,
        updatedAt: new Date(),
      })
      .where(eq(userBalances.userId, userId))
      .returning();

    if (!updatedBalance) return null;

    return new UserBalance(
      updatedBalance.id,
      updatedBalance.userId,
      parseFloat(updatedBalance.currentBalance),
      parseFloat(updatedBalance.totalIncome),
      parseFloat(updatedBalance.totalExpenses),
      updatedBalance.updatedAt,
    );
  }
}