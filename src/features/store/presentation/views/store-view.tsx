"use client";
import dynamic from "next/dynamic";

export const StoreView = dynamic(() => import("./store-view.client"), { ssr: false });
