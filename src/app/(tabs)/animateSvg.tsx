import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  withRepeat,
  useAnimatedProps,
  Easing,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { useEffect } from "react";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const SIZE = 300;
const CENTER = SIZE / 2;
const RADIUS = 80;
const POINTS = 64;

function buildPath(progress: number) {
  "worklet";

  let path = "";

  for (let i = 0; i <= POINTS; i++) {
    const t = i / POINTS;

    const lineX = CENTER - RADIUS + 2 * RADIUS * t;
    const lineY = CENTER;

    const angle = Math.PI / 2 + 2 * Math.PI * t;
    const circleX = CENTER + RADIUS * Math.cos(angle);
    const circleY = CENTER + RADIUS * Math.sin(angle);

    const x = lineX + (circleX - lineX) * progress;
    const y = lineY + (circleY - lineY) * progress;

    path += `${i === 0 ? "M" : "L"} ${x} ${y}`;
  }

  if (progress > 0.99) {
    path += "Z";
  }

  return path;
}

export default function AnimateSvg() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: 1600,
        easing: Easing.bezier(0.45, 0, 0.55, 1.0),
      }),
      -1,
      true,
    );
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    d: buildPath(progress.value),
  }));

  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <AnimatedPath
          animatedProps={animatedProps}
          stroke="#6C63FF"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0D0D0D",
  },
});
