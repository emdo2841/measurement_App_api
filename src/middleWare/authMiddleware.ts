import jwt from 'jsonwebtoken';
import { JwtPayLoad } from '../types/express';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'


export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({message: "Access tokrn missing"})
    }

    try{
        // verify ignature and expiry date
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayLoad;

        //  attach decoded token payload to request object
        req.user = decoded;
        next()
    }catch(error){
        return res.status(403).json({message: "Invalid or Expired Token"})
    }
}