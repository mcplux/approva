import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class FilterRequestDto {
  @IsOptional()
  @Transform(({ value }) => value !== undefined)
  @IsBoolean()
  mine?: boolean;
}
