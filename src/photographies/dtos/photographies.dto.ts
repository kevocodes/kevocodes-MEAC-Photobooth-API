import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class FindAllPhotographiesDto {
  @IsOptional()
  @IsEnum({ asc: 'asc', desc: 'desc' })
  order?: 'asc' | 'desc';
}

export class DeletePhotographiesByIdsDTO {
  @IsArray()
  @IsString({ each: true })
  ids: string[];
}