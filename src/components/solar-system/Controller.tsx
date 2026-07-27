import type { ComponentProps, Dispatch, SetStateAction } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";
import { ORBIT_COLOR } from "./constants";

const MIN_SPEED = 0;
const MAX_SPEED = 10;
const SPEED_STEP = 0.5;

function clampSpeed(speed: number) {
  return Math.min(MAX_SPEED, Math.max(MIN_SPEED, speed));
}

function ControlButton({
  onPress,
  name,
  style,
}: {
  onPress: () => void;
  name: ComponentProps<typeof SymbolView>["name"];
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}
    >
      <SymbolView name={name} size={22} tintColor="#FFFFFF" />
    </Pressable>
  );
}

export function Controller({
  speed,
  setSpeed,
  resetPitch,
}: {
  speed: number;
  setSpeed: Dispatch<SetStateAction<number>>;
  resetPitch: () => void;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 12 }]}>
      <View style={styles.row}>
        <ControlButton
          name={{
            ios: "arrow.clockwise",
            android: "refresh",
            web: "refresh",
          }}
          onPress={resetPitch}
          style={styles.resetButton}
        />
        <View style={styles.speedControls}>
          <ControlButton
            name={{ ios: "minus", android: "remove", web: "remove" }}
            onPress={() =>
              setSpeed((current) => clampSpeed(current - SPEED_STEP))
            }
          />
          <Text style={styles.speedLabel}>{speed.toFixed(1)}×</Text>
          <ControlButton
            name={{ ios: "plus", android: "add", web: "add" }}
            onPress={() =>
              setSpeed((current) => clampSpeed(current + SPEED_STEP))
            }
          />
        </View>
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
    paddingHorizontal: 16,
  },
  resetButton: {
    position: "absolute",
    left: 16,
  },
  speedControls: {
    flexDirection: "row",
    alignItems: "center",
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
  speedLabel: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 18,
    fontVariant: ["tabular-nums"],
    minWidth: 48,
    textAlign: "center",
  },
});
