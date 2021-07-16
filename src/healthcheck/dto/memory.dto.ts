import { IsNumberString } from 'class-validator';


export class MemoryQueryParams {
  @IsNumberString()
  heap: number;
}
