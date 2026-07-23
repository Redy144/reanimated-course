import { ORBIT_GAP, SUN_CORONA_SCALE, SUN_SIZE } from "./constants";

type PlanetDefinition = {
  size: number;
  arcSpeed: number;
  selfArcSpeed: number;
  innerColor: string;
  outerColor: string;
};

export type PlanetConfig = PlanetDefinition & {
  orbitRadius: number;
};

const planetDefinitions: PlanetDefinition[] = [
  {
    size: 8,
    arcSpeed: 4.15,
    selfArcSpeed: 0.1,
    innerColor: "#C9C9C9",
    outerColor: "#6B6B6B",
  },
  {
    size: 16,
    arcSpeed: 1,
    selfArcSpeed: 2,
    innerColor: "#5CACE2",
    outerColor: "#1B5E8C",
  },
  {
    size: 32,
    arcSpeed: 0.084,
    selfArcSpeed: 4.9,
    innerColor: "#E8B87A",
    outerColor: "#A0522D",
  },
];

function computeOrbitRadius(index: number, sizes: number[]) {
  const sunRadius = SUN_SIZE / 2;
  let radius = sunRadius + ORBIT_GAP + sizes[0] / 2;

  for (let i = 1; i <= index; i++) {
    radius += sizes[i - 1] / 2 + ORBIT_GAP + sizes[i] / 2;
  }

  return radius;
}

function getMaxContentRadius(planets: PlanetConfig[]) {
  const sunCoronaRadius = (SUN_SIZE * SUN_CORONA_SCALE) / 2;
  const outerPlanet = planets[planets.length - 1];

  return Math.max(
    sunCoronaRadius,
    outerPlanet.orbitRadius + outerPlanet.size / 2,
  );
}

const sizes = planetDefinitions.map((planet) => planet.size);

export const planets: PlanetConfig[] = planetDefinitions.map((planet, index) => ({
  ...planet,
  orbitRadius: computeOrbitRadius(index, sizes),
}));

export const MAX_CONTENT_RADIUS = getMaxContentRadius(planets);
