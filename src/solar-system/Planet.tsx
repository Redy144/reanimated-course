import { StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
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
  // const rotation = useSharedValue(0);
  // const selfRotation = useSharedValue(0);

  // useEffect(() => {
  //   cancelAnimation(selfRotation);
  //   selfRotation.value = 0;
  //   selfRotation.value = withRepeat(
  //     withTiming(2 * Math.PI, {
  //       duration: BASE_ORBIT_DURATION / selfArcSpeed,
  //       easing: Easing.linear,
  //     }),
  //     -1,
  //   );
  //   return () => cancelAnimation(selfRotation);
  // }, [selfArcSpeed]);

  // useEffect(() => {
  //   cancelAnimation(rotation);
  //   rotation.value = 0;
  //   rotation.value = withRepeat(
  //     withTiming(2 * Math.PI, {
  //       duration: BASE_ORBIT_DURATION / arcSpeed,
  //       easing: Easing.linear,
  //     }),
  //     -1,
  //   );
  //   return () => cancelAnimation(rotation);
  // }, [arcSpeed]);

  // const animatedStyle = useAnimatedStyle(() => ({
  //   transform: [
  //     { rotate: `${rotation.value}rad` },
  //     { translateX: radius },
  //     { rotate: `${selfRotation.value}rad` },
  //   ],
  // }));

  const orbitSpin = {
    from: { transform: [{ rotate: "0deg" }] },
    to: { transform: [{ rotate: "360deg" }] },
  };

  const planetSpin = (radius: number) => ({
    from: { transform: [{ translateX: radius }, { rotate: "0deg" }] },
    to: { transform: [{ translateX: radius }, { rotate: "360deg" }] },
  });

  return (
    // <Animated.View style={[styles.orbit, styles.planet, animatedStyle]}>
    <Animated.View
      style={[
        styles.orbit,
        {
          animationName: orbitSpin,
          animationDuration: BASE_ORBIT_DURATION / arcSpeed,
          animationIterationCount: "infinite",
          animationTimingFunction: "linear",
        },
      ]}
    >
      <Animated.View
        style={[
          styles.planet,
          {
            animationName: planetSpin(radius),
            animationDuration: BASE_ORBIT_DURATION / selfArcSpeed,
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
          },
        ]}
      >
        <Text>A</Text>
      </Animated.View>
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
