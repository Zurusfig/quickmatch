import { PostMiddlewareFunction } from "mongoose";

type Position = {
  x: number;
  y: number;
  size: number;
};

export function generateNonOverlappingPositions(
  count: number,
  maxRadius: number
) {
  const positions: Position[] = [];
  const maxAttempts = 100;

  for (let i = 0; i < count; i++) {
    let attempts = 0;
    let validPosition = false;
    let newPos: Position = { x: 0, y: 0, size: 0 };

    while (!validPosition && attempts < maxAttempts) {
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.sqrt(Math.random()) * maxRadius;
      const size = 24 + Math.random() * 32;
      const padding = size * 0.8;

      newPos = {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
        size: size + padding,
      };

      validPosition = positions.every(pos => {
        const distance = Math.sqrt(
            Math.pow(newPos.x - pos.x,2) + Math.pow(newPos.y - pos.y, 2)
        );
        return distance > (newPos.size + pos.size) / 2;
      });
      
      attempts++;
    }

    if (validPosition) positions.push(newPos);
  }

  return positions;
}
