import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { UserService } from 'src/users/providers/users.services';
import { Inject, Injectable, RequestTimeoutException, UnauthorizedException, forwardRef } from '@nestjs/common';
import { SigninDto } from '../dto/signin.dto';
import jwtConfig from '../config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class SignInProvider {
constructor(
    @Inject(forwardRef(()=> UserService))
    private readonly userService:UserService,

    // intradepency injection
    private readonly hashingProvider:HashingProvider,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfigtion: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService
){}


    public  async SignIn(signinDto: SigninDto){
        // find the user in the db by email
        // throw an error 
        const user = await this.userService.getOneByEmail(signinDto.email)
        // compare password to the hash
        let isEqual: boolean = false

        try {
            isEqual = await this.hashingProvider.comparePassword(
                signinDto.password,
                user.password
                )
            
        } catch (error) {
            throw new RequestTimeoutException(error,{
                description: 'Password does not match',
                
            })
        }

        if(!isEqual){
            throw new UnauthorizedException('Email/Passwords do not match')
        }
        
        // send comfirmation
        const acces_token = await this.jwtService.signAsync({
            sub: user.id,
            email: user.email,
        },
        {
            audience: this.jwtConfigtion.audience,
            issuer: this.jwtConfigtion.issuer,
            expiresIn: this.jwtConfigtion.ttl
        }) 
        return ({acces_token})
    }
}
