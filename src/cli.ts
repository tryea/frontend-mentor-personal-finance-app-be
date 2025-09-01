import { CommandFactory } from 'nest-commander';
import { SeederModule } from './infrastructure/database/seeder.module';

async function bootstrap() {
  await CommandFactory.run(SeederModule, ['warn', 'error']);
}

bootstrap();