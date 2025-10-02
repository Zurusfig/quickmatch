import { generateNonOverlappingPositions } from "@/logic/positionGenerator";

export const SYMBOLS = [
  // Faces (kept only distinct ones)
  "😀","😂","😍","🥳","😎","🤯","😭","😡","😱","🥶","🥵","🤢","😴","💀","👻","🥷","🧌",
  
  // Animals
  "🐶","🐱","🐭","🐹","🐰","🐻","🐼","🐨","🐯","🦁","🐮","🐷","🐸",
  "🐵","🐔","🐧","🦆","🦉","🦇","🐴","🦄","🐝","🦋","🐢","🐍","🦖","🦕","🦅","🦧","🐐",
  
  // Food
  "🍎","🍌","🍇","🍓","🍒","🍑","🍍","🥝","🍅","🥕","🌽","🥔","🥑","🥦",
  "🍔","🍟","🍕","🌭","🍗","🥩","🍣","🍤","🥟","🍜","🍝","🥪","🍦","🍩","🍪","🍫","🍭",
  
  // Plants / Nature
  "🌵","🌲","🌴","🍀","🍁","🌸","🌹","🌻","🌷","🥀","🌾","🍂",
  
  // Sports / Games
  "⚽","🏀","🏈","⚾","🎾","🏐","🏓","🥊","🎱","🎯",
  
  // Transport
  "🚗","🚕","🚌","🏎️","🚲","🏍️","✈️","🚀",
  
  // Objects (kept clear, unique icons)
  "⌚","📱","💻","📷","🎥","📺","🎧","🎤","🎹","🥁","🎸",
  "🔑","🔨","🛠️","🔧","⚙️","💡","📦","📌","✏️","📖",
  
  // Symbols / Hearts / Stars
  "❤️","💔","💖","💯","💥","💫","🔥","⭐","✨","⚡","☀️","🌙","🌈","🎉","🎁",
];

const shuffle = (array: string[]) => { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
}; 


export function generateCardPair(pool:string[] ,size: number = 8) {
    const shared = pool[Math.floor(Math.random() * pool.length)];
    const poolA = pool.filter(s => s !== shared);
    const cardAExtras = shuffle(poolA).slice(0,size-1);

    const poolB = pool.filter(s => s!==shared && !cardAExtras.includes(s));
    const cardBExtras = shuffle(poolB).slice(0,size-1);

    const cardA = createCard([...cardAExtras,shared]);
    const cardB = createCard([...cardBExtras,shared]);

    return {cardA, cardB, shared};
}

function createCard(symbols: string[]) {
    const positions = generateNonOverlappingPositions(symbols.length, 100);
      
    return symbols.map((s, i) => ({
        symbol: s,
        x: positions[i].x,
        y: positions[i].y,
        size: positions[i].size,
        rotation: Math.floor(Math.random() * 360)
    }))
}
