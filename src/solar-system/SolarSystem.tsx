import { StyleSheet, View } from "react-native";
import { ORBIT_GAP, PLANET_SIZE, SUN_SIZE } from "./constants";
import { Planet } from "./Planet";
import { Sun } from "./Sun";
import { planets } from "./planets";

function getOrbitRadius(orbitIndex: number) {
  const sunRadius = SUN_SIZE / 2;
  const planetRadius = PLANET_SIZE / 2;

  return (
    sunRadius +
    ORBIT_GAP +
    planetRadius +
    orbitIndex * (PLANET_SIZE + ORBIT_GAP)
  );
}

export function SolarSystem() {
  return (
    <View style={styles.solarSystem}>
      <Sun />
      {planets.map((planet) => (
        <Planet
          key={planet.id}
          arcSpeed={planet.arcSpeed}
          radius={getOrbitRadius(planet.orbitIndex)}
          selfArcSpeed={planet.selfArcSpeed}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  solarSystem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#cfcfcf",
  },
});
