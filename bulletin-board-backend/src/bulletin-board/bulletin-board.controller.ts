import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { query } from 'express';
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
  findAll(@Query('page') page?: number, @Query('keyword') keyword? : string) {
    return this.bulletinBoardService.findAll(page, keyword)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bulletinBoardService.findOne(+id);
  }

  @Get(':keyword/search')
  searchKeyword(@Param('keyword') keyword:string){
    return this.bulletinBoardService.searchKeyword(keyword);
  }


  @Patch(':id')
  update(@Param('id') id: string, 
  @Body() updateBulletinBoardDto: UpdateBulletinBoardDto) {
    return this.bulletinBoardService.update(+id, updateBulletinBoardDto);
  }

  @Patch(':id/views')
  updateViews(@Param('id') id: string) {
    return this.bulletinBoardService.updateViews(+id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bulletinBoardService.remove(+id);
  }
}
