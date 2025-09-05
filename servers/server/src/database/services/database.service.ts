import { Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

export class DatabaseService {
  private readonly logger = new Logger('MONGODB');
  constructor(@InjectConnection() private readonly connection: Connection) {}
}
