import { Module } from '@nestjs/common';
import { MetaOptionsController } from './meta-options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOption } from './meta-option.entity';
import { MetaOptionsService } from './provider/meta-options.service';

@Module({
  imports: [TypeOrmModule.forFeature([MetaOption])],
  providers: [MetaOptionsService],
  controllers: [MetaOptionsController],
  exports: [TypeOrmModule, MetaOptionsService]  // Make sure to export both
})
export class MetaOptionsModule {}