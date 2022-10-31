import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Products } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  async createProduct(product: CreateProductDto) {
    return await this.productsRepository.save(product);
  }

  async getAllProducts() {
    try {
      return await this.productsRepository.find();
    } catch (error) {
      throw new HttpException('something went wrong', HttpStatus.NOT_FOUND);
    }
  }

  async getById(id: number) {
    try {
      return await this.productsRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException('product not found', HttpStatus.NOT_FOUND);
    }
  }

  async deleteById(id: number) {
    return this.productsRepository.delete(id);
  }

  async updateProduct(id: number, product: CreateProductDto) {
    return this.productsRepository.update(id, product);
  }
}
