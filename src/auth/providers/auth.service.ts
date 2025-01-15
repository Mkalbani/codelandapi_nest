import { SignInProvider } from './sign-in.provider';
import { SigninDto } from './../dto/signin.dto';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.services';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService)) 
        private readonly userService: UserService,

        private readonly signInProvider:SignInProvider
    ) {}

    

    public async SignIn(signinDto:SigninDto){
        // find the user in the database
        return await this.signInProvider.SignIn(signinDto)
        // throw error if user is not found
        // compare the password with the hass
        // send comfirmative password
    }
}
