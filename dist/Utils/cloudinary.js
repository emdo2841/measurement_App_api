"use strict";
// import cloudinary from '../lib/cloudinary';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.uploadImageBuffer = void 0;
// export const uploadImageBuffer = (buffer: Buffer, folder: string): Promise<string> => {
//     return new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//             { 
//                 folder,
//                 fetch_format: 'auto',
//                 quality: 'auto',
//              },
//             (error, result) => {
//                 if (error || !result) return reject(error);
//                 resolve(result.secure_url);
//             }
//         );
//         stream.end(buffer);
//     });
// };
// export const deleteImage = async (publicId: string): Promise<void> => {
//     await cloudinary.uploader.destroy(publicId);
// };
const cloudinary_1 = __importDefault(require("../lib/cloudinary"));
const uploadImageBuffer = (buffer, folder) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.default.uploader.upload_stream({
            folder,
            fetch_format: 'auto',
            quality: 'auto',
        }, (error, result) => {
            if (error || !result)
                return reject(error);
            resolve({ url: result.secure_url, publicId: result.public_id });
        });
        stream.end(buffer);
    });
};
exports.uploadImageBuffer = uploadImageBuffer;
const deleteImage = async (publicId) => {
    await cloudinary_1.default.uploader.destroy(publicId);
};
exports.deleteImage = deleteImage;
//# sourceMappingURL=cloudinary.js.map