import { GenerateTokensProviderTs } from './generate-tokens.provider.ts/generate-tokens.provider.ts';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { RefreshTokenDTO } from './../dto/refresh-token.dto';
import { Inject, Injectable, UnauthorizedException, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/providers/users.services';

@Injectable()
export class RefreshTokensProviderTs {
    constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfigtion: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
    
    @Inject(forwardRef(()=> UserService))
    private readonly userService:UserService,

    private readonly generateTokensProviderTs:GenerateTokensProviderTs
    ){}

    public async refreshToken(refreshTokenDTO:RefreshTokenDTO){
        try {
        // validate refresh token using jwt service
        const {sub } = await this.jwtService.verifyAsync(refreshTokenDTO.refreshToken, {
            audience: this.jwtConfigtion.audience,
            issuer: this.jwtConfigtion.issuer,
            secret: this.jwtConfigtion.secret
        })
        // grab user from the db
        const user = await this.userService.findOneById(sub)
        // generate the token
        return await this.generateTokensProviderTs.generateTokens(user)
        } catch (error) {
            throw new UnauthorizedException(error)
            
        }
    }
}
