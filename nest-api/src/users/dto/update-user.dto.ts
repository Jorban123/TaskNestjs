import { Length } from 'class-validator';

export class UpdateUserDto {
  @Length(1, 60)
  name: string;
  @Length(1, 60)
  surname: string;
}
