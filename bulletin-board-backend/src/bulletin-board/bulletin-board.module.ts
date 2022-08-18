import { Module } from '@nestjs/common';
import { BulletinBoardService } from './bulletin-board.service';
import { BulletinBoardController } from './bulletin-board.controller';
import { BulletinBoard } from './entities/bulletin-board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BulletinBoard])],
  controllers: [BulletinBoardController],
  providers: [BulletinBoardService]
})
export class BulletinBoardModule {}
