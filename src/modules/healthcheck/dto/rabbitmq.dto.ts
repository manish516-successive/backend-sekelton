import { IsArray, IsString } from 'class-validator';
import { Type,Transform } from 'class-transformer';


export class RabbitMQQueryParams {
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({value}) => value.split(',')) 
  url: string[];
}
