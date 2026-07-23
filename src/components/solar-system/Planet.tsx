import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";
import { BASE_ORBIT_DURATION } from "./constants";
import { Orbit } from "./Orbit";
import type { PlanetConfig } from "./planets";

export function Planet({
  index,
  planet,
  speedMultiplier,
}: {
  index: number;
  planet: PlanetConfig;
  speedMultiplier: number;
}) {
  const { arcSpeed, selfArcSpeed, size, innerColor, outerColor, orbitRadius } =
    planet;
  const radius = size / 2;
  const rotation = useSharedValue(0);
  const selfRotation = useSharedValue(0);

  useEffect(() => {
    cancelAnimation(selfRotation);
    if (speedMultiplier <= 0) return;
    selfRotation.value = withRepeat(
      withTiming(selfRotation.value + 2 * Math.PI, {
        duration: BASE_ORBIT_DURATION / (selfArcSpeed * speedMultiplier),
        easing: Easing.linear,
      }),
      -1,
    );
    return () => cancelAnimation(selfRotation);
  }, [selfArcSpeed, speedMultiplier]);

  useEffect(() => {
    cancelAnimation(rotation);
    if (speedMultiplier <= 0) return;
    rotation.value = withRepeat(
      withTiming(rotation.value + 2 * Math.PI, {
        duration: BASE_ORBIT_DURATION / (arcSpeed * speedMultiplier),
        easing: Easing.linear,
      }),
      -1,
    );
    return () => cancelAnimation(rotation);
  }, [arcSpeed, speedMultiplier]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: orbitRadius * Math.cos(rotation.value) },
      { translateY: orbitRadius * Math.sin(rotation.value) },
      { rotate: `${selfRotation.value}rad` },
    ],
  }));

  return (
    <View style={styles.orbit}>
      <Orbit radius={orbitRadius} />
      <Animated.View
        style={[
          styles.planet,
          {
            marginLeft: -radius,
            marginTop: -radius,
          },
          animatedStyle,
        ]}
      >
        <Svg width={size} height={size}>
          <Defs>
            <RadialGradient id={`planet-${index}`} cx="35%" cy="35%" r="50%">
              <Stop offset="0%" stopColor={innerColor} />
              <Stop offset="100%" stopColor={outerColor} />
            </RadialGradient>
          </Defs>
          <Circle
            cx={radius}
            cy={radius}
            r={radius}
            fill={`url(#planet-${index})`}
          />
        </Svg>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  orbit: {
    position: "absolute",
    left: "50%",
    top: "50%",
  },
  planet: {
    position: "absolute",
    zIndex: 20,
  },
});
