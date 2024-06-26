import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  getHome(): any {
    return { message: this.appService.getHello() };
  }

  @Get("/home")
  getHello(): any {
    return { message: this.appService.getHello() + " Home page" };
  }
}
