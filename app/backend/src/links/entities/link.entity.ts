import { UsersEntity } from 'src/users/entities/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity('links')
export class LinksEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ unique: true })
  readonly url!: string;

  @Column({ default: true })
  readonly isActive!: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @ManyToOne(() => UsersEntity, (user) => user.id)
  user: UsersEntity;

  @BeforeInsert()
  private setDefaultValues() {
    this.createdAt = new Date();
  }
}
