import { Length } from 'class-validator';

export class CreateUserDto {
  @Length(1, 60)
  readonly name: string;
  @Length(1, 60)
  readonly surname: string;
}
