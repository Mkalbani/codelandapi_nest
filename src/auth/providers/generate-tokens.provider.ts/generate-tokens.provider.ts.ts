import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/auth/config/jwt.config';
import { User } from 'src/users/user.entity';

@Injectable()
export class GenerateTokensProviderTs {
    constructor(

    @Inject(jwtConfig.KEY)
    private readonly jwtConfigtion: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
    ){}

    public async signToken<T>(userId: number, expiresIn: number, payload?:T){
        return await this.jwtService.signAsync({
            sub: userId,
            ...payload
        },
        {
            audience: this.jwtConfigtion.audience,
            issuer: this.jwtConfigtion.issuer,
            expiresIn,
            secret: this.jwtConfigtion.secret

        }) 
    }

    public async generateTokens(user: User){
        const [access_token, refresh_token] = await Promise.all([
                    // generate access token
        this.signToken(user.id, this.jwtConfigtion.ttl, {email: user.email}),

        // generate refresh token
        this.signToken(user.id, this.jwtConfigtion.Rttl)
        ])
        return {access_token, refresh_token}
    }
}
