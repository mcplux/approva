import { Transform } from 'class-transformer';
import { IsBoolean, IsIn, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class FilterRequestDto extends PaginationDto {
  @IsOptional()
  @Transform(({ value }) => value !== undefined)
  @IsBoolean()
  mine?: boolean;

  @IsOptional()
  @Transform(({ value }) => (value as string).toUpperCase())
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC';
}
