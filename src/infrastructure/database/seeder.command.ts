import { Command, CommandRunner } from 'nest-commander';
import { SeederService } from './seeder.service';

@Command({
  name: 'seed',
  description: 'Seed the database with initial data',
})
export class SeederCommand extends CommandRunner {
  constructor(private readonly seederService: SeederService) {
    super();
  }

  async run(passedParams: string[], options?: Record<string, any>): Promise<void> {
    try {
      if (options?.clear) {
        await this.seederService.clearDatabase();
      }
      
      await this.seederService.seedDatabase();
      console.log('Seeding completed successfully!');
      process.exit(0);
    } catch (error) {
      console.error('Seeding failed:', error);
      process.exit(1);
    }
  }
}

@Command({
  name: 'seed:clear',
  description: 'Clear all data from the database',
})
export class ClearDatabaseCommand extends CommandRunner {
  constructor(private readonly seederService: SeederService) {
    super();
  }

  async run(): Promise<void> {
    try {
      await this.seederService.clearDatabase();
      console.log('Database cleared successfully!');
      process.exit(0);
    } catch (error) {
      console.error('Clear database failed:', error);
      process.exit(1);
    }
  }
}