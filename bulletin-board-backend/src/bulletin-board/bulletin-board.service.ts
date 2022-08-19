import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBulletinBoardDto } from './dto/create-bulletin-board.dto';
import { UpdateBulletinBoardDto } from './dto/update-bulletin-board.dto';
import { BulletinBoard } from './entities/bulletin-board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BulletinBoardService {
  constructor(
    @InjectRepository(BulletinBoard)
    private boardRepository: Repository<BulletinBoard>
  ) { }

  create(createBulletinBoardDto: CreateBulletinBoardDto) {
    this.boardRepository.save({
      ...createBulletinBoardDto
    })
    return;
  }

  findAll() {
    return this.boardRepository.find();
  }

  findOne(id: number) {
    return this.boardRepository.findOne({ where: { id } });
  }

  async update(id: number, updateBulletinBoardDto: UpdateBulletinBoardDto) {
    let li = await this.boardRepository.findOne({ where: { id } });
    if(!li) throw new NotFoundException();
    li = {
      ...li,
      ...updateBulletinBoardDto
    }
    return this.boardRepository.save(li);
  }

  async remove(id: number) {
    //중간에 서버와 통신할 땐 기다려야하니까, await 필수 - 비동기
    let li = await this.boardRepository.findOne({ where: { id } });
    if (!li) throw new NotFoundException();
    //return에서는 await을 생략해도 됨
    return this.boardRepository.remove(li);
  }
}
