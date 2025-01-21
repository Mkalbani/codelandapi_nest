import { enumsType } from './../../enums/auth-type.enums';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AccessTokenGuard } from '../access-token/access-token.guard';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  //default auth type is Bearer
  private static readonly defaultAuthType = enumsType.Bearer;
  //map of auth type to guard
  private readonly authTypeGuardMap = {
    [enumsType.Bearer]: this.accessTokenGuard,
    [enumsType.None]: this.canActivate
  } 
  
  // Record<enumsType, CanActivate | CanActivate[]> = {
  //   // Bearer auth type to AccessTokenGuard guard
  //   [enumsTypes.Bearer]: this.accessTokenGuard,
  //   // None auth type to a guard that always returns true
  //   [enumsTypes.None]: {canActivate: ()=> true}
  // }

  constructor(
    //reflector to get metadata
    private readonly reflector: Reflector,
    //AccessTokenGuard Defendency
    private readonly accessTokenGuard: AccessTokenGuard
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
