import { StyleSheet, View } from "react-native";
import {
  Blur,
  Canvas,
  Group,
  Paint,
  RoundedRect,
  vec,
} from "@shopify/react-native-skia";
import {
  type AnimatedSensor,
  type Value3D,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const SCENE_WIDTH = 110;
const SCENE_HEIGHT = 90;
const BAR_WIDTH = 80;
const BAR_HEIGHT = 14;
const BAR_GAP = 8;
const BAR_RADIUS = 7;
const BAR_X = (SCENE_WIDTH - BAR_WIDTH) / 2;
const CENTER_X = SCENE_WIDTH / 2;
const CENTER_Y = SCENE_HEIGHT / 2;

const STRETCH_FACTOR = 0.06;
const BLUR_FACTOR = 1.2;
const MAX_BLUR = 10;

const SPRING_CONFIG = {
  damping: 10,
  stiffness: 200,
};

const STACK_HEIGHT = BAR_HEIGHT * 3 + BAR_GAP * 2;
const TOP_BAR_Y = (SCENE_HEIGHT - STACK_HEIGHT) / 2;
const CENTER_BAR_Y = TOP_BAR_Y + BAR_HEIGHT + BAR_GAP;
const BOTTOM_BAR_Y = CENTER_BAR_Y + BAR_HEIGHT + BAR_GAP;

type GyroMotionBlurProps = {
  gyroscope: AnimatedSensor<Value3D>;
};

export function GyroMotionBlur({ gyroscope }: GyroMotionBlurProps) {
  const speed = useSharedValue(0);

  useAnimatedReaction(
    () => {
      const { x, y, z } = gyroscope.sensor.value;
      return Math.sqrt(x * x + y * y + z * z);
    },
    (magnitude) => {
      speed.value = withSpring(magnitude, SPRING_CONFIG);
    },
  );

  const blur = useDerivedValue(() =>
    Math.min(speed.value * BLUR_FACTOR, MAX_BLUR),
  );

  const groupTransform = useDerivedValue(() => {
    const { x, y } = gyroscope.sensor.value;
    return [
      { scaleX: 1 + Math.abs(y) * STRETCH_FACTOR },
      { scaleY: 1 + Math.abs(x) * STRETCH_FACTOR },
    ];
  });

  return (
    <View style={styles.scene}>
      <Canvas style={styles.canvas}>
        <Group
          layer={
            <Paint>
              <Blur blur={blur} />
            </Paint>
          }
          transform={groupTransform}
          origin={vec(CENTER_X, CENTER_Y)}
        >
          <RoundedRect
            x={BAR_X}
            y={TOP_BAR_Y}
            width={BAR_WIDTH}
            height={BAR_HEIGHT}
            r={BAR_RADIUS}
            color="rgba(78, 205, 196, 0.55)"
          />
          <RoundedRect
            x={BAR_X}
            y={BOTTOM_BAR_Y}
            width={BAR_WIDTH}
            height={BAR_HEIGHT}
            r={BAR_RADIUS}
            color="rgba(78, 205, 196, 0.55)"
          />
        </Group>

        <Group transform={groupTransform} origin={vec(CENTER_X, CENTER_Y)}>
          <RoundedRect
            x={BAR_X}
            y={CENTER_BAR_Y}
            width={BAR_WIDTH}
            height={BAR_HEIGHT}
            r={BAR_RADIUS}
            color="#FFE66D"
          />
        </Group>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    width: SCENE_WIDTH,
    height: SCENE_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  canvas: {
    width: SCENE_WIDTH,
    height: SCENE_HEIGHT,
  },
});
