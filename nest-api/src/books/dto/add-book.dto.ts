import { Length } from 'class-validator';

export class AddBookDto {
  @Length(1, 255)
  name: string;
  @Length(1, 255)
  author: string;
}
