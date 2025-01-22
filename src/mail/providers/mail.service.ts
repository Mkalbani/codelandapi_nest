import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/users/user.entity';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService
    ){}

    public async welcomeEmail(user: User): Promise<void>{
        await this.mailerService.sendMail({
        to: user.email,
        from: `helpdesk.codeland.com`,
        subject: `Welcome ${user} to codeland.`,
        template: './welcome',
        context:{
            name:user.firstName,
            email:user.email,
            loginurl:'http://localhost:3000/'
        }
        })
 

    }
}
