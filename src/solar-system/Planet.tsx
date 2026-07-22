import { StyleSheet, Text } from "react-native";
import { useEffect } from "react";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { BASE_ORBIT_DURATION, PLANET_SIZE } from "./constants";

export function Planet({
  arcSpeed,
  radius,
  selfArcSpeed,
}: {
  arcSpeed: number;
  radius: number;
  selfArcSpeed: number;
}) {
  const rotation = useSharedValue(0);
  const selfRotation = useSharedValue(0);

  useEffect(() => {
    cancelAnimation(selfRotation);
    selfRotation.value = 0;
    selfRotation.value = withRepeat(
      withTiming(2 * Math.PI, {
        duration: BASE_ORBIT_DURATION / selfArcSpeed,
        easing: Easing.linear,
      }),
      -1,
    );
    return () => cancelAnimation(selfRotation);
  }, [selfArcSpeed]);

  useEffect(() => {
    cancelAnimation(rotation);
    rotation.value = 0;
    rotation.value = withRepeat(
      withTiming(2 * Math.PI, {
        duration: BASE_ORBIT_DURATION / arcSpeed,
        easing: Easing.linear,
      }),
      -1,
    );
    return () => cancelAnimation(rotation);
  }, [arcSpeed]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: radius * Math.cos(rotation.value) },
      { translateY: radius * Math.sin(rotation.value) },
      { rotate: `${selfRotation.value}rad` },
    ],
  }));

  return (
    <Animated.View style={[styles.orbit, styles.planet, animatedStyle]}>
      <Text>A</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  orbit: {
    position: "absolute",
  },
  planet: {
    width: PLANET_SIZE,
    height: PLANET_SIZE,
    borderRadius: PLANET_SIZE / 2,
    backgroundColor: "red",
  },
});
