import { Logger, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger('MONGODB');
  constructor(@InjectConnection() private readonly connection: Connection) {}

  onModuleInit() {
    // Triggered when the connection is successfully established.
    this.connection.on('connected', () => {
      this.logger.log('✅ MongoDB connected successfully...');
    });

    // Fires when the connection is fully opened and ready for operations
    this.connection.on('open', () => {
      this.logger.log('✅ MongoDB is ready for operation...');
    });

    // Invoked when the connection is re-established after being disconnected.
    this.connection.on('reconnected', () => {
      this.logger.log('✅ reconnected');
    });

    // Occurs when the connection is in the process of closing.
    this.connection.on('disconnecting', () => {
      this.logger.log('💥 MongoDB connection is disconnecting');
    });

    // Called when the connection is lost.
    this.connection.on('disconnected', () => {
      this.logger.log('💥 MongoDB disconnected');
    });
  }
}
