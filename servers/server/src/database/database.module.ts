import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/database.provider';

@Module({
  providers: [databaseProviders],
  imports: [],
})
export class DatabaseModule {}
