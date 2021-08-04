import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class loginDTO {
  @ApiProperty({
    required: true,
  })
  @IsEmail()
  @IsNotEmpty({
    message: 'The email name should not be empty',
  })
  email: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty({
    message: 'The password should not be empty',
  })
  @MinLength(8)
  password: string;
}
