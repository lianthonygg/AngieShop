"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Banner } from "../../types/store.type";

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
                <img
                  src={image_url}
                  alt={slug}
                  className="absolute inset-0 w-full h-full object-cover object-center rounded-2xl"
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
