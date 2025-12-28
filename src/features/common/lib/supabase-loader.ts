import { ImageLoaderProps } from "next/image";

export default function supabaseLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  return `${
    process.env.NEXT_PUBLIC_SUPABASE_URL
  }/storage/v1/render/image/public/${src}?width=${width}&resize=contain&quality=${
    quality || 80
  }`;
}
