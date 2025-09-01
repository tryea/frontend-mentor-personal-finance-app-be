import { User } from '../entities/user.entity';
import { UserBalance } from '../entities/user-balance.entity';

export interface CreateUserDto {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

export abstract class UserRepository {
  abstract create(userData: CreateUserDto): Promise<User>;
  abstract findById(id: number): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract update(id: number, userData: UpdateUserDto): Promise<User | null>;
  abstract delete(id: number): Promise<boolean>;
  abstract getUserBalance(userId: number): Promise<UserBalance | null>;
  abstract updateUserBalance(userId: number, balance: Partial<UserBalance>): Promise<UserBalance | null>;
}