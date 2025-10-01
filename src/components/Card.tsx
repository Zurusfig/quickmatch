import { generateNonOverlappingPositions } from "@/logic/positionGenerator";

type CardProps = {
  symbols: string[];
  onSelect: (symbol: string) => void;
};

export default function Card({ symbols, onSelect }: CardProps) {
    const positions = generateNonOverlappingPositions(symbols.length, 100);
  
    return (
    <div className="relative w-64 h-64 rounded-full bg-white shadow-lg flex justify-center items-center">
      {symbols.map((s, i) => {
        const pos = positions[i];
        if(!pos) return null;

        const rotation = Math.floor(Math.random() * 360);
        return (
          <button
            key={i}
            onClick={() => onSelect(s)}
            className="absolute cursor-pointer"
            style={{
              left: `calc(50% + ${pos.x}px)`,
              top: `calc(50% + ${pos.y}px)`,
              fontSize: `${pos.size - pos.size * 0.3}px`,
              transform: `translate(-50%,-50%) rotate(${rotation}deg)`,
            }}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}
