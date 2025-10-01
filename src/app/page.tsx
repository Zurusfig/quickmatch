"use client";

import Image from "next/image";
import Landing from "@/components/Landing";
import HUD from "@/components/HUD";
import GameOver from "@/components/GameOver";
import Card from "@/components/Card";
export default function Home() {
  const SYMBOLS = ["🍎","🍌","🍇","🍓","🍒","🥝"];
  
  return (
    <div className="flex font-suse items-center justify-items-center min-h-screen">
      {/* <HUD score={0} highScore={0} timeLeft={30} /> */}
      {/* <Landing highScore={0} onStart={() => {}} /> */}
      {/* <GameOver score={0} highScore={0} onRestart={() => {}} /> */}
      <Card symbols={SYMBOLS} onSelect={() => {}}/>
    </div>
  );
}
