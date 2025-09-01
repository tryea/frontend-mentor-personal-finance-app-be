import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './drizzle/schemas/index.ts',
  out: './drizzle/migrations',
  driver: 'pg',
  dbCredentials: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    user: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE_NAME || 'personal_finance_app',
  },
  verbose: true,
  strict: true,
});