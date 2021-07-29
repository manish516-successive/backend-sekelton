import { IsString } from 'class-validator';

export class HttpQueryParams {
  @IsString()
  url: string;
}
