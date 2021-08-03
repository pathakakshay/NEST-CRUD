import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [ProductsController],
  imports: [SharedModule],
})
export class ProductsModule {}
