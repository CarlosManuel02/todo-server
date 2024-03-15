import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { getRepositoryToken } from "@nestjs/typeorm";
import { Todo } from "./entities/todo.entity";
import { DataSource } from "typeorm";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/entities/auth.entity";
import { JwtService } from "@nestjs/jwt";

describe('TodosService', () => {
  let service: TodosService;
  const mockTodoRepository = {
    create: jest.fn().mockImplementation(todo => todo),
  }
  const mockUserRepository = {};
  const mockDataSource = {}; // Mock DataSource as needed
  const mockJwtService = {}; // Mock JwtService as needed

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        AuthService,
        {
          provide: getRepositoryToken(Todo),
          useValue: mockTodoRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
        {
          provide: JwtService, // Provide JwtService
          useValue: mockJwtService
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
