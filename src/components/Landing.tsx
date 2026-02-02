"use client";
import dynamic from 'next/dynamic';
import NavBar from './NavBar';
type LandingProps = {
  highScore: number;
  onStart: () => void;
};

const ParticlesContainer = dynamic(
  () => import('@/components/ParticlesContainer'),
  { ssr: false }
);

export default function Landing({ highScore, onStart }: LandingProps) {

  return (
    <>
      <NavBar />
      <div className="flex flex-col gap-[1rem] w-[100%] justify-center items-center">
        <div>
          <h1 className="text-5xl font-black z-100">QuickMatcH</h1>
        </div>
        <div className="text-2xl font z-100">High Score: {highScore}</div>
        <button
          onClick={onStart}
          className="bg-amber-400 p-2 w-[20%] rounded-lg text-xl hover:bg-amber-300 cursor-pointer hover:text-gray-700 z-100"
        >
          Start
        </button>
        <p className="text-grey-700 text-sm text-center z-100">
          Find the matching symbols.{" "}
          <span className="block sm:inline">
            Score as much as you can in 60s!
          </span>
        </p>
        <p className="text-grey-700 text-xs text-center z-100">Created by Zagif.</p>
        <ParticlesContainer />
      </div>
    </>
  );
}
