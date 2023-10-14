import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  readonly name!: string;

  @Column()
  readonly email!: string;

  @Column()
  readonly senha!: string;

  @Column()
  readonly linkid!: number;

  @Column()
  createdAt!: Date;

  @BeforeInsert()
  private setDefaultValues() {
    this.createdAt = new Date();
  }
}
