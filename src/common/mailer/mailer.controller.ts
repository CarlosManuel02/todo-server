import { Controller, Post } from "@nestjs/common";
import { MailerService } from "./mailer.service";

@Controller("mailer")
export class MailerController {
  constructor(private readonly mailerService: MailerService) {
  }

  @Post()
  async sendMail() {

    const sendMailDto = {
      from: { name: "Carlos", address: "carlos@example.com" },
      recipients: [{ name: "Jane Doe", address: "carlosmcb02@gmail.com" }],
      subject: "Hello",
      html: "<b>Hello world?</b>",

    }
      return this.mailerService.sendMail( sendMailDto );
    };
  }
