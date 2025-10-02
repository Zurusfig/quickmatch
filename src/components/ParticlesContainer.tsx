"use client";

import { SYMBOLS } from "@/logic/generate";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesContainer() {
  // this customizes the component tsParticles installation
  const particlesInit = async (main: any) => {
    await loadSlim(main);
  };

  const particleOptions = {
    fullScreen: { enable: true, zIndex: 1 },
    particles: {
      number: { value: 20 },
      shape: {
        type: "char",
        character: [
          {
            value: SYMBOLS,
            font: "Verdana",
            style: "",
            weight: "400",
          },
        ],
      },
      size: { value: 32, random: { enable: true, minimumValue: 10 } },
      opacity: { value: 0.7, random: { enable: true, minimumValue: 0.3 } },
      move: {
        enable: true,
        speed: { min: 1, max: 3 },
        direction: "none",
        outModes: { default: "out" },
      },
      links: { enable: false },
    },
    background: { color: "transparent" },
  };

  return (
    <div>
      <Particles
        className="absolute top-0 left-0 w-[100vw] h-[100vh] "
        id="tsparticles"
        init={particlesInit}
        options={particleOptions}
      />
    </div>
  );
}
