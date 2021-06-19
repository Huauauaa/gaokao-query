import { Controller, Get } from '@nestjs/common';
import { User } from '../entity/User';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.service.getAll();
  }
}
