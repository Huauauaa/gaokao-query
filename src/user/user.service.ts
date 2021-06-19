import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getAll(page: number, size: number): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .skip((page - 1) * size || 0)
      .take(size)
      .getMany();
  }

  getOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  delete(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  create(payload: User): Promise<User> {
    return this.userRepository.save(payload);
  }

  async update(id: string, payload: User): Promise<User> {
    const user = await this.userRepository.findOne(id);
    return this.userRepository.save({ ...user, ...payload });
  }
}
