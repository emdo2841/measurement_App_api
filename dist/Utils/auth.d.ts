import { Response } from 'express';
export declare const hashToken: (token: string) => string;
export declare const generateAccessToken: (userId: string, email: string) => string;
export declare const generateRefreshToken: (userId: string) => string;
export declare const setRefreshTokenCookie: (res: Response, token: string) => void;
//# sourceMappingURL=auth.d.ts.map