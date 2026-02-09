import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class FilterRequestDto extends PaginationDto {
  @IsOptional()
  @Transform(({ value }) => value !== undefined)
  @IsBoolean()
  mine?: boolean;

  //? Add more filters
}
