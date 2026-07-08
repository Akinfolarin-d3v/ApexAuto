"use client";

import { useRef, useState } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { uploadCarImage, isCloudinaryConfigured } from "@/lib/cloudinary";

export default function ImageUploader({ images, onChange }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFiles(fileList) {
    const files = Array.from(fileList || []);
    if (!files.length) return;
    setUploading(true);
    setError("");
    try {
      const uploaded = await Promise.all(files.map((file) => uploadCarImage(file)));
      onChange([...images, ...uploaded.map((u) => u.url)]);
    } catch (err) {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  function removeImage(index) {
    onChange(images.filter((_, i) => i !== index));
  }

  return (
    <div>
      {!isCloudinaryConfigured && (
        <p className="mb-3 rounded-lg bg-steel-50 p-3 text-xs text-steel-500">
          Cloudinary isn't configured yet — uploads are previewed locally in this browser only.
        </p>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-steel-300 py-8 text-sm text-steel-500 transition-colors hover:border-ink hover:text-ink disabled:opacity-50"
      >
        {uploading ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} strokeWidth={1.75} />}
        {uploading ? "Uploading…" : "Click to upload photos"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {error && <p className="mt-2 text-xs text-velocity">{error}</p>}

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {images.map((src, i) => (
            <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-steel-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Upload ${i + 1}`} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                aria-label="Remove image"
                className="absolute right-1.5 top-1.5 rounded-full bg-ink/70 p-1 text-canvas hover:bg-ink"
              >
                <X size={12} strokeWidth={2} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
