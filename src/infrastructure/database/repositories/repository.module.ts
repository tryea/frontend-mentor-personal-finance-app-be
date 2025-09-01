import { Module } from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { UserRepositoryImpl } from './user.repository.impl';

@Module({
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [UserRepository],
})
export class RepositoryModule {}