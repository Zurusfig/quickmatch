"use client";

import { SYMBOLS } from "@/logic/generate";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { IOptions } from "tsparticles-engine";

export default function ParticlesContainer() {
  // this customizes the component tsParticles installation
  const particlesInit = async (main: any) => {
    await loadSlim(main);
  };

  const particleOptions: IOptions = {
    fullScreen: { enable: true, zIndex: 1 },
    particles: {
      number: {
        value: 20,
        density: {
          enable: true,
          value_area: 800, 
          factor: 1000, 
          height: 0,
          width: 0,
        },
      },
      shape: {
        type: "char",
        character: [
          {
            value: SYMBOLS,
            font: "Verdana",
            style: "",
            weight: "400",
            fill: true,
          },
        ],
      },
      size: { value: 32, random: { enable: true, minimumValue: 10 } },
      opacity: { value: 0.7, random: { enable: true, minimumValue: 0.3 } },
      move: {
        enable: true,
        speed: 2,
        random: true,
        direction: "none",
        outModes: { default: "out" },
      },
      links: { enable: false },
    },
    background: { color: "transparent", mode: "default" },
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
