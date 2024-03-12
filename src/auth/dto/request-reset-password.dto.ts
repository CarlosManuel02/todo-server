import { IsEmail, IsString, MinLength } from 'class-validator';

export class RequestResetPasswordDto {
  @IsEmail()
  email: string;

}
