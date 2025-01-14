import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.services';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService)) 
        private readonly userService: UserService
    ) {}
}
