import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  InternalServerErrorException,
  NotFoundException,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private productService: ProductsService) {}

  // @UseGuards(JwtAuthGuard)
  @Post('create')
  @UsePipes(ValidationPipe)
  async createProduct(@Body() productDto: CreateProductDto) {
    const result = await this.productService.createProduct(productDto);
    if (!result.id) {
      throw new InternalServerErrorException('NotCreatedData');
    }
    return { id: result.id, message: 'Product Created successfully' };
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.productService.getById(id);
    if (!result) {
      throw new NotFoundException('NotFoundData');
    }

    return result;
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.productService.deleteById(id);
    if (!result.affected) {
      throw new NotFoundException('NotFoundData');
    }

    return { success: 'deleted Successfully', id: id };
  }

  // @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() productDto: CreateProductDto,
  ) {
    const result: any = await this.productService.updateProduct(id, productDto);
    console.log(result);

    if (!result.affected) {
      throw new InternalServerErrorException('Not Found, Please try again');
    }

    return { success: 'updated Successfully', id: id };
  }
}
