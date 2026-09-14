export declare const uploadImageBuffer: (buffer: Buffer, folder: string) => Promise<{
    url: string;
    publicId: string;
}>;
export declare const deleteImage: (publicId: string) => Promise<void>;
//# sourceMappingURL=cloudinary.d.ts.map