import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { DATA_SOURCE } from 'src/common/constants/constants';

export const databaseProviders = {
  provide: DATA_SOURCE,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    //const logger = new Logger('DatabaseProvider');
    const dataSource = new DataSource({
      type: 'postgres',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
      synchronize: true, // ❌ disable in production
      logging: true,
    });

    return dataSource.initialize();
  },
};
