import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Module({
  imports: [
    // MongooseModule.forRootAsync allows us to configure the MongoDB connection asynchronous
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const logger = new Logger('MONGODB');
        const uri = config.get<string>('REMOTE_DATABASE_URL');
        return {
          uri,
          dbName: 'connectify',
          onConnectionCreate: (connection: Connection) => {
            // Triggered when the connection is successfully established.
            connection.on('connected', () => {
              logger.log('✅ MongoDB connected successfully...');
            });

            // Fires when the connection is fully opened and ready for operations
            connection.on('open', () => {
              logger.log('✅ MongoDB is ready for operation...');
            });

            // Invoked when the connection is re-established after being disconnected.
            connection.on('reconnected', () => {
              logger.log('✅ reconnected');
            });

            // Occurs when the connection is in the process of closing.
            connection.on('disconnecting', () => {
              logger.log('💥 MongoDB connection is disconnecting');
            });

            // Called when the connection is lost.
            connection.on('disconnected', () => {
              logger.log('💥 MongoDB disconnected');
            });
            return connection;
          },
        };
      },
    }),
  ],
})
export class DatabaseModule {}
