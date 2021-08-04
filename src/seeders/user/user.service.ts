import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { data } from './data';
import { User } from 'src/modules/entity/user.entity';

@Injectable()
export class UsersSeederService {
  /**
   * Create an instance of class.
   *
   * @constructs
   *
   * @param {Repository<Users>} UsersRepository
   */
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly logger: Logger
  ) {}

  async users() {
    return await Promise.all(this.create())
      .then((data) => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of Users created : ' +
            // Remove all null values and return only created languages.
            data.filter(
              (nullValueOrCreatedLanguage) => nullValueOrCreatedLanguage
            ).length
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
  /**
   * Seed all page tooltip.
   *
   * @function
   */
  create(): Array<Promise<User>> {
    return data.map(async (Users) => {
      const UsersData = await this.userRepository.findOne(Users);
      if (!UsersData) {
        const userD = await this.userRepository.save(
          this.userRepository.create(Users)
        );

        return userD;
      }
      return UsersData;
    });
  }
}
