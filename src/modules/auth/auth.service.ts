import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/entity/user.entity';
import { UserService } from 'src/shared/services';
import { loginDTO } from 'src/shared/dto/login.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) {}

  createToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(payload: loginDTO): Promise<any> {
    const verify = await this.userService.getByEmailAndPass(
      payload.email,
      payload.password
    );

    if (verify == undefined) {
      return verify;
    }

    await this.userService.checkVerification(verify);

    const data = await this.userService.findOne({ id: verify.id });

    return data;
  }
}
