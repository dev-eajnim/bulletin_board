import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBulletinBoardDto } from './dto/create-bulletin-board.dto';
import { UpdateBulletinBoardDto } from './dto/update-bulletin-board.dto';
import { BulletinBoard } from './entities/bulletin-board.entity';
import { Repository } from 'typeorm';
@Injectable()
export class BulletinBoardService {
  constructor(
    @InjectRepository(BulletinBoard)
    private boardRepository:Repository<BulletinBoard>
  ){}

  create(createBulletinBoardDto: CreateBulletinBoardDto) {
    return 'This action adds a new bulletinBoard';
  }

  findAll() {
    return `This action returns all bulletinBoard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bulletinBoard`;
  }

  update(id: number, updateBulletinBoardDto: UpdateBulletinBoardDto) {
    return `This action updates a #${id} bulletinBoard`;
  }

  remove(id: number) {
    return `This action removes a #${id} bulletinBoard`;
  }
}
