import { Request, Response } from "express";
declare const router: import("express-serve-static-core").Router;
export declare const publicKey: (_req: Request, res: Response) => Response<any, Record<string, any>>;
export declare const newSubscrition: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deletesubscription: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export { router as pushRouter };
//# sourceMappingURL=push.d.ts.map