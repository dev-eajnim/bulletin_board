import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBulletinBoardDto } from './dto/create-bulletin-board.dto';
import { UpdateBulletinBoardDto } from './dto/update-bulletin-board.dto';
import { BulletinBoard } from './entities/bulletin-board.entity';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { title } from 'process';

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

  async findAll(page: number = 1, keyword?:string) { //default = 1
    const searchOptions:FindManyOptions<BulletinBoard>  = { 
      take: 5, //가져오기 
      skip: (page-1)*5 //점프 0, 5, 10
    }

    if(keyword) {
      searchOptions.where = {
          title: Like(`%${keyword}%`)
      }
    }
    const [items, total] = await this.boardRepository.findAndCount(searchOptions);
    return {
      items, total
    }
  }

  findOne(id: number) {
    return this.boardRepository.findOne({ where: { id } });
  }

  async update(id: number, updateBulletinBoardDto: UpdateBulletinBoardDto) {
    let li = await this.boardRepository.findOne({ where: { id } });
    if (!li) throw new NotFoundException();
    // 이 부분 잘 모르겠당
    // 어떻게 그냥 dto 넣었는데 잘 되지???
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

  async updateViews(id: number) {
    // find
    // update views++
    let li = await this.boardRepository.findOne({ where: { id } })
    if(!li) throw new NotFoundException();
    li = {
      ...li,
      views: ++li.views
    }
    return this.boardRepository.save(li);
  }

  async searchKeyword(keyword:string) {
    // return await this.boardRepository.createQueryBuilder('board').where('title like :keyword', { keyword: `%${keyword}%` }).getMany()
    
    return await this.boardRepository.find({
      where: {
        title: Like(`%${keyword}%`)
      }
    })
  }
}
