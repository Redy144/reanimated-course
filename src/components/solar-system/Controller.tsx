import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ORBIT_COLOR } from "./constants";

const MIN_SPEED = 0;
const MAX_SPEED = 10;
const SPEED_STEP = 0.5;

function clampSpeed(speed: number) {
  return Math.min(MAX_SPEED, Math.max(MIN_SPEED, speed));
}

export function Controller({
  speed,
  setSpeed,
}: {
  speed: number;
  setSpeed: (speed: number) => void;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 12 }]}>
      <View style={styles.row}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => setSpeed(clampSpeed(speed - SPEED_STEP))}
        >
          <Text style={styles.buttonLabel}>−</Text>
        </Pressable>
        <Text style={styles.speedLabel}>{speed.toFixed(1)}×</Text>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => setSpeed(clampSpeed(speed + SPEED_STEP))}
        >
          <Text style={styles.buttonLabel}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: 12,
    backgroundColor: "rgba(13, 13, 13, 0.85)",
    borderTopWidth: 1,
    borderTopColor: ORBIT_COLOR,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: ORBIT_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.6,
  },
  buttonLabel: {
    color: "#FFFFFF",
    fontSize: 20,
    lineHeight: 22,
  },
  speedLabel: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 18,
    fontVariant: ["tabular-nums"],
    minWidth: 48,
    textAlign: "center",
  },
});
