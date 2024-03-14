import { Injectable } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Todo } from "./entities/todo.entity";
import { DataSource, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { v4 as uuidv4, validate as isUUID } from "uuid";
import { AuthService } from "../auth/auth.service";
import { PaginationDto } from "../common/dtos/pagination.dto";


@Injectable()
export class TodosService {

  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private readonly authService: AuthService,
    private readonly datasource: DataSource
  ) {
  }


  async create(createTodoDto: CreateTodoDto) {

    const user = await this.authService.findBy(createTodoDto.user_id);
    if (!user) {
      throw new Error("User not found");
    }

    try {
      const todo = this.todoRepository.create({
        ...createTodoDto,
        id: uuidv4(),
        createdAt: new Date()
      });
      return await this.todoRepository.save(todo);
    } catch (e) {
      throw new Error(e);
    }

  }

  async findAll(pagiantion: PaginationDto) {

    const { id, limit = 10, offset = 0 } = pagiantion;

    return await this.todoRepository.findAndCount({
      where: { user_id: id },
      take: limit,
      skip: offset
    });

  }

  async findOne(term: string) {

    let todo: Todo;

    if (isUUID(term)) {
      todo = await this.todoRepository.findOneBy([
        { id: term },
        { user_id: term }
      ]);
    } else {
      todo = await this.todoRepository.findOneBy({ title: term });
    }

    if (!todo) {
      throw new Error("Todo not found");
    }

    return {
      todo,
      status: 200
    };


  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const todo = this.todoRepository.preload({
      id,
      ...updateTodoDto
    });
    if (!todo) {
      throw new Error("Todo not found");
    }

    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    await queryRunner.manager.save(todo);

    await queryRunner.commitTransaction();
    await queryRunner.release();

    return todo;
  }

  async remove(id: string) {
    const todo = await this.findOne(id);
    if (!todo) {
      throw new Error("Todo not found");
    }

    try {
      return await this.todoRepository.delete(id);
    } catch (e) {
      throw new Error(e);
    }
  }

}
