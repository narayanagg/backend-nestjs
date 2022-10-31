import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './products.entity';

@Module({
  providers: [ProductsService],
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [ProductsController],
})
export class ProductsModule {}
