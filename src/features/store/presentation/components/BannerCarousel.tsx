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
            delay: 5000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
            stopOnFocusIn: false,
          }),
        ]}
        className="w-full overflow-hidden rounded-2xl"
      >
        <CarouselContent>
          {banners.map(({ id, image_url, slug }, index) => (
            <CarouselItem key={id}>
              <div className="relative w-full aspect-[16/9] md:aspect-[21/9]">
                <Image
                  src={image_url}
                  alt={slug}
                  fill
                  loader={supabaseLoader}
                  sizes="100vw"
                  priority={index === 0}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  loading={index === 0 ? "eager" : "lazy"}
                  quality={index === 0 ? 85 : 75}
                  className="object-cover rounded-2xl"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {api && (
        <div className="flex justify-center gap-3 mt-6">
          {api.scrollSnapList().map((_, index) => (
            <button
              key={index}
              onClick={() => api.scrollTo(index)}
              className={`transition-all duration-300 rounded-full ${
                index === current
                  ? "bg-white w-10 h-3 shadow-md"
                  : "bg-white/50 w-3 h-3 hover:bg-white/70"
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
