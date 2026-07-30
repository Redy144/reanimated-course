import { StyleSheet, View } from "react-native";
import {
  Canvas,
  Group,
  Image,
  LinearGradient,
  Path,
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

const DOT_TRIM = 0.008;

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

  const dotStart = useDerivedValue(() =>
    Math.max(0, progress.value - DOT_TRIM),
  );

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
          <Path
            path={path}
            style="stroke"
            strokeWidth={8}
            strokeCap="round"
            color="white"
            start={dotStart}
            end={progress}
          />
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
