"use client";
import BottomBar from "@/src/features/common/presentation/components/BottomBar";
import { PageTransition } from "@/src/presentation/common/components/PageTransition";
import React from "react";

function FavoritesPage() {
  return (
    <div>
      <PageTransition />
      <BottomBar />
    </div>
  );
}

export default FavoritesPage;
