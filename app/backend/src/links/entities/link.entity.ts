import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('links')
export class LinksEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  readonly url!: string;

  @Column({ default: true })
  readonly isActive!: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @BeforeInsert()
  private setDefaultValues() {
    this.createdAt = new Date();
  }
}
