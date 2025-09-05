import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { DatabaseService } from './services/database.service';

@Module({
  imports: [
    // MongooseModule.forRootAsync allows us to configure the MongoDB connection asynchronous
    MongooseModule.forRootAsync({
      inject: [ConfigService, DatabaseService],
      useFactory: (config: ConfigService, databaseService: DatabaseService) => {
        const uri = config.get<string>('REMOTE_DATABASE_URL');
        return {
          uri,
          dbName: 'connectify',
          onConnectionCreate: (connection: Connection) => {
            databaseService.logConnectionEvents(connection);
            return connection;
          },
        };
      },
    }),
  ],
  providers: [DatabaseService],
})
export class DatabaseModule {}
