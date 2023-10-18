import { LinksEntity } from 'src/links/entities/link.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  readonly name!: string;

  @Column()
  readonly email!: string;

  @Column()
  readonly gravatarUrl?: string;

  @Column()
  readonly password!: string;

  @Column()
  readonly admin!: boolean;

  @OneToMany(() => LinksEntity, (link) => link.user)
  links?: LinksEntity[];

  @Column()
  createdAt!: Date;

  @BeforeInsert()
  private setDefaultValues() {
    this.createdAt = new Date();
  }
}
