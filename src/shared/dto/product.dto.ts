import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class productDTO {
  id: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty({
    message: 'The title should not be empty',
  })
  title: string;

  description: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty({
    message: 'The price should not be empty',
  })
  price: number;
}
