"use client";
import dynamic from "next/dynamic";

export const DetailProductView = dynamic(
  () => import("./detail-product-view.client"),
  {
    ssr: false,
  }
);
