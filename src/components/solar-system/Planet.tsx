import { StyleSheet } from "react-native";
import Animated, {
  type SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";
import type { PlanetConfig } from "./planets";
import { ORBIT_STROKE_WIDTH } from "./constants";

export function Planet({
  index,
  layer,
  planet,
  pitch,
  rotation,
  selfRotation,
}: {
  index: number;
  layer: "far" | "near";
  planet: PlanetConfig;
  pitch: SharedValue<number>;
  rotation: SharedValue<number>;
  selfRotation: SharedValue<number>;
}) {
  const { size, innerColor, outerColor, orbitRadius } = planet;
  const radius = size / 2;
  const gradientId = `planet-${layer}-${index}`;

  const animatedStyle = useAnimatedStyle(() => {
    const depth =
      pitch.value >= 0 ? Math.sin(rotation.value) : -Math.sin(rotation.value);
    const pitchScale = Math.abs(Math.cos((pitch.value * Math.PI) / 180));
    const clearance = planet.size / 2 + ORBIT_STROKE_WIDTH + 2;
    const margin = clearance / (orbitRadius * Math.max(pitchScale, 0.2));
    const onFarSide = depth >= margin;
    const visible = layer === "far" ? onFarSide : !onFarSide;

    return {
      opacity: visible ? 1 : 0,
      transform: [
        { translateX: orbitRadius * Math.cos(rotation.value) },
        {
          translateY:
            orbitRadius *
            Math.sin(rotation.value) *
            Math.cos((pitch.value * Math.PI) / 180),
        },
        { rotate: `${selfRotation.value}rad` },
      ],
    };
  });

  return (
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
          <RadialGradient id={gradientId} cx="35%" cy="35%" r="50%">
            <Stop offset="0%" stopColor={innerColor} />
            <Stop offset="100%" stopColor={outerColor} />
          </RadialGradient>
        </Defs>
        <Circle
          cx={radius}
          cy={radius}
          r={radius}
          fill={`url(#${gradientId})`}
        />
      </Svg>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  planet: {
    position: "absolute",
    left: "50%",
    top: "50%",
  },
});
