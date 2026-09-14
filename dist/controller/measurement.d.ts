import type { Request, Response } from 'express';
export declare const createMeasurement: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllMeasurements: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getMeasurement: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getMeasurementsByClient: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateMeasurement: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteMeasurement: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=measurement.d.ts.map