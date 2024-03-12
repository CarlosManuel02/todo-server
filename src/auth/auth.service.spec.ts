import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

describe('AuthService', () => {
  let service: AuthService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockImplementation(() => 'test_token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should create a new user', async () => {
    const dto: CreateAuthDto = {
      email: 'test@test.com',
      password: 'password',
      username: 'test',
    };

    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(undefined);
    jest.spyOn(repo, 'save').mockResolvedValueOnce(dto as any);

    const result = await service.create(dto);

    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('status', 200);
  });

  it('should throw an error if email is already in use', async () => {
    const dto: CreateAuthDto = {
      email: 'test@test.com',
      password: 'password',
      username: 'test',
    };

    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(dto as any);

    await expect(service.create(dto)).rejects.toThrow(BadRequestException);
  });

  it('should update a user', async () => {
    const dto: UpdateAuthDto = {
      email: 'test@test.com',
      password: 'password',
      username: 'test',
    };

    jest.spyOn(repo, 'preload').mockResolvedValueOnce(dto as any);
    jest.spyOn(repo, 'save').mockResolvedValueOnce(dto as any);

    const result = await service.update('1', dto);

    expect(result).toEqual(dto);
  });

  it('should throw an error if user not found when updating', async () => {
    const dto: UpdateAuthDto = {
      email: 'test@test.com',
      password: 'password',
      username: 'test',
    };

    jest.spyOn(repo, 'preload').mockResolvedValueOnce(undefined);

    await expect(service.update('1', dto)).rejects.toThrow(NotFoundException);
  });

  it('should throw an error if user not found when deleting', async () => {
    jest.spyOn(service, 'findBy').mockResolvedValueOnce(undefined);

    await expect(service.remove('1')).rejects.toThrow(NotFoundException);
  });

  it('should throw an error if incorrect password when logging in', async () => {
    const dto: CreateAuthDto = {
      email: 'test@test.com',
      password: 'wrong_password',
      username: 'test',
    };

    const user: User = {
      id: '1',
      email: 'test@test.com',
      password: 'password',
      username: 'test',
      validatePassword: jest.fn().mockResolvedValueOnce(false),
    } as any;

    jest.spyOn(service, 'findBy').mockResolvedValueOnce(user);

    await expect(service.login(dto)).rejects.toThrow(BadRequestException);
  });

  it('should throw an error if user not found when renewing token', async () => {
    jest.spyOn(service, 'findBy').mockResolvedValueOnce(undefined);

    await expect(service.renewToken('token')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw an error if incorrect current password when changing password', async () => {
    const dto: ForgotPasswordDto = {
      email: 'test@test.com',
      password: 'wrong_password',
      newPassword: 'new_password',
    };

    const user: User = {
      id: '1',
      email: 'test@test.com',
      password: 'password',
      username: 'test',
      validatePassword: jest.fn().mockResolvedValueOnce(false),
    } as any;

    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(user);

    await expect(service.forgotPassword('1', dto)).rejects.toThrow(
      BadRequestException,
    );
  });
});
