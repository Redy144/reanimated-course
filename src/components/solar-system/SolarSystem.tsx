import { useCallback, useState } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import { Planet } from "./Planet";
import { Sun } from "./Sun";
import { MAX_CONTENT_RADIUS, planets } from "./planets";
import { Starfield } from "./Starfield";
import { Controller } from "./Controller";

const CONTENT_PADDING = 16;
const CONTENT_DIAMETER = MAX_CONTENT_RADIUS * 2;

export function SolarSystem() {
  const [scale, setScale] = useState(1);
  const [speed, setSpeed] = useState(1);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    const availableRadius = Math.min(width, height) / 2 - CONTENT_PADDING;

    setScale(Math.min(1, availableRadius / MAX_CONTENT_RADIUS));
  }, []);

  return (
    <View style={styles.solarSystem} onLayout={onLayout}>
      <Controller speed={speed} setSpeed={setSpeed} />
      <Starfield />
      <View
        style={[
          styles.content,
          {
            width: CONTENT_DIAMETER,
            height: CONTENT_DIAMETER,
            transform: [{ scale }],
          },
        ]}
      >
        <Sun />
        {planets.map((planet, index) => (
          <Planet
            key={index}
            index={index}
            planet={planet}
            speedMultiplier={speed}
          />
        ))}
      </View>
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
    backgroundColor: "#0D0D0D",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
});
