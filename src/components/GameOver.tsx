"use client";
import dynamic from 'next/dynamic';

type GameOverProps = {
  score: number;
  highScore: number;
  onRestart: () => void;
};

const ParticlesContainer = dynamic(
  () => import('@/components/ParticlesContainer'),
  { ssr: false } // Crucial setting! Prevents it from running on the server
);

export default function GameOver({
  score,
  highScore,
  onRestart,
}: GameOverProps) {
  return (
    <div className="flex flex-col gap-[1rem] w-[100%] justify-center items-center z-100">
      <div>
        <h1 className="text-5xl font-black z-100">Game Over</h1>
      </div>
      <p className="text-xl z-100">Your Score: {score}</p>
      <p className="text-xl z-100">High Score: {highScore}</p>
      <button
        onClick={onRestart}
        className="bg-amber-400 p-2 px-5 rounded-lg text-2xl lg:text-3xl hover:bg-amber-300 cursor-pointer hover:text-gray-700 z-100"
      >
        Play Again
      </button>
      <ParticlesContainer/>
    </div>
  );
}
