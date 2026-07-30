import { StyleSheet, View, useWindowDimensions } from "react-native";
import {
  Canvas,
  Image,
  useImage,
  Path,
  vec,
  LinearGradient,
} from "@shopify/react-native-skia";
import { useEffect, useMemo } from "react";
import {
  useSharedValue,
  withTiming,
  withRepeat,
} from "react-native-reanimated";

export default function Map() {
  const { width, height } = useWindowDimensions();
  const image = useImage(require("@/assets/map.png"));
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 5000 }), -1, false);
  }, [progress]);

  const routePath = useMemo(() => {
    const p = (x: number, y: number) => `${x * width},${y * height}`;
    return `
      M ${p(0.24, 0.78)}
      C ${p(0.14, 0.72)}, ${p(0.1, 0.6)}, ${p(0.18, 0.52)}
      C ${p(0.26, 0.44)}, ${p(0.38, 0.4)}, ${p(0.48, 0.34)}
      C ${p(0.58, 0.28)}, ${p(0.66, 0.3)}, ${p(0.62, 0.38)}
      C ${p(0.56, 0.46)}, ${p(0.5, 0.52)}, ${p(0.54, 0.6)}
      C ${p(0.58, 0.68)}, ${p(0.48, 0.72)}, ${p(0.38, 0.74)}
      C ${p(0.3, 0.76)}, ${p(0.26, 0.78)}, ${p(0.24, 0.78)}
      Z
    `;
  }, [width, height]);

  if (!image) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <Canvas style={{ width, height }}>
        <Image
          image={image}
          x={0}
          y={0}
          width={width}
          height={height}
          fit="cover"
        />
        <Path
          path={routePath}
          style="stroke"
          strokeWidth={9}
          strokeCap="round"
          strokeJoin="round"
          color="rgba(108, 99, 255, 0.2)"
        />
        <Path
          path={routePath}
          style="stroke"
          strokeWidth={5}
          strokeCap="round"
          strokeJoin="round"
          end={progress}
        >
          <LinearGradient
            start={vec(width * 0.24, height * 0.78)}
            end={vec(width * 0.62, height * 0.3)}
            colors={["#8B5E3C", "#6C63FF", "#4ADE80"]}
          />
        </Path>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
