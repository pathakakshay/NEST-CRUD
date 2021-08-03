import { Module, DynamicModule } from '@nestjs/common';
import { Services } from './services';

@Module({
  exports: [...Services],
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
