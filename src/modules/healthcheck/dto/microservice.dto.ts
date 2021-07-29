import { IsString, IsNumberString } from 'class-validator';


export class MicroserviceQueryParams {
  @IsString()
  host: string;

  @IsNumberString()
  port: number;
}
