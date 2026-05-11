'use client';

import React, { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import api from '@/lib/axios';

interface ImageUploadProps {
  label?: string;
  maxImages?: number;
  onImagesChange: (urls: string[]) => void;
  error?: string;
  required?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  maxImages = 12,
  onImagesChange,
  error,
  required = false,
}) => {
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const uploadToCloudinary = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      console.log('Uploading to:', api.defaults.baseURL + '/upload');
      console.log('File:', file.name, file.type, file.size);

      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Upload response:', response.data);

      if (response.data.success && response.data.url) {
        return response.data.url;
      }

      throw new Error('Invalid response from server');
    } catch (error: any) {
      console.error('Upload error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      throw new Error(error.response?.data?.message || error.message || 'Upload failed');
    }
  };

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const remainingSlots = maxImages - images.length;
      const filesToUpload = Array.from(files).slice(0, remainingSlots);

      if (filesToUpload.length === 0) {
        alert(`Maximum ${maxImages} images allowed`);
        return;
      }

      setUploading(true);

      try {
        const uploadPromises = filesToUpload.map((file) => {
          if (!file.type.startsWith('image/')) {
            throw new Error('Only image files are allowed');
          }
          if (file.size > 10 * 1024 * 1024) {
            throw new Error('Image size must be less than 10MB');
          }
          return uploadToCloudinary(file);
        });

        const uploadedUrls = await Promise.all(uploadPromises);
        const newImages = [...images, ...uploadedUrls];
        setImages(newImages);
        onImagesChange(newImages);
      } catch (err: any) {
        alert(err.message || 'Failed to upload images');
      } finally {
        setUploading(false);
      }
    },
    [images, maxImages, onImagesChange]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
    },
    [handleFiles]
  );

  const removeImage = useCallback(
    (index: number) => {
      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);
      onImagesChange(newImages);
    },
    [images, onImagesChange]
  );

  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-widest text-slate-600 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl transition-all duration-200 ${
          dragActive
            ? 'border-primary bg-primary/5'
            : error
            ? 'border-red-300 bg-red-50/30'
            : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
        }`}
      >
        <input
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          onChange={handleChange}
          disabled={uploading || images.length >= maxImages}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          id="image-upload"
        />

        <div className="p-8 text-center">
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-sm text-slate-600">Uploading images...</p>
            </div>
          ) : (
            <>
              <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Upload className="w-7 h-7 text-primary" />
              </div>
              <p className="text-sm font-medium text-slate-900 mb-1">
                Drop images here or click to browse
              </p>
              <p className="text-xs text-slate-500">
                JPG, PNG, WEBP up to 10MB • Max {maxImages} images ({images.length}/{maxImages})
              </p>
            </>
          )}
        </div>
      </div>

      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((url, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden bg-slate-100 border border-slate-200 group"
            >
              <Image
                src={url}
                alt={`Upload ${index + 1}`}
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
