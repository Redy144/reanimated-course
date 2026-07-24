import { View, StyleSheet, LayoutChangeEvent, CursorValue } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  clamp,
  withDecay,
  cancelAnimation,
  type SharedValue,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useNavigation } from "expo-router";

const SIZE = 80;
const BOUNCE_FACTOR = 0.7;
const MIN_VELOCITY = 5;

function startDecay(
  velocity: number,
  offset: SharedValue<number>,
  size: SharedValue<number>,
) {
  "worklet";
  const min = -(size.value / 2) + SIZE / 2;
  const max = size.value / 2 - SIZE / 2;
  const start = offset.value;

  if (Math.abs(velocity) < MIN_VELOCITY) {
    return;
  }

  offset.value = withDecay({ velocity, clamp: [min, max] }, (finished) => {
    if (!finished) {
      return;
    }

    const hitWall =
      (offset.value <= min && velocity < 0) ||
      (offset.value >= max && velocity > 0);

    if (!hitWall) {
      return;
    }

    const impact =
      (offset as { _animation?: { velocity?: number } })._animation?.velocity ??
      0;
    startDecay(-impact * BOUNCE_FACTOR, offset, size);
  });
}

export default function BouncingBall() {
  const offsetX = useSharedValue<number>(0);
  const offsetY = useSharedValue<number>(0);
  const width = useSharedValue<number>(0);
  const height = useSharedValue<number>(0);

  const navigation = useNavigation();

  const setSwipeEnabled = (enabled: boolean) => {
    navigation.setOptions({ swipeEnabled: enabled });
  };

  const onLayout = (event: LayoutChangeEvent) => {
    width.value = event.nativeEvent.layout.width;
    height.value = event.nativeEvent.layout.height;
  };

  const pan = Gesture.Pan()
    .onBegin(() => {
      scheduleOnRN(setSwipeEnabled, false);
      cancelAnimation(offsetX);
      cancelAnimation(offsetY);
    })
    .onChange((event) => {
      const minX = -(width.value / 2) + SIZE / 2;
      const maxX = width.value / 2 - SIZE / 2;
      const minY = -(height.value / 2) + SIZE / 2;
      const maxY = height.value / 2 - SIZE / 2;

      offsetX.value = clamp(event.changeX + offsetX.value, minX, maxX);
      offsetY.value = clamp(event.changeY + offsetY.value, minY, maxY);
    })
    .onFinalize((event) => {
      startDecay(event.velocityX, offsetX, width);
      startDecay(event.velocityY, offsetY, height);
      scheduleOnRN(setSwipeEnabled, true);
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetX.value }, { translateY: offsetY.value }],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <View onLayout={onLayout} style={styles.wrapper}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.box, animatedStyles]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  wrapper: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: SIZE,
    width: SIZE,
    backgroundColor: "#b58df1",
    borderRadius: SIZE / 2,
    cursor: "grab" as CursorValue,
    alignItems: "center",
    justifyContent: "center",
  },
});
