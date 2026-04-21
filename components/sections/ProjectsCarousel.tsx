"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { X, ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import "swiper/css";
import "swiper/css/pagination";
import type { Locale } from "@/app/[lang]/dictionaries";

type MultiLang = { tr: string; en: string };

type Experience = {
  id: number;
  title: MultiLang;
  description: MultiLang;
  liveUrl: string | null;
  githubUrl: string | null;
};

type Props = {
  experiences: Experience[];
  locale: Locale;
};

const labels = {
  tr: {
    heading: "Proje Notlarım",
    sub: "Üzerinde çalıştığım projeler",
    readMore: "Daha fazla oku",
  },
  en: {
    heading: "Project Notes",
    sub: "Projects I have worked on",
    readMore: "Read more",
  },
};

export default function ProjectsCarousel({ experiences, locale }: Props) {
  const [modal, setModal] = useState<Experience | null>(null);

  if (experiences.length === 0) return null;

  const t = labels[locale] ?? labels.tr;

  return (
    <>
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">
              {t.heading}
            </h2>
            <p className="text-muted-foreground text-sm mt-1">{t.sub}</p>
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            loop={experiences.length > 1}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="pb-10"
          >
            {experiences.map((exp) => (
              <SwiperSlide key={exp.id}>
                <div
                  className="rounded-2xl border border-white/10 p-7 flex flex-col gap-5"
                  style={{
                    backdropFilter: "blur(20px)",
                    background: "rgba(255,255,255,0.04)",
                  }}
                >
                  <h3 className="text-xl font-semibold text-white">
                    {exp.title[locale]}
                  </h3>

                  <p className="text-white/55 text-sm leading-relaxed line-clamp-4">
                    {exp.description[locale]}
                  </p>

                  <button
                    onClick={() => setModal(exp)}
                    className="self-start text-sm text-white px-4 py-1 rounded-2xl cursor-pointer shadow-sm hover:shadow-indigo-500/50 hover:shadow-md transition-all duration-300 bg-linear-to-r from-indigo-500 to-violet-500"
                  >
                    {t.readMore}
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Modal */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setModal(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl border border-white/10 p-7 shadow-2xl"
            style={{
              backdropFilter: "blur(24px)",
              background: "rgba(15,15,30,0.85)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              <X size={15} />
            </button>

            <h3 className="text-xl font-bold text-white mb-4 pr-8">
              {modal.title[locale]}
            </h3>

            <p className="text-white/65 text-sm leading-relaxed">
              {modal.description[locale]}
            </p>

            {(modal.liveUrl || modal.githubUrl) && (
              <div className="flex gap-3 mt-2">
                {modal.liveUrl && (
                  <a
                    href={modal.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <ExternalLink size={13} /> Canlıya Git
                  </a>
                )}
                {modal.githubUrl && (
                  <a
                    href={modal.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors"
                  >
                    <SiGithub size={13} /> GitHub
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
