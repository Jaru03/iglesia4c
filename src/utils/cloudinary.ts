import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

export async function uploadCloudinary(image: File): Promise<UploadApiResponse> {
    cloudinary.config({
        cloud_name: "dw9putiww",
        api_key: "464592555841982",
        api_secret: "XmaXxWzjV7atBcGZjlOSZ6rqn4Y",
    });

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    return new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader.upload_stream({}, (err, result) => {
            if (err) {
                reject(err);
            } else if (!result) {
                reject(new Error("Cloudinary no devolvió un resultado"));
            } else {
                resolve(result);
            }
        }).end(buffer);
    });
}
