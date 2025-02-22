import { IsEnum, IsOptional } from "class-validator";

export class FindAllPhotographiesDto {
  @IsOptional()
  @IsEnum({ asc: 'asc', desc: 'desc' })
  order?: 'asc' | 'desc';
}
