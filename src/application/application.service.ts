import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DeleteResult, Repository } from 'typeorm';
import { Application } from './application.entity';
import { CreateApplicationDTO } from './dto/create-application.dto';
import * as chalk from 'chalk';
import { QueryListType } from 'src/types/QueryListType';
import { stat } from 'fs';

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
  ): Promise<QueryListType<Application>> {
    const qb = this.repository
      .createQueryBuilder('application')
      .where('1=1')
      .andWhere(
        new Brackets(qb => {
          if (creator) {
            qb.where(`application.creator like '%${creator}%'`);
          } else {
            qb.where(`1=1`);
          }
        }),
      )
      .andWhere(
        new Brackets(qb => {
          if (status !== undefined) {
            qb.where('application.status = :status', {
              status,
            });
          } else {
            qb.where(`1=1`);
          }
        }),
      )
      .orderBy('application.id')
      .limit(size)
      .offset(size * (page - 1));
    const sql = qb.getSql();

    console.log(chalk.green(sql));

    const total = await qb.getCount();
    const items = await qb.getMany();

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
