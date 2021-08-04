import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, MinLength, Validate } from 'class-validator';
import { IsUserAlreadyExist } from 'src/shared/validations/IsUserAlreadyExistValidator';

export class registerDTO {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty({
    message: 'The first name should not be empty',
  })
  first_name: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty({
    message: 'The last name should not be empty',
  })
  last_name: string;

  @ApiProperty({
    required: true,
  })
  @IsEmail()
  @Validate(IsUserAlreadyExist)
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
