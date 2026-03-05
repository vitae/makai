"use client";

import dynamic from "next/dynamic";

const BackgroundScene = dynamic(() => import("@/components/BackgroundScene"), {
  ssr: false,
});

export default BackgroundScene;
