"use client";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/src/features/common/presentation/components/ui/carousel";
import supabaseLoader from "../../../common/lib/supabase-loader";
import { Banner } from "@/src/features/common/domain/types/common.types";
import { useCallback, useEffect, useState } from "react";

export default function BannerCarousel({ banners }: { banners: Banner[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const handleSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    api.on("select", handleSelect);
    return () => {
      api.off("select", handleSelect);
    };
  }, [api, handleSelect]);

  return (
    <div className="w-full relative select-none pb-5">
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 8000,
            stopOnInteraction: true,
          }),
        ]}
        // bg-gray-100 sirve de "placeholder" visual instantáneo
        className="w-full overflow-hidden rounded-2xl bg-gray-100"
      >
        <CarouselContent>
          {banners.map(({ id, image_url, slug, category }, index) => {
            const isFirst = index === 0;
            return (
              <CarouselItem key={id}>
                <div className="relative w-full aspect-[16/9] md:aspect-[21/9]">
                  <Image
                    src={`product-images/${image_url ?? `${slug}.avif`}`}
                    alt={slug}
                    fill
                    loader={supabaseLoader}
                    // Optimizamos sizes: 100vw en móvil, máximo 1200px en desktop
                    sizes="(max-width: 768px) 100vw, 1200px"
                    priority={isFirst}
                    // Bajamos un poco la calidad en móviles para ganar velocidad
                    quality={isFirst ? 85 : 70}
                    className="object-cover rounded-2xl"
                    // Forzamos al navegador a darle máxima prioridad
                    {...(isFirst && { fetchPriority: "high" })}
                  />
                  <span className="absolute bottom-3 left-3 backdrop-blur-sm bg-opacity-50 text-black px-3 py-1 rounded-md text-sm">
                    {category}
                  </span>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        {/* Ocultamos flechas en móvil para una UI más limpia y menos nodos en el DOM */}
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>

      {/* Indicadores de puntos (Paginación) */}
      <div className="flex justify-center gap-2 mt-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`h-2 transition-all duration-300 rounded-full ${
              index === current ? "bg-gray-300 w-6" : "bg-gray-200 w-2"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
