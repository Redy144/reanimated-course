import { StyleSheet, Text, View } from "react-native";
import Animated, {
  type AnimatedSensor,
  type Value3D,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const CARD_WIDTH = 90;
const CARD_HEIGHT = 56;
const DEFORM_FACTOR = 0.08;

const SPRING_CONFIG = {
  damping: 10,
  stiffness: 200,
};

type ImpulseCardProps = {
  accelerometer: AnimatedSensor<Value3D>;
};

export function ImpulseCard({ accelerometer }: ImpulseCardProps) {
  const impulse = useSharedValue(0);

  useAnimatedReaction(
    () => {
      const { x, y, z } = accelerometer.sensor.value;
      return Math.sqrt(x * x + y * y + z * z);
    },
    (magnitude) => {
      impulse.value = withSpring(magnitude, SPRING_CONFIG);
    },
  );

  const cardStyle = useAnimatedStyle(() => {
    const deform = impulse.value * DEFORM_FACTOR;

    return {
      transform: [
        { scaleX: 1 + deform },
        { scaleY: Math.max(1 - deform, 0.6) },
      ],
    };
  });

  return (
    <View style={styles.scene}>
      <Animated.View style={[styles.card, cardStyle]}>
        <View style={styles.badge} />
        <Text style={styles.label}>Shake</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    width: 110,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 12,
    transformOrigin: "center",
    backgroundColor: "#1A1A2E",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  badge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4ECDC4",
    marginBottom: 6,
  },
  label: {
    color: "#FFE66D",
    fontSize: 12,
    fontWeight: "600",
  },
});
