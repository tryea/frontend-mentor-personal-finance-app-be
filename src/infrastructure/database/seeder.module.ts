import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SeederService } from './seeder.service';
import { SeederCommand, ClearDatabaseCommand } from './seeder.command';
import { DatabaseModule } from './database.module';
import configuration from '../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    DatabaseModule,
  ],
  providers: [SeederService, SeederCommand, ClearDatabaseCommand],
  exports: [SeederService],
})
export class SeederModule {}