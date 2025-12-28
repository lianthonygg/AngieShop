import { bannersMock } from "@/src/features/store/presentation/mock/banner.mock";
import StoreView from "@/src/features/store/presentation/views/store-view";

export default async function HomePage() {
  return (
    <>
      <head>
        <link
          rel="preload"
          as="image"
          href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/render/image/public/${bannersMock[0].image_url}?width=768&resize=contain&quality=85`}
          fetchPriority="high"
        />
      </head>
      <StoreView />
    </>
  );
}
