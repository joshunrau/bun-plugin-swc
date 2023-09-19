import { Module } from '@nestjs/common';

import { CatsController } from './cats/cats.controller';

@Module({
  controllers: [CatsController]
})
export class AppModule {}
