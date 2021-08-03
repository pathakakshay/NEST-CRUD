import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from 'src/shared/services';
@Controller('products')
export class ProductsController {
  constructor(private readonly prodctService: ProductService) {}
  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number
  ): Promise<any> {
    const generatedId = this.prodctService.insertProduct(
      prodTitle,
      prodDescription,
      prodPrice
    );

    return { id: generatedId };
  }

  @Get()
  async getAllProducts(): Promise<any> {
    return this.prodctService.getProducts();
  }

  @Get('/:id')
  async getProduct(@Param('id') prodId: string): Promise<any> {
    return this.prodctService.getSingleProduct(prodId);
  }

  @Patch('/:id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number
  ): Promise<any> {
    this.prodctService.updateProduct(
      prodId,
      prodTitle,
      prodDescription,
      prodPrice
    );
    return null;
  }

  @Delete('/:id')
  async removeProduct(@Param('id') prodId: string): Promise<any> {
    this.prodctService.deleteProduct(prodId);
    return null;
  }
}
