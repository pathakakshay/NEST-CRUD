import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class productDTO {
  id: string;

  @ApiProperty({
    required: false,
  })
  @IsNotEmpty({
    message: 'The title should not be empty',
  })
  title: string;

  description: string;

  @ApiProperty({
    required: false,
  })
  @IsNotEmpty({
    message: 'The price should not be empty',
  })
  price: number;
}
