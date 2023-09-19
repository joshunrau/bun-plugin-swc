import { Controller, Get, Post } from '@nestjs/common';

import { CatsService } from './cats.service';

@Controller()
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(cat: any) {
    return this.catsService.create(cat);
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }
}
