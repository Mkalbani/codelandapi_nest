import { SetMetadata } from '@nestjs/common';
import { AUTH_TYPE_KEY } from 'src/auth/constant/auth-constant';
import { enumsType } from 'src/auth/enums/auth-type.enums';

export const Auth = (...authTypes: enumsType[])=>
    SetMetadata(AUTH_TYPE_KEY, authTypes)
// export const Auth = (...args: string[]) => SetMetadata('auth', args);
