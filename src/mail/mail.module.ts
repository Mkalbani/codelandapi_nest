import { Global, Module } from '@nestjs/common';
import { MailService } from './providers/mail.service';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import {join} from 'path'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>('MAIL_HOST', 'sandbox.smtp.mailtrap.io'), // Use ConfigService for dynamic values
          port: config.get<number>('MAIL_PORT', 2525), // Default Mailtrap port
          auth: {
            user: config.get<string>('SMTP_USERNAME'), // Environment variable for username
            pass: config.get<string>('SMTP_PASSWORD'), // Environment variable for password
          },
        },
        defaults: {
          from: '"No Reply" <noreply@example.com>', // Default sender
        },
        template: {
            dir: join(__dirname, 'template'),
            adapter: new EjsAdapter(),
            options:{
                strict: false
            }
        }
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
