const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export const isCloudinaryConfigured = Boolean(CLOUD_NAME && UPLOAD_PRESET);

/**
 * Uploads a single File to Cloudinary via the unsigned upload preset.
 * Used from the admin "Add / Edit Car" form. Falls back to a local
 * object URL when Cloudinary isn't configured yet, so the upload UI
 * still works end-to-end in preview.
 */
export async function uploadCarImage(file) {
  if (!isCloudinaryConfigured) {
    return { url: URL.createObjectURL(file), mock: true };
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", "loisnx/inventory");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) {
    throw new Error("Image upload failed");
  }

  const data = await res.json();
  return { url: data.secure_url, publicId: data.public_id, mock: false };
}

/**
 * Builds a responsive, optimized Cloudinary delivery URL.
 * No-op passthrough for non-Cloudinary (mock) URLs.
 */
export function cloudinaryUrl(url, { width = 1200 } = {}) {
  if (!url || !url.includes("res.cloudinary.com")) return url;
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
}
