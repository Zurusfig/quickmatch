"use client";

import Image from "next/image";
import Landing from "@/components/Landing";
import HUD from "@/components/HUD";
export default function Home() {
  return (
    <div className="flex font-suse items-center justify-items-center min-h-screen">
      <HUD score={0} highScore={0} timeLeft={30} />
      {/* <Landing highScore={0} onStart={() => {}} /> */}
    </div>
  );
}
