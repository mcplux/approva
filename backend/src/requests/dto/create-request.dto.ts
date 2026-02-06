import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { RequestType } from '../entities/request.entity';

export class CreateRequestDto {
  @IsString()
  @MaxLength(50)
  title: string;

  @IsString()
  @MaxLength(250)
  description: string;

  @IsOptional()
  @IsEnum(RequestType)
  type?: RequestType;
}
