import { SigninDto } from './../dto/signin.dto';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.services';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService)) 
        private readonly userService: UserService
    ) {}

    public SignIn(signinDto:SigninDto){
        // find the user in the database
        
        // throw error if user is not found
        // compare the password with the hass
        // send comfirmative password
    }
}
