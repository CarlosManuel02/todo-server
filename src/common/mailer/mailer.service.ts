import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as process from "process";
import { SendMailDto } from "./mail.interface";


@Injectable()
export class MailerService {

  mailTrasporter(){
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    return transporter;
  }

  sendMail(sendMailDto: SendMailDto) {
    const {from, recipients, subject, html, text, placeholdersReplacements} = sendMailDto;

    const transporter = this.mailTrasporter();

    const mailOptions = {
      from: from ?? {
        name: process.env.MAIL_FROM_NAME,
        address: process.env.MAIL_FROM_ADDRESS,
      },
      to: recipients,
      subject,
      html,
    }

    try {
      const result = transporter.sendMail(mailOptions);
      return result;
    } catch (error) {
      console.log(error);
    }

  }
}
