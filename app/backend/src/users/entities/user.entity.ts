import { LinksEntity } from 'src/links/entities/link.entity';
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
  readonly password!: string;

  @Column('json', { nullable: true })
  readonly links!: LinksEntity[];

  @Column()
  createdAt!: Date;

  @BeforeInsert()
  private setDefaultValues() {
    this.createdAt = new Date();
  }
}
