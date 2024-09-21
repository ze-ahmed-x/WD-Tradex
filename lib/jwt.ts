import jwt, { JwtPayload } from "jsonwebtoken";

type siginOptions = {
    expiresIn: string | number
}

const defaultOptions:siginOptions  = {
    expiresIn: '365d'
}

export function signJWT(payload: JwtPayload, key: string, options: siginOptions = defaultOptions) {
    // const secretKey = process.env.JWT_USER_ID_SECRET!;
    const secretKey = key;
    const token = jwt.sign(payload, secretKey, options);
    return token
}

export function verifyJWT (token: string, key: string) {
    // using try/catch becasue in case of expired token it will throw exception
    try {
        // const secretKey = process.env.JWT_USER_ID_SECRET!;
        const secretKey = key;
        const decoded = jwt.verify(token, secretKey);
        return decoded as JwtPayload
    } catch (error) {
        // console.log(error)
        return null;
    } 
}