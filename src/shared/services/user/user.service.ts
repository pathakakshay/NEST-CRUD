import { Injectable, NotAcceptableException } from '@nestjs/common';
import { User } from 'src/modules/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async findOne(where: unknown, relations: Array<any> = []): Promise<User> {
    return this.userRepository.findOne({ where: where, relations: relations });
  }

  async create(payload): Promise<any> {
    try {
      const user = new User();

      if (payload.first_name) {
        user.first_name = payload.first_name;
      }
      if (payload.last_name) {
        user.last_name = payload.last_name;
      }
      if (payload.email) {
        user.email = payload.email;
        const find = await this.userRepository.findOne({ email: user.email });
        if (find && find.id != payload.id) {
          throw new Error('This email is already used.');
        }
      }
      if (payload.password) {
        user.password = payload.password;
      }
      const newUser = await this.userRepository.save(user);
      return newUser;

      return user;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    await this.userRepository.delete({ id: id });
  }

  async updateUserProfile(payload): Promise<any> {
    try {
      let isChangeEmail = false;

      let user = new User();

      if (payload.first_name) {
        user.first_name = payload.first_name;
      }
      if (payload.last_name) {
        user.last_name = payload.last_name;
      }
      if (payload.email) {
        user.email = payload.email;
        const find = await this.userRepository.findOne({ email: user.email });

        if (find && find.id != payload.id) {
          throw new Error('This email is already used.');
        }
        isChangeEmail = true;
      }

      await this.userRepository.update(payload.id, user);
      user = await this.findOne({ id: payload.id });
      user = Object.assign({ isChangeEmail: isChangeEmail }, user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getByEmailAndPass(email: string, password: string) {
    const passHash = crypto.createHmac('sha256', password).digest('hex');
    return await this.userRepository
      .createQueryBuilder('user')
      .where('(user.email = :email) and user.password = :password')
      .setParameter('email', email)
      .setParameter('password', passHash)
      .getOne();
  }

  async checkVerification(user) {
    const userData = await this.userRepository.findOne({ id: user.id });
    if (userData) {
      return userData;
    } else {
      throw new NotAcceptableException('Your Not Authorized.');
    }
  }
}
