import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as postgres from 'postgres';
const postgresClient = (postgres as any).default || postgres;
import * as schema from '../../../drizzle/schemas';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);
  public readonly db: ReturnType<typeof drizzle>;

  constructor(private readonly configService: ConfigService) {
    const connectionString = this.buildConnectionString();
    
    // Connection for queries
    const queryClient = postgresClient(connectionString, {
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
    });
    
    this.db = drizzle(queryClient, { schema });
    this.logger.log('Database connection initialized');
  }

  private buildConnectionString(): string {
    const host = this.configService.get<string>('database.host');
    const port = this.configService.get<number>('database.port');
    const username = this.configService.get<string>('database.username');
    const password = this.configService.get<string>('database.password');
    const database = this.configService.get<string>('database.name');

    return `postgresql://${username}:${password}@${host}:${port}/${database}`;
  }
}