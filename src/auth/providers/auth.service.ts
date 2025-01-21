import { RefreshTokensProviderTs } from './refresh-tokens.provider.ts';
import { SignInProvider } from './sign-in.provider';
import { SigninDto } from './../dto/signin.dto';
import { Body, Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.services';
import { RefreshTokenDTO } from '../dto/refresh-token.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService)) 
        private readonly userService: UserService,

        private readonly signInProvider:SignInProvider,

        private readonly refreshTokensProviderTs:RefreshTokensProviderTs
    ) {}

    

    public async SignIn(signinDto:SigninDto){
        // find the user in the database
        return await this.signInProvider.SignIn(signinDto)
        // throw error if user is not found
        // compare the password with the hass
        // send comfirmative password
    }

    public async refreshToken(refreshTokenDTO:RefreshTokenDTO){
        return this.refreshTokensProviderTs.refreshToken(refreshTokenDTO) 
    }
}
