import {
  Controller,
  Post,
  Body,
  UnprocessableEntityException,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';

import { productDTO } from 'src/shared/dto/product.dto';
import { ProductService } from 'src/shared/services';
@Controller('products')
export class ProductsController {
  constructor(private readonly prodctService: ProductService) {}
  @Post()
  @ApiOkResponse({ description: 'Successfully authenticated' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async addProduct(@Body() body: productDTO): Promise<any> {
    try {
      const generatedId = await this.prodctService.insertProduct(
        body.title,
        body.description,
        body.price
      );
      return { id: generatedId };
    } catch (error: any) {
      throw new UnprocessableEntityException(error);
    }
  }

  @Get()
  @ApiOkResponse({ description: 'Successfully authenticated' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async getAllProducts(): Promise<any> {
    try {
      const products = await this.prodctService.getAllProduct();
      return products;
    } catch (error: any) {
      throw new UnprocessableEntityException(error);
    }
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Successfully authenticated' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async getProduct(@Param('id') prodId: number): Promise<any> {
    try {
      const product = await this.prodctService.getSingleProduct(prodId);
      return product;
    } catch (error: any) {
      throw new UnprocessableEntityException(error);
    }
  }

  @Patch('/:id')
  @ApiOkResponse({ description: 'Successfully authenticated' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number
  ): Promise<any> {
    try {
      await this.prodctService.updateProduct(
        prodId,
        prodTitle,
        prodDescription,
        prodPrice
      );
      return null;
    } catch (error: any) {
      throw new UnprocessableEntityException(error);
    }
  }

  @Delete('/:id')
  @ApiOkResponse({ description: 'Successfully authenticated' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async removeProduct(@Param('id') prodId: number): Promise<any> {
    try {
      await this.prodctService.deleteProduct(prodId);
      return null;
    } catch (error: any) {
      throw new UnprocessableEntityException(error);
    }
  }
}
