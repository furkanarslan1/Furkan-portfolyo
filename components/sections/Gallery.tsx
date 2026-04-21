"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

type GalleryImage = {
  id: number;
  imageUrl: string;
  imagePublicId: string;
  caption: string | null;
  order: number;
};

type Props = {
  images: GalleryImage[];
  locale: string;
};

const labels = {
  tr: { title: "Galeri", subtitle: "Fotoğraflardan kareler" },
  en: { title: "Gallery", subtitle: "Moments in photos" },
};

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="aspect-4/3 rounded-2xl bg-muted animate-pulse"
        />
      ))}
    </div>
  );
}

export default function Gallery({ images, locale }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 400);
    return () => clearTimeout(t);
  }, []);

  if (images.length === 0) return null;

  const t = labels[locale as keyof typeof labels] ?? labels.en;

  const prev = () =>
    setModalIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length,
    );
  const next = () =>
    setModalIndex((i) => (i === null ? null : (i + 1) % images.length));

  const activeImg = modalIndex !== null ? images[modalIndex] : null;

  return (
    <>
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">{t.title}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t.subtitle}</p>
          </div>

          {!loaded ? (
            <GallerySkeleton />
          ) : (
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              loop={images.length > 2}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="pb-10"
            >
              {images.map((img, idx) => (
                <SwiperSlide key={img.id}>
                  <button
                    onClick={() => setModalIndex(idx)}
                    className="w-full text-left group"
                  >
                    <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-border group-hover:border-primary/40 transition-colors">
                      <Image
                        src={img.imageUrl}
                        alt={img.caption ?? ""}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        priority={idx === 0}
                        loading={idx === 0 ? 'eager' : 'lazy'}
                      />
                    </div>
                    {img.caption && (
                      <p className="text-center text-xs text-muted-foreground mt-2">
                        {img.caption}
                      </p>
                    )}
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>

      {/* Modal */}
      {activeImg !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setModalIndex(null)}
        >
          <div
            className="relative w-full max-w-xl rounded-2xl overflow-hidden border border-border shadow-2xl bg-background"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setModalIndex(null)}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <X size={16} />
            </button>

            {/* Image */}
            <div className="relative aspect-4/3 w-full">
              <Image
                src={activeImg.imageUrl}
                alt={activeImg.caption ?? ""}
                fill
                sizes="(max-width: 640px) 100vw, 576px"
                className="object-cover"
              />
            </div>

            {/* Nav */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Caption + counter */}
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {activeImg.caption ?? ""}
              </span>
              <span className="text-xs text-muted-foreground">
                {(modalIndex ?? 0) + 1} / {images.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
