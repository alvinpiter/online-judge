import { IsInt, IsNotEmpty } from 'class-validator';

export class ProblemCreationDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsInt()
  rating: number;
}
