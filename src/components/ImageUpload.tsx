"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { ImagePlus, Trash } from "lucide-react"; 

interface ImageUploadProps {
  onSuccess: (url: string) => void;
}

export default function ImageUpload({ onSuccess }: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET} 
        onSuccess={(result: any) => {
          const url = result.info.secure_url;
          setImageUrl(url);
          onSuccess(url); 
        }}
        options={{
            maxFiles: 1,
            resourceType: "image"
        }}
      >
        {({ open }) => {
          return (
            <button
              type="button" 
              onClick={() => open()}
              className="bg-slate-100 text-slate-600 font-semibold py-3 px-4 rounded-xl hover:bg-slate-200 transition flex items-center gap-2 justify-center border-2 border-dashed border-slate-300 w-full"
            >
              <ImagePlus className="w-5 h-5" /> Subir Imagen
            </button>
          );
        }}
      </CldUploadWidget>
      {imageUrl && (
        <div className="relative w-full h-48 bg-slate-50 rounded-xl overflow-hidden border border-slate-200 shadow-sm group">
          <img 
            src={imageUrl} 
            alt="Imagen subida" 
            className="w-full h-full object-cover"
          />
          <button
             type="button"
             onClick={() => { setImageUrl(""); onSuccess(""); }}
             className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <Trash className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}