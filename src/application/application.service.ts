import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Application } from './application.entity';
import { CreateApplicationDTO } from './dto/create-application.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private repository: Repository<Application>,
  ) {}

  findAll(
    page: number = 1,
    size: number,
    creator: string,
    status: number,
  ): Promise<Application[]> {
    let sql = 'select * from application where 2 > 1';
    if (creator) {
      sql += ` and creator like '%${creator}%'`;
    }
    if (status !== undefined) {
      sql += ` and status = '${status}'`;
    }

    if (size !== undefined) {
      sql += ` limit ${size}  offset ${size * (page - 1)}`;
    }

    sql += ` order by id`;

    return this.repository.query(sql);
  }

  getOne(id: number): Promise<Application> {
    return this.repository.findOne(id);
  }

  create(payload: CreateApplicationDTO): Promise<Application> {
    return this.repository.save(payload);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  async update(id: number, payload: Application): Promise<Application> {
    const record = await this.repository.findOne(id);
    return this.repository.save({ ...record, ...payload });
  }
}
