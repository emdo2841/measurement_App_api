export interface JwtPayLoad {
    userId: string,
    email: string
}


declare global {

    namespace Express {
        interface Request {
            user?: JwtPayLoad;
        }
    }
}