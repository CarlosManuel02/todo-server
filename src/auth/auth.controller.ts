import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('new')
  Register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post()
  Login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @Get('/all')
  findAll(@Query() pagination: PaginationDto) {
    return this.authService.findAll(pagination);
  }

  @Get('/:term')
  findOne(@Param('term') term: string) {
    return this.authService.findBy(term);
  }

  // het the token from the request header
  @Post('/renew')
  getToken(@Req() req) {
    const token = req.headers.token;
    // console.log(token)
    return this.authService.renewToken(token);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(id, updateAuthDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }

  @Post('/account/:id')
  forgotPassword(
    @Param('id') id: string,
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ) {
    return this.authService.forgotPassword(id, forgotPasswordDto);
  }
}
