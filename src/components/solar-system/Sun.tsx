import { StyleSheet, View } from "react-native";
import Svg, {
  Circle,
  Defs,
  RadialGradient,
  Stop,
} from "react-native-svg";
import { SUN_CORONA_SCALE, SUN_SIZE } from "./constants";

const CORONA_SIZE = SUN_SIZE * SUN_CORONA_SCALE;
const CORONA_RADIUS = CORONA_SIZE / 2;
const DISC_RADIUS = SUN_SIZE / 2;
const DISC_CENTER = SUN_SIZE / 2;

const SUNSPOTS = [
  { cx: DISC_CENTER * 0.72, cy: DISC_CENTER * 0.55, r: 3 },
  { cx: DISC_CENTER * 1.18, cy: DISC_CENTER * 0.88, r: 2.5 },
];

export function Sun() {
  return (
    <View style={styles.container}>
      <Svg width={CORONA_SIZE} height={CORONA_SIZE} style={styles.corona}>
        <Defs>
          <RadialGradient id="sunCorona" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="rgba(255, 180, 50, 0.35)" />
            <Stop offset="60%" stopColor="rgba(255, 140, 0, 0.1)" />
            <Stop offset="100%" stopColor="transparent" />
          </RadialGradient>
        </Defs>
        <Circle
          cx={CORONA_RADIUS}
          cy={CORONA_RADIUS}
          r={CORONA_RADIUS}
          fill="url(#sunCorona)"
          opacity={0.3}
        />
      </Svg>

      <Svg width={SUN_SIZE} height={SUN_SIZE} style={styles.disc}>
        <Defs>
          <RadialGradient id="sunDisc" cx="45%" cy="45%" r="50%">
            <Stop offset="0%" stopColor="#FFFDE7" />
            <Stop offset="50%" stopColor="#FFD54F" />
            <Stop offset="100%" stopColor="#E65100" />
          </RadialGradient>
        </Defs>
        <Circle
          cx={DISC_CENTER}
          cy={DISC_CENTER}
          r={DISC_RADIUS}
          fill="url(#sunDisc)"
        />
        {SUNSPOTS.map((spot, index) => (
          <Circle
            key={index}
            cx={spot.cx}
            cy={spot.cy}
            r={spot.r}
            fill="#BF360C"
            opacity={0.15}
          />
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CORONA_SIZE,
    height: CORONA_SIZE,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  corona: {
    position: "absolute",
  },
  disc: {
    position: "absolute",
  },
});
