
// import cloudinary from '../lib/cloudinary';

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

import cloudinary from '../lib/cloudinary';

export const uploadImageBuffer = (
    buffer: Buffer,
    folder: string
): Promise<{ url: string; publicId: string }> => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                fetch_format: 'auto',
                quality: 'auto',
            },
            (error, result) => {
                if (error || !result) return reject(error);
                resolve({ url: result.secure_url, publicId: result.public_id });
            }
        );
        stream.end(buffer);
    });
};

export const deleteImage = async (publicId: string): Promise<void> => {
    await cloudinary.uploader.destroy(publicId);
};