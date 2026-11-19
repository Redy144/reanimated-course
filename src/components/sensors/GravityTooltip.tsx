import { StyleSheet, Text, View } from "react-native";
import Animated, {
  type AnimatedSensor,
  type Value3D,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

const ARM_LENGTH = 34;
const PIVOT_SIZE = 8;

type GravityTooltipProps = {
  gravity: AnimatedSensor<Value3D>;
};

export function GravityTooltip({ gravity }: GravityTooltipProps) {
  const tiltAngle = useDerivedValue(() =>
    Math.atan2(gravity.sensor.value.x, gravity.sensor.value.y),
  );

  const pendulumStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${tiltAngle.value}rad` }],
  }));

  return (
    <View style={styles.scene}>
      <View style={styles.pivot} />
      <Animated.View style={[styles.pendulum, pendulumStyle]}>
        <View style={styles.arm} />
        <View style={styles.tooltip}>
          <Text style={styles.tooltipText}>Level</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    width: 110,
    height: 90,
    alignItems: "center",
  },
  pivot: {
    width: PIVOT_SIZE,
    height: PIVOT_SIZE,
    borderRadius: PIVOT_SIZE / 2,
    backgroundColor: "#1A1A2E",
    zIndex: 1,
  },
  pendulum: {
    alignItems: "center",
    transformOrigin: "top center",
  },
  arm: {
    width: 2,
    height: ARM_LENGTH,
    backgroundColor: "#1A1A2E",
    borderRadius: 1,
  },
  tooltip: {
    marginTop: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: "#1A1A2E",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  tooltipText: {
    color: "#4ECDC4",
    fontSize: 12,
    fontWeight: "600",
  },
});
