"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const banners = [
  {
    id: 1,
    imageSrc:
      "https://fanzjptylyuvwvlotopk.supabase.co/storage/v1/object/public/product-images/tecnology-banner.jpg",
    alt: "Tecnologia",
  },
  {
    id: 2,
    imageSrc:
      "https://fanzjptylyuvwvlotopk.supabase.co/storage/v1/object/public/product-images/perfumes-banner.jpg",
    alt: "Perfumeria",
  },
];

export default function BannerCarousel() {
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
          {banners.map(({ id, imageSrc, alt }) => (
            <CarouselItem key={id} className="pl-4 basis-full">
              <div className="relative w-full aspect-video md:aspect-[21/9] lg:aspect-[3/1]">
                <img
                  src={imageSrc}
                  alt={alt}
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
