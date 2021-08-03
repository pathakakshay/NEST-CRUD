import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from 'src/modules/entity/product.entity';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async insertProduct(
    title: string,
    description: string,
    price: number
  ): Promise<any> {
    try {
      const product = new Product();
      product.title = title;
      product.description = description;
      product.price = price;
      const newProduct = await this.productRepository.save(product);
      return newProduct.id;
    } catch (err: any) {
      throw err;
    }
  }

  async getAllProduct(): Promise<any> {
    try {
      const products = await this.productRepository.find();
      return products;
    } catch (err: any) {
      throw err;
    }
  }

  async getSingleProduct(id: number): Promise<any> {
    try {
      const products = await this.productRepository.findByIds([id]);
      if (!products[0]) throw new NotFoundException('Product Not Found');

      return products;
    } catch (err: any) {
      throw err;
    }
  }

  async updateProduct(
    prodId: string,
    title: string,
    description: string,
    price: number
  ) {
    try {
      const product = await this.productRepository.findByIds([prodId]);
      if (!product[0]) throw new NotFoundException('Product Not Found');
      const updatedProduct = { ...product[0] };
      if (title) {
        updatedProduct.title = title;
      }
      if (description) {
        updatedProduct.description = description;
      }
      if (price) {
        updatedProduct.price = price;
      }
      const newProduct = await this.productRepository.save(updatedProduct);
      return newProduct;
    } catch (err: any) {
      throw err;
    }
  }
  async deleteProduct(id: number): Promise<any> {
    try {
      const product = await this.productRepository.findByIds([id]);
      if (!product) throw new NotFoundException('Product Not Found');
      await this.productRepository.delete({ id });
    } catch (err: any) {
      throw err;
    }
  }
}
