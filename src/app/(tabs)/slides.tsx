import { useState } from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  interpolateColor,
  LinearTransition,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  FadeOut,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnUI } from "react-native-worklets";

export default function Slides() {
  const [slides, setSlides] = useState([
    { id: "1", color: "#6C63FF" },
    { id: "2", color: "#A855F7" },
    { id: "3", color: "#F472B6" },
  ]);

  const { width } = useWindowDimensions();
  const size = width - 32;

  const scrollX = useSharedValue(0);
  const isRemovalAnimating = useSharedValue(false);
  const removalProgress = useSharedValue(0);
  const removalFrom = useSharedValue("#6C63FF");
  const removalTo = useSharedValue("#6C63FF");

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const colors =
    slides.length > 0 ? slides.map((slide) => slide.color) : ["#0D0D0D"];
  const inputRange =
    colors.length === 1 ? [0, width] : colors.map((_, i) => i * width);
  const outputRange = colors.length === 1 ? [colors[0], colors[0]] : colors;

  const backgroundStyle = useAnimatedStyle(() => {
    if (isRemovalAnimating.value) {
      return {
        backgroundColor: interpolateColor(
          removalProgress.value,
          [0, 1],
          [removalFrom.value, removalTo.value],
        ),
      };
    }

    return {
      backgroundColor: interpolateColor(scrollX.value, inputRange, outputRange),
    };
  });

  const removeSlide = (id: string) => {
    const index = slides.findIndex((slide) => slide.id === id);
    const newSlides = slides.filter((slide) => slide.id !== id);
    const oldColors = slides.map((slide) => slide.color);
    const oldInputRange =
      oldColors.length === 1
        ? [0, width]
        : oldColors.map((_, i) => i * width);
    const targetIndex =
      newSlides.length === 0 ? 0 : Math.min(index, newSlides.length - 1);
    const targetColor = newSlides[targetIndex]?.color ?? "#0D0D0D";
    const targetScrollX = targetIndex * width;

    scheduleOnUI(
      (
        oldInputRange: number[],
        oldColors: string[],
        toColor: string,
        targetX: number,
      ) => {
        "worklet";
        const oldOutputRange =
          oldColors.length === 1 ? [oldColors[0], oldColors[0]] : oldColors;
        const fromColor = interpolateColor(
          scrollX.value,
          oldInputRange,
          oldOutputRange,
        );

        removalFrom.value = fromColor;
        removalTo.value = toColor;
        isRemovalAnimating.value = true;
        removalProgress.value = 0;
        removalProgress.value = withTiming(1, { duration: 300 }, (finished) => {
          if (finished) {
            isRemovalAnimating.value = false;
            scrollX.value = targetX;
          }
        });
      },
      oldInputRange,
      oldColors,
      targetColor,
      targetScrollX,
    );

    setSlides(newSlides);
  };

  return (
    <Animated.View style={[styles.container, backgroundStyle]}>
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        horizontal
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        pagingEnabled
        showsHorizontalScrollIndicator
        indicatorStyle="black"
        persistentScrollbar
      >
        {slides.map((slide) => (
          <Animated.View
            key={slide.id}
            layout={LinearTransition.duration(300)}
            exiting={FadeOut.duration(300)}
            style={[styles.slide, { width }]}
          >
            <View style={[styles.square, { width: size, height: size }]} />
            <Pressable
              style={styles.removeButton}
              onPress={() => removeSlide(slide.id)}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </Pressable>
          </Animated.View>
        ))}
      </Animated.ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  scrollView: { flex: 1 },
  scrollContent: { flexGrow: 1, alignItems: "center" },
  slide: { justifyContent: "center", alignItems: "center" },
  square: { backgroundColor: "#333333" },
  removeButton: {
    backgroundColor: "#FF0000",
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  removeButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
});
