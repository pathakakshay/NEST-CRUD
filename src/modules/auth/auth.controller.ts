import {
  Controller,
  Post,
  Body,
  Res,
  Inject,
  forwardRef,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { registerDTO } from 'src/shared/dto/register.dto';
import { loginDTO } from 'src/shared/dto/login.dto';

import { ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { UserService } from 'src/shared/services';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {}

  @Post('register')
  @ApiOkResponse({ description: 'Successfully registered' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async register(
    @Body() RegisterPayload: registerDTO,
    @Res() res: Response
  ): Promise<any> {
    try {
      return await this.userService
        .create(RegisterPayload)
        .then(async (user) => {
          if (!user) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
              message:
                'Something went wrong during register, please try again later',
            });
          } else {
            const token = await this.authService.createToken(user);

            return res.status(HttpStatus.OK).json({
              status: 200,
              data: Object.assign(token, { user: user }),
            });
          }
        });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('login')
  @ApiOkResponse({ description: 'Successfully authenticated' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async login(@Body() payload: loginDTO, @Res() res: Response): Promise<any> {
    return await this.authService.validateUser(payload).then(async (user) => {
      if (!user) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: 401,
          message: 'Invalid email or password. Please try again.',
        });
      } else {
        const token = await this.authService.createToken(user);
        return res.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          data: Object.assign(token, { user: user }),
        });
      }
    });
  }
}
