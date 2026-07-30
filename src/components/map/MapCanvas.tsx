import { StyleSheet, View } from "react-native";
import {
  Canvas,
  Circle,
  Group,
  Image,
  LinearGradient,
  Path,
  Skia,
  rect,
  vec,
  type SkImage,
} from "@shopify/react-native-skia";
import type { SharedValue } from "react-native-reanimated";
import type { SkPath } from "@shopify/react-native-skia";
import {
  cancelAnimation,
  useDerivedValue,
  useSharedValue,
  withTiming,
  withRepeat,
} from "react-native-reanimated";
import { useEffect } from "react";

const DOT_RADIUS = 4;

type MapCanvasProps = {
  width: number;
  height: number;
  image: SkImage | null;
  path: SharedValue<SkPath>;
  isPathComplete: boolean;
};

export function MapCanvas({
  width,
  height,
  image,
  path,
  isPathComplete,
}: MapCanvasProps) {
  const progress = useSharedValue(0);

  const dotCenter = useDerivedValue(() => {
    const iter = Skia.ContourMeasureIter(path.value, false, 1);
    const contour = iter.next();
    if (!contour) {
      return vec(0, 0);
    }

    const [pos] = contour.getPosTan(progress.value * contour.length());
    return vec(pos.x, pos.y);
  });

  useEffect(() => {
    if (!isPathComplete) {
      cancelAnimation(progress);
      progress.value = 0;
      return;
    }

    progress.value = withRepeat(withTiming(1, { duration: 5000 }), -1, true);

    return () => {
      cancelAnimation(progress);
    };
  }, [isPathComplete, progress]);

  if (!image) {
    return <View style={styles.container} />;
  }

  return (
    <Canvas style={{ width, height }}>
      <Group clip={rect(0, 0, width, height)}>
        <Image
          image={image}
          x={0}
          y={0}
          width={width}
          height={height}
          fit="cover"
        />
      </Group>
      <Path
        path={path}
        style="stroke"
        strokeWidth={9}
        strokeCap="round"
        strokeJoin="round"
        color="rgba(108, 99, 255, 0.2)"
      />
      {isPathComplete && (
        <>
          <Path
            path={path}
            style="stroke"
            strokeWidth={5}
            strokeCap="round"
            strokeJoin="round"
            start={0}
            end={progress}
          >
            <LinearGradient
              start={vec(width * 0.15, height * 0.15)}
              end={vec(width * 0.85, height * 0.85)}
              colors={["#8B5E3C", "#6C63FF", "#4ADE80"]}
            />
          </Path>
          <Circle c={dotCenter} r={DOT_RADIUS} color="white" />
        </>
      )}
    </Canvas>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
