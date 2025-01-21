import { RefreshTokensProviderTs } from './providers/refresh-tokens.provider.ts';
import { Body, Controller, Post } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { AuthService } from './providers/auth.service';
import { RefreshTokenDTO } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('/sign-in')
    public async SigninDto(@Body() signinDto:SigninDto)  {
        return await this.authService.SignIn(signinDto)
        
    }

    @Post('refresh-token')
    public async refreshToken(@Body() refreshTokenDTO:RefreshTokenDTO){
        return this.authService.refreshToken(refreshTokenDTO)
    }
 
}
