import { IsNumber } from 'class-validator';

export class MyDto {

  @IsNumber()
  readonly test: number;

}