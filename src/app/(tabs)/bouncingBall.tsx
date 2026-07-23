import { View, StyleSheet, LayoutChangeEvent, CursorValue } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useFrameCallback,
  clamp,
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
const FRICTION = 0.99;
const MIN_VELOCITY = 5;

export default function BouncingBall() {
  const offsetX = useSharedValue<number>(0);
  const offsetY = useSharedValue<number>(0);
  const width = useSharedValue<number>(0);
  const height = useSharedValue<number>(0);

  const isAnimating = useSharedValue<boolean>(false);
  const velocityX = useSharedValue<number>(0);
  const velocityY = useSharedValue<number>(0);

  const navigation = useNavigation();

  const setSwipeEnabled = (enabled: boolean) => {
    navigation.setOptions({ swipeEnabled: enabled });
  };

  useFrameCallback((frame) => {
    "worklet";
    if (!isAnimating.value) return;
    const dt = frame.timeSincePreviousFrame ?? 16;
    const minX = -(width.value / 2) + SIZE / 2;
    const maxX = width.value / 2 - SIZE / 2;
    const minY = -(height.value / 2) + SIZE / 2;
    const maxY = height.value / 2 - SIZE / 2;

    velocityX.value = velocityX.value * FRICTION;
    velocityY.value = velocityY.value * FRICTION;

    offsetX.value += (velocityX.value * dt) / 1000;
    offsetY.value += (velocityY.value * dt) / 1000;

    if (offsetX.value < minX) {
      offsetX.value = minX;
      velocityX.value = -velocityX.value * BOUNCE_FACTOR;
    }
    if (offsetX.value > maxX) {
      offsetX.value = maxX;
      velocityX.value = -velocityX.value * BOUNCE_FACTOR;
    }
    if (offsetY.value < minY) {
      offsetY.value = minY;
      velocityY.value = -velocityY.value * BOUNCE_FACTOR;
    }
    if (offsetY.value > maxY) {
      offsetY.value = maxY;
      velocityY.value = -velocityY.value * BOUNCE_FACTOR;
    }
    if (
      Math.abs(velocityX.value) < MIN_VELOCITY &&
      Math.abs(velocityY.value) < MIN_VELOCITY
    ) {
      velocityX.value = 0;
      velocityY.value = 0;
      isAnimating.value = false;
    }
  });

  const onLayout = (event: LayoutChangeEvent) => {
    width.value = event.nativeEvent.layout.width;
    height.value = event.nativeEvent.layout.height;
  };

  const pan = Gesture.Pan()
    .onBegin(() => {
      scheduleOnRN(setSwipeEnabled, false);
      isAnimating.value = false;
    })
    .onChange((event) => {
      offsetX.value = clamp(
        event.changeX + offsetX.value,
        -(width.value / 2) + SIZE / 2,
        width.value / 2 - SIZE / 2,
      );
      offsetY.value = clamp(
        event.changeY + offsetY.value,
        -(height.value / 2) + SIZE / 2,
        height.value / 2 - SIZE / 2,
      );
    })
    .onFinalize((event) => {
      velocityX.value = event.velocityX;
      velocityY.value = event.velocityY;
      isAnimating.value = true;
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
