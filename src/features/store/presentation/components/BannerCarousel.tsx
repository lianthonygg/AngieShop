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
  return (
    <div className="w-full relative select-none pb-5">
      <Carousel
        plugins={[
          Autoplay({
            delay: 7000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
          }),
        ]}
        className="w-full overflow-hidden rounded-2xl"
      >
        <CarouselContent className="-ml-4">
          {banners.map(({ id, image_url, slug }) => (
            <CarouselItem key={id} className="pl-4 basis-full">
              <div className="relative w-full aspect-video md:aspect-[21/9] lg:aspect-[3/1]">
                <Image
                  src={image_url}
                  alt={slug}
                  fill
                  loader={supabaseLoader}
                  className="absolute inset-0 w-full h-full object-cover object-center rounded-2xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
}
