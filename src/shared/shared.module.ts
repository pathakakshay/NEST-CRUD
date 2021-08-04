import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/modules/entity/product.entity';
import { User } from 'src/modules/entity/user.entity';
import { Services } from './services';

const Entity = [Product, User];
@Module({
  imports: [TypeOrmModule.forFeature(Entity)],
  exports: [...Services, TypeOrmModule.forFeature(Entity)],
  providers: [...Services],
})
export class SharedModule {
  static forRoot(): DynamicModule {
    return {
      module: SharedModule,
      providers: [...Services],
    };
  }
}
