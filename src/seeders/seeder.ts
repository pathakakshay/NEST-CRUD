import { Injectable, Logger } from '@nestjs/common';

import { UsersSeederService } from './user/user.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,

    private readonly userService: UsersSeederService
  ) {}
  async seed(table) {
    let response;
    switch (table) {
      case 'user':
        response = this.userService.users();
        break;

      default:
        response = this.all();
        break;
    }

    await response
      .then((completed) => {
        Promise.resolve(completed);
      })
      .catch((error) => {
        Promise.reject(error);
      });
  }
  async all() {
    return await Promise.all([await this.userService.users()]);
  }
}
