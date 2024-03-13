import { Module } from '@nestjs/common';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [MailerModule],
  exports: [MailerModule],
})
export class CommonModule {}
