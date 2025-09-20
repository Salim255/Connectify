import { Module } from '@nestjs/common';

// That forwardRef in NestJS is all about breaking circular dependencies between modules.
@Module({})
export class SocketModule {}
