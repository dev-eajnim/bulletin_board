import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BulletinBoardService } from './bulletin-board.service';
import { CreateBulletinBoardDto } from './dto/create-bulletin-board.dto';
import { UpdateBulletinBoardDto } from './dto/update-bulletin-board.dto';

@Controller('bulletin-board')
export class BulletinBoardController {
  constructor(private readonly bulletinBoardService: BulletinBoardService) {}

  @Post()
  create(@Body() createBulletinBoardDto: CreateBulletinBoardDto) {
    return this.bulletinBoardService.create(createBulletinBoardDto);
  }

  @Get()
  findAll() {
    return this.bulletinBoardService.findAll();
  }

  //여기야 여기!!!! 쿼리를 사용해야 할 곳!!!
  @Get('?id')
  findOne(@Param('id') id: string) {
    return this.bulletinBoardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBulletinBoardDto: UpdateBulletinBoardDto) {
    return this.bulletinBoardService.update(+id, updateBulletinBoardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bulletinBoardService.remove(+id);
  }
}
