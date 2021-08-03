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
import { productDTO } from 'src/shared/dto/product.dto';
import { ProductService } from 'src/shared/services';
@Controller('products')
export class ProductsController {
  constructor(private readonly prodctService: ProductService) {}
  @Post()
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
  async getAllProducts(): Promise<any> {
    try {
      const products = await this.prodctService.getAllProduct();
      return products;
    } catch (error: any) {
      throw new UnprocessableEntityException(error);
    }
  }

  @Get('/:id')
  async getProduct(@Param('id') prodId: number): Promise<any> {
    return await this.prodctService.getSingleProduct(prodId);
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
  async removeProduct(@Param('id') prodId: number): Promise<any> {
    this.prodctService.deleteProduct(prodId);
    return null;
  }
}
