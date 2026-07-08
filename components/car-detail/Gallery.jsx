"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Car } from "lucide-react";
import { clsx } from "@/lib/utils";
import { cloudinaryUrl } from "@/lib/cloudinary";

const PLACEHOLDER_ANGLES = ["Front 3/4", "Side Profile", "Rear 3/4", "Interior"];

export default function Gallery({ car }) {
  const images = car.galleryImages?.length ? car.galleryImages : PLACEHOLDER_ANGLES;
  const [index, setIndex] = useState(0);
  const hasRealImages = Boolean(car.galleryImages?.length);
  const current = images[index];
  const isPreviewUrl = typeof current === "string" && (current.startsWith("blob:") || current.startsWith("data:"));

  function go(delta) {
    setIndex((i) => (i + delta + images.length) % images.length);
  }

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-steel-100">
        {hasRealImages && isPreviewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={current} alt={`${car.title} — photo ${index + 1}`} className="absolute inset-0 h-full w-full object-cover" />
        ) : hasRealImages ? (
          <Image
            src={cloudinaryUrl(images[index], { width: 1600 })}
            alt={`${car.title} — photo ${index + 1}`}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-steel-100 via-canvas to-canvas">
            <Car size={80} strokeWidth={0.9} className="text-ink/20" />
            <span className="font-mono text-xs uppercase tracking-wide text-ink/30">
              {images[index]} — photography pending
            </span>
          </div>
        )}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-canvas/85 p-2 backdrop-blur transition-colors hover:bg-canvas"
            >
              <ChevronLeft size={18} strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-canvas/85 p-2 backdrop-blur transition-colors hover:bg-canvas"
            >
              <ChevronRight size={18} strokeWidth={1.75} />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`View photo ${i + 1}`}
              className={clsx(
                "h-1.5 flex-1 rounded-full transition-colors duration-300",
                i === index ? "bg-ink" : "bg-steel-200 hover:bg-steel-300"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
