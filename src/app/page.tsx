"use client";

import Image from "next/image";
import Landing from "@/components/Landing";
import HUD from "@/components/HUD";
import GameOver from "@/components/GameOver";
import Card from "@/components/Card";
import { generateCardPair, SYMBOLS } from "@/logic/generate";
import { useState, useEffect, useRef, RefObject } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [highScore, setHighScore] = useState(0);
  const scoreRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"landing" | "playing" | "ended">(
    "landing"
  );
  const [cardPair, setCardPair] = useState(generateCardPair(SYMBOLS, 8));

  const { data: session } = useSession();

  useEffect(() => {
    if (phase !== "playing") return;
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setPhase("ended");
          clearInterval(id);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [phase]);

  function handlePick(symbol: string) {
    if (symbol === cardPair.shared) {
      setScore((s) => s + 1);
      setCardPair(generateCardPair(SYMBOLS, 8));
    } else {
      setScore(s => Math.max(0, s - 1));
      scoreRef.current?.classList.add("animate-wiggle");
      setTimeout(() => {
        scoreRef.current?.classList.remove("animate-wiggle");
      }, 500);
    }
  }

  function restartGame() {
    setScore(0);
    setTimeLeft(60);
    setCardPair(generateCardPair(SYMBOLS, 8));
    setPhase("playing");
  }

  useEffect(() => {
    const saved = sessionStorage.getItem("highScore");
    const fetchHighScore = async () => {
      const res = await fetch("api/score");
      const data = await res.json();
      setHighScore(data.highScore);
    }
    fetchHighScore();
    if (saved && Number(saved) > highScore) setHighScore(Number(saved));
  }, []);

  useEffect(() => {
    if (phase === "ended" && score > highScore) {
      setHighScore(score);
      sessionStorage.setItem("highScore", String(score));
      if (session?.user) {
        fetch("/api/score", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ score })
        }).then(res => {
          if (res.ok) {
            console.log("Score saved!")
          }
        })
      }
    }
  }, [phase]);

  if (phase === "landing")
    return <Landing highScore={highScore} onStart={restartGame} />;
  if (phase === "ended")
    return (
      <GameOver score={score} highScore={highScore} onRestart={restartGame} />
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-row">
        <HUD score={score} highScore={highScore} timeLeft={timeLeft} scoreRef={scoreRef as RefObject<HTMLDivElement>} />
        {/* <Landing highScore={0} onStart={() => {}} /> */}
        {/* <GameOver score={0} highScore={0} onRestart={() => {}} /> */}
      </div>
      <div className="flex flex-col gap-4 mt-6">
        <Card symbols={cardPair.cardA} onSelect={handlePick} />
        <Card symbols={cardPair.cardB} onSelect={handlePick} />
      </div>
    </div>
  );
}
