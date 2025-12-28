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
                  priority={id === banners[0].id}
                  fetchPriority={id === banners[0].id ? "high" : "auto"}
                  loading={id === banners[0].id ? "eager" : "lazy"}
                  sizes="100vw"
                  className="object-cover rounded-2xl"
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
