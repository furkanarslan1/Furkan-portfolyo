'use client'

import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

export default function ImageSlider({ images, alt }: { images: string[]; alt: string }) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {images.map((src, i) => (
          <CarouselItem key={i}>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
              <Image src={src} alt={`${alt} ${i + 1}`} fill sizes="100vw" className="object-cover" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-3 bg-white/10 border-white/20 text-white hover:bg-white/20" />
      <CarouselNext className="right-3 bg-white/10 border-white/20 text-white hover:bg-white/20" />
    </Carousel>
  )
}