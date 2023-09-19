import { IsString } from 'class-validator';

import { Cat } from '../interfaces/cat.interface';

export class CreateCatDto implements Cat {
  @IsString()
  name: string;
}
