export class CreateLinkDto {
  readonly id!: number;
  readonly url!: string;
  readonly isActive?: boolean;
  readonly createdAt!: Date;
}
