import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Application } from './application.entity';
import { CreateApplicationDTO } from './dto/create-application.dto';
import * as chalk from 'chalk';
import { QueryListType } from 'src/types/QueryListType';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private repository: Repository<Application>,
  ) {}

  async findAll(
    page: number = 1,
    size: number = 10,
    creator: string,
    status: number,
  ): Promise<QueryListType> {
    let sql = 'select * from application where 2 > 1';
    if (creator) {
      sql += ` and creator like '%${creator}%'`;
    }
    if (status !== undefined) {
      sql += ` and status = '${status}'`;
    }

    sql += ` order by id`;

    sql += ` limit ${size}  offset ${size * (page - 1)}`;

    console.log(chalk.green(sql));

    const total = await this.repository.count();
    const items = await this.repository.query(sql);

    return {
      total,
      items,
      page: Number(page),
      size: Number(size),
    };
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
