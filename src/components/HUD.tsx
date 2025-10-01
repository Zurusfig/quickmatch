type HUDProps = {
    score: number;
    highScore: number;
    timeLeft: number;
}

export default function HUD({ score, highScore, timeLeft }: HUDProps) {
  return (
    <div className="flex gap-[1rem] w-[100%] justify-evenly items-center">
      <div className="text-sm font sm:text-md md:text-lg lg:text-xl">Score: {score}</div>
      <div className="text-md font p-3 bg-amber-400 rounded-lg sm:text-lg md:text-xl lg:text-2xl">Time Left: {timeLeft}</div>
      <div className="text-sm font sm:text-md md:text-lg lg:text-xl">High Score: {highScore}</div>
    </div>
  );
}