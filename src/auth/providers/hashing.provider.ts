import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingProvider {
    // hashing during sign up
    abstract hashPassword(data: string | Buffer): Promise<string>

    // compare during sign in
    abstract comparePassword(data: string | Buffer, encryptedData: string):  Promise<boolean>
}
