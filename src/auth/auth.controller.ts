import { Body, Controller, Post } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { AuthService } from './providers/auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('/sign-in')
    public async SigninDto(@Body() signinDto:SigninDto)  {
        return await this.authService.SignIn(signinDto)
        
    }
 
}
