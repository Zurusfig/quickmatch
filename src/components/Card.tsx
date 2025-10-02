import { generateNonOverlappingPositions } from "@/logic/positionGenerator";

type CardProps = {
  symbols: {symbol: string; x: number; y: number; size: number; rotation: number}[];
  onSelect: (symbol: string) => void;
};

export default function Card({ symbols, onSelect }: CardProps) {
    const positions = generateNonOverlappingPositions(symbols.length, 100);
  
    return (
    <div className="relative w-64 h-64 rounded-full bg-white shadow-lg flex justify-center items-center">
      {symbols.map((s, i) => {
        return (
          <button
            key={i}
            onClick={() => onSelect(s.symbol)}
            className="absolute cursor-pointer"
            style={{
              left: `calc(50% + ${s.x}px)`,
              top: `calc(50% + ${s.y}px)`,
              fontSize: `${s.size - s.size * 0.3}px`,
              transform: `translate(-50%,-50%) rotate(${s.rotation}deg)`,
            }}
          >
            {s.symbol}
          </button>
        );
      })}
    </div>
  );
}
