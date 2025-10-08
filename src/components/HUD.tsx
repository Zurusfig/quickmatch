type HUDProps = {
    score: number;
    highScore: number;
    timeLeft: number;
    scoreRef: React.RefObject<HTMLDivElement>;
}


export default function HUD({ score, highScore, timeLeft, scoreRef }: HUDProps) {
  return (
    <div className="flex gap-[1rem] w-[100%] justify-between items-center">
      <div className="text-sm font sm:text-md md:text-lg lg:text-xl w-[25%] text-center" ref={scoreRef}><p>Score:</p> {score}</div>
      <div className="text-md font p-3 bg-amber-400 rounded-lg sm:text-lg md:text-xl lg:text-2xl w-[50%] text-center"><p>Time Left:</p> {timeLeft}</div>
      <div className="text-sm font sm:text-md md:text-lg lg:text-xl w-[25%] text-center"><p>High Score:</p> {highScore}</div>
    </div>
  );
}