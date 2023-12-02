import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
const secretKey: string = process.env.JWT_SECRET || '';
const secretKeyStream = new TextEncoder().encode(secretKey);

export async function verify(token: string): Promise<JWTPayload> {
    const { payload } = await jwtVerify(token, secretKeyStream);
    // run some checks on the returned payload, perhaps you expect some specific values

    // if its all good, return it, or perhaps just return a boolean
    return payload;
}