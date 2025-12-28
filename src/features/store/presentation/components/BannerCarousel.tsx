"use client";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/features/common/presentation/components/ui/carousel";
import supabaseLoader from "../../../common/lib/supabase-loader";
import { Banner } from "@/src/features/common/domain/types/common.types";

export default function BannerCarousel({ banners }: { banners: Banner[] }) {
  const firstBanner = banners[0];
  const restBanners = banners.slice(1);

  return (
    <div className="w-full relative select-none pb-5">
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
          }),
        ]}
        className="w-full h-[280px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-2xl"
      >
        <CarouselContent className="w-full h-full">
          <CarouselItem className="basis-full w-full h-full flex-shrink-0">
            <div className="w-full h-full relative rounded-2xl overflow-hidden">
              <Image
                src={firstBanner.image_url}
                alt={firstBanner.slug}
                fill
                loader={supabaseLoader}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                priority={true}
                fetchPriority="high"
                quality={85}
                className="object-cover w-full h-full"
                placeholder="blur"
              />
            </div>
          </CarouselItem>

          {restBanners.map(({ id, image_url, slug }) => (
            <CarouselItem
              key={id}
              className="basis-full w-full h-full flex-shrink-0"
            >
              <div className="w-full h-full relative rounded-2xl overflow-hidden">
                <Image
                  src={image_url}
                  alt={slug}
                  fill
                  loader={supabaseLoader}
                  sizes="100vw"
                  loading="lazy"
                  fetchPriority="low"
                  quality={75}
                  className="object-cover w-full h-full"
                  placeholder="blur"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-3 h-12 w-12 -mt-6" />
        <CarouselNext className="right-3 h-12 w-12 -mt-6" />
      </Carousel>

      <div className="flex justify-center gap-2 mt-3">
        <div className="w-2 h-2 bg-white/50 rounded-full" />
        <div className="w-2 h-2 bg-white rounded-full" />
        {restBanners.length > 1 && (
          <div className="w-2 h-2 bg-white/50 rounded-full" />
        )}
      </div>
    </div>
  );
}
