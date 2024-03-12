import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class ResetPasswordDto {

  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}