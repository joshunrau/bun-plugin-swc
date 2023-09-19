import { Controller, Get } from '@nestjs/common';

@Controller()
export class CatsController {
  @Get()
  findAll() {
    return 'Test';
  }
}
