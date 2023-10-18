import { LinksEntity } from 'src/links/entities/link.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  readonly name!: string;

  @Column({ unique: true })
  readonly email!: string;

  @Column({ unique: true })
  readonly gravatarUrl?: string;

  @Column()
  readonly password!: string;

  @Column()
  readonly admin!: boolean;

  @JoinTable()
  @OneToMany(() => LinksEntity, (link) => link.user, { cascade: true })
  links?: LinksEntity[];

  @Column()
  createdAt!: Date;

  @BeforeInsert()
  private setDefaultValues() {
    this.createdAt = new Date();
  }
}
