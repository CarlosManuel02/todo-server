import {
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MinLength
} from "class-validator";

export class CreateTodoDto {

  @IsInt()
  @IsPositive()
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  user_id: string;

  @IsString()
  @MinLength(4)
  title: string;

  @IsString()
  @MinLength(4)
  description: string;

  @IsOptional()
  @IsBoolean()
  done: boolean;

  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date;

  @IsOptional()
  @IsDate()
  deletedAt: Date;

}
