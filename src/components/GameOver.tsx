import { Particle } from "tsparticles-engine";
import ParticlesContainer from "./ParticlesContainer";

type GameOverProps = {
  score: number;
  highScore: number;
  onRestart: () => void;
};

export default function GameOver({
  score,
  highScore,
  onRestart,
}: GameOverProps) {
  return (
    <div className="flex flex-col gap-[1rem] w-[100%] justify-center items-center font-suse">
      <div>
        <h1 className="text-5xl font-black">Game Over</h1>
      </div>
      <p className="text-xl">Your Score: {score}</p>
      <p className="text-xl">High Score: {highScore}</p>
      <button
        onClick={onRestart}
        className="bg-amber-400 p-2 px-5 rounded-lg text-2xl lg:text-3xl hover:bg-amber-300 cursor-pointer hover:text-gray-700 z-10"
      >
        Play Again
      </button>
      <ParticlesContainer />
    </div>
  );
}
