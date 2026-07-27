import { StyleSheet } from "react-native";
import Animated, {
  type SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { ORBIT_COLOR, ORBIT_STROKE_WIDTH } from "./constants";
import { MAX_CONTENT_RADIUS, planets } from "./planets";

const CONTENT_DIAMETER = MAX_CONTENT_RADIUS * 2;
const HALF_CONTENT = CONTENT_DIAMETER / 2;

type Side = "far" | "near";

function showTopFor(side: Side, pitch: number) {
  "worklet";
  const topIsFar = pitch < 0;
  return side === "far" ? topIsFar : !topIsFar;
}

export function Orbit({
  pitch,
  side,
}: {
  pitch: SharedValue<number>;
  side: Side;
}) {
  const clipStyle = useAnimatedStyle(() => ({
    top: showTopFor(side, pitch.value) ? 0 : HALF_CONTENT,
  }));

  const orbitPlaneStyle = useAnimatedStyle(() => ({
    top: showTopFor(side, pitch.value) ? HALF_CONTENT : 0,
    transform: [{ scaleY: Math.cos((pitch.value * Math.PI) / 180) }],
  }));

  return (
    <Animated.View style={[styles.clip, clipStyle]} pointerEvents="none">
      <Animated.View style={[styles.orbitPlane, orbitPlaneStyle]}>
        <Svg
          width={CONTENT_DIAMETER}
          height={CONTENT_DIAMETER}
          style={styles.svg}
        >
          {planets.map((planet, index) => (
            <Circle
              key={index}
              cx={HALF_CONTENT}
              cy={HALF_CONTENT}
              r={planet.orbitRadius}
              stroke={ORBIT_COLOR}
              strokeWidth={ORBIT_STROKE_WIDTH}
              fill="none"
            />
          ))}
        </Svg>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
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
  svg: {
    position: "absolute",
    marginLeft: -HALF_CONTENT,
    marginTop: -HALF_CONTENT,
  },
});
