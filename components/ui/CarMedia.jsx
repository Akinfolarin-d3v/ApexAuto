import Image from "next/image";
import { Car } from "lucide-react";
import { clsx } from "@/lib/utils";
import { cloudinaryUrl } from "@/lib/cloudinary";

const DUOTONES = {
  electric: "from-trust-tint via-canvas to-canvas",
  "luxury-suv": "from-signal-tint via-canvas to-canvas",
  "sport-sedan": "from-velocity-tint via-canvas to-canvas",
  "best-value": "from-signal-tint via-canvas to-canvas",
};

/**
 * Renders a real Cloudinary/gallery photo when one exists on the car record.
 * Until images are uploaded, falls back to a bright, friendly duotone card
 * so empty inventory never looks broken mid-build.
 */
export default function CarMedia({ car, className, priority = false }) {
  const src = car?.galleryImages?.[0];
  const isPreviewUrl = src?.startsWith("blob:") || src?.startsWith("data:");

  if (src && isPreviewUrl) {
    return (
      <div className={clsx("relative overflow-hidden bg-steel-100", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={car.title} className="absolute inset-0 h-full w-full object-cover" />
      </div>
    );
  }

  if (src) {
    return (
      <div className={clsx("relative overflow-hidden bg-steel-100", className)}>
        <Image
          src={cloudinaryUrl(src, { width: 1200 })}
          alt={car.title}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
        DUOTONES[car?.category] || "from-steel-100 via-canvas to-canvas",
        className
      )}
    >
      <Car size={64} strokeWidth={1} className="text-ink/20" />
      <span className="absolute bottom-3 right-4 text-[10px] font-bold uppercase tracking-wide text-ink/30">
        {car?.make} {car?.model}
      </span>
    </div>
  );
}
