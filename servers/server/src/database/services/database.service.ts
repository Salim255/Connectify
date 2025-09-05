import { Logger } from '@nestjs/common';
import { Connection } from 'mongoose';

export class DatabaseService {
  private readonly logger = new Logger('MONGODB');

  logConnectionEvents(connection: Connection) {
    // Triggered when the connection is successfully established.
    connection.on('connected', () => {
      this.logger.log('✅ MongoDB connected successfully...');
    });

    // Fires when the connection is fully opened and ready for operations
    connection.on('open', () => {
      this.logger.log('✅ MongoDB is ready for operation...');
    });

    // Invoked when the connection is re-established after being disconnected.
    connection.on('reconnected', () => {
      this.logger.log('✅ reconnected');
    });

    // Occurs when the connection is in the process of closing.
    connection.on('disconnecting', () => {
      this.logger.log('💥 MongoDB connection is disconnecting');
    });

    // Called when the connection is lost.
    connection.on('disconnected', () => {
      this.logger.log('💥 MongoDB disconnected');
    });
  }
}
