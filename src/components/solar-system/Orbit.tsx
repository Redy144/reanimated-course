import { StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { ORBIT_COLOR, ORBIT_STROKE_WIDTH } from "./constants";

export function Orbit({ radius }: { radius: number }) {
  const center = radius + ORBIT_STROKE_WIDTH / 2;
  const size = center * 2;

  return (
    <Svg
      width={size}
      height={size}
      style={[styles.svg, { marginLeft: -center, marginTop: -center }]}
    >
      <Circle
        cx={center}
        cy={center}
        r={radius}
        stroke={ORBIT_COLOR}
        strokeWidth={ORBIT_STROKE_WIDTH}
        fill="none"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  svg: {
    position: "absolute",
  },
});
