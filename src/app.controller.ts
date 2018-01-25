import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { MyDto } from "./my.dto";

@Controller()
export class AppController {
  @Post()
  root(
    @Body(new ValidationPipe()) data: MyDto
  ) {
    return data.test;
  }

}
