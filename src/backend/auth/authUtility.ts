import { SignJWT, jwtVerify, type JWTPayload } from 'jose'
const secretKey: string = process.env.JWT_SECRET ?? ''
const secretKeyStream = new TextEncoder().encode(secretKey)

export async function sign(payload: any): Promise<string> {
  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + 60 * 60 // one hour

  return new SignJWT({ payload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(secretKeyStream)
}

export async function verify(token: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, secretKeyStream)
  // run some checks on the returned payload, perhaps you expect some specific values

  // if its all good, return it, or perhaps just return a boolean
  return payload
}
