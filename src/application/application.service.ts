import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DeleteResult, Repository } from 'typeorm';
import { Application } from './application.entity';
import { CreateApplicationDTO } from './dto/create-application.dto';
import * as chalk from 'chalk';
import { QueryListType } from 'src/types/QueryListType';
import { AppStatus } from 'src/utils/enum';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private repository: Repository<Application>,
  ) {}

  async stat() {
    const result = await this.repository
      .createQueryBuilder('application')
      .select('application.status as status')
      .addSelect('COUNT(*) as count')
      .groupBy('application.status')
      .getRawMany();

    const total = result.reduce((res, cur) => (res += Number(cur.count)), 0);

    return result
      .map(item => ({
        ...item,
        value: Number(item.count),
        label: AppStatus[item.status],
      }))
      .concat({ status: -1, value: total, label: '全部应用' });
  }

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
      .orderBy('application.id', 'DESC')
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
