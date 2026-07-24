import { useEffect, useMemo, useState } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import { Orbit } from "./Orbit";
import { Planet } from "./Planet";
import { SunCorona, SunDisc } from "./Sun";
import { MAX_CONTENT_RADIUS, planets } from "./planets";
import { Starfield } from "./Starfield";
import { Controller } from "./Controller";
import { BASE_ORBIT_DURATION } from "./constants";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  cancelAnimation,
  clamp,
  Easing,
  makeMutable,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const CONTENT_PADDING = 16;
const CONTENT_DIAMETER = MAX_CONTENT_RADIUS * 2;
const HALF_CONTENT = CONTENT_DIAMETER / 2;
const MAX_PITCH_DEG = 90;

function Orbits({
  pitch,
  side,
}: {
  pitch: SharedValue<number>;
  side: "far" | "near";
}) {
  const orbitPlaneStyle = useAnimatedStyle(() => {
    const topIsFar = pitch.value < 0;
    const showTop = side === "far" ? topIsFar : !topIsFar;
    return {
      top: showTop ? HALF_CONTENT : 0,
      transform: [{ scaleY: Math.cos((pitch.value * Math.PI) / 180) }],
    };
  });

  return (
    <Animated.View style={[styles.orbitPlane, orbitPlaneStyle]}>
      {planets.map((planet, index) => (
        <Orbit key={index} radius={planet.orbitRadius} />
      ))}
    </Animated.View>
  );
}

function OrbitLayer({
  pitch,
  side,
}: {
  pitch: SharedValue<number>;
  side: "far" | "near";
}) {
  const clipStyle = useAnimatedStyle(() => {
    const topIsFar = pitch.value < 0;
    const showTop = side === "far" ? topIsFar : !topIsFar;
    return {
      top: showTop ? 0 : HALF_CONTENT,
    };
  });

  return (
    <Animated.View style={[styles.clip, clipStyle]} pointerEvents="none">
      <Orbits pitch={pitch} side={side} />
    </Animated.View>
  );
}

function Planets({
  layer,
  motions,
  pitch,
}: {
  layer: "far" | "near";
  motions: ReturnType<typeof createPlanetMotions>;
  pitch: SharedValue<number>;
}) {
  const ordered =
    layer === "far"
      ? [...planets].map((planet, index) => ({ planet, index })).reverse()
      : planets.map((planet, index) => ({ planet, index }));

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {ordered.map(({ planet, index }) => (
        <Planet
          key={`planet-${layer}-${index}`}
          index={index}
          layer={layer}
          planet={planet}
          pitch={pitch}
          rotation={motions[index].rotation}
          selfRotation={motions[index].selfRotation}
        />
      ))}
    </View>
  );
}

function createPlanetMotions() {
  return planets.map(() => ({
    rotation: makeMutable(0),
    selfRotation: makeMutable(0),
  }));
}

export function SolarSystem() {
  const [scale, setScale] = useState(1);
  const [speed, setSpeed] = useState(1);
  const pitch = useSharedValue(0);
  const motions = useMemo(() => createPlanetMotions(), []);

  useEffect(() => {
    motions.forEach((motion, index) => {
      const { arcSpeed, selfArcSpeed } = planets[index];

      cancelAnimation(motion.rotation);
      cancelAnimation(motion.selfRotation);

      if (speed <= 0) return;

      motion.rotation.value = withRepeat(
        withTiming(motion.rotation.value + 2 * Math.PI, {
          duration: BASE_ORBIT_DURATION / (arcSpeed * speed),
          easing: Easing.linear,
        }),
        -1,
      );
      motion.selfRotation.value = withRepeat(
        withTiming(motion.selfRotation.value + 2 * Math.PI, {
          duration: BASE_ORBIT_DURATION / (selfArcSpeed * speed),
          easing: Easing.linear,
        }),
        -1,
      );
    });

    return () => {
      motions.forEach((motion) => {
        cancelAnimation(motion.rotation);
        cancelAnimation(motion.selfRotation);
      });
    };
  }, [motions, speed]);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    const availableRadius = Math.min(width, height) / 2 - CONTENT_PADDING;
    setScale(Math.min(1, availableRadius / MAX_CONTENT_RADIUS));
  };

  const pan = Gesture.Pan()
    .maxPointers(1)
    .onChange((event) => {
      pitch.value = clamp(
        pitch.value + event.changeY,
        -MAX_PITCH_DEG,
        MAX_PITCH_DEG,
      );
    });

  return (
    <GestureHandlerRootView style={styles.root} onLayout={onLayout}>
      <Controller
        speed={speed}
        setSpeed={setSpeed}
        resetPitch={() => {
          pitch.value = 0;
        }}
      />
      <Starfield />
      <GestureDetector gesture={pan}>
        <View style={[styles.content, { transform: [{ scale }] }]}>
          <SunCorona />

          <OrbitLayer pitch={pitch} side="far" />
          <Planets layer="far" motions={motions} pitch={pitch} />

          <SunDisc />

          <OrbitLayer pitch={pitch} side="near" />
          <Planets layer="near" motions={motions} pitch={pitch} />
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0D0D0D",
  },
  content: {
    width: CONTENT_DIAMETER,
    height: CONTENT_DIAMETER,
    justifyContent: "center",
    alignItems: "center",
  },
  clip: {
    position: "absolute",
    left: 0,
    width: CONTENT_DIAMETER,
    height: HALF_CONTENT,
    overflow: "hidden",
  },
  orbitPlane: {
    position: "absolute",
    left: "50%",
  },
});
