import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  AfterLoad,
} from 'typeorm';
import { PasswordTransformer } from 'src/shared/password.transformer';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column({
    select: false,
    name: 'password',
    length: 255,
    transformer: new PasswordTransformer(),
  })
  password: string;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;

  @AfterLoad()
  setComputed() {
    this.name = this.first_name + ' ' + this.last_name;
  }
}
