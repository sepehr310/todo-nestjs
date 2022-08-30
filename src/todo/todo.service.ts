import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}
  async create(createTodoDto: CreateTodoDto) {
    return {
      id: await (await this.todoRepository.create(createTodoDto).save()).id,
    };
  }

  async findAll() {
    return await this.todoRepository.find();
  }

  async findOne(id: number) {
    return await this.todoRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRepository.findOne({
      where: {
        id: id,
      },
    });
    todo.title = updateTodoDto.title;
    todo.description = updateTodoDto.description;
    return await todo.save();
  }

  async remove(id: number) {
    return await this.todoRepository.delete(id);
  }
}
