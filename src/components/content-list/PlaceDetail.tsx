import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import Animated, { FadeIn } from "react-native-reanimated";

import { imageTransition } from "@/animations/imageTransition";
import { getPlaceById } from "./mockData";

export function PlaceDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const place = getPlaceById(id);

  if (!place) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animated.Image
        source={place.image}
        style={styles.heroImage}
        resizeMode="cover"
        sharedTransitionTag={place.id}
        sharedTransitionStyle={imageTransition}
      />
      <View style={[styles.content, { paddingBottom: insets.bottom + 24 }]}>
        <Animated.Text
          entering={FadeIn.delay(150).duration(600)}
          style={styles.title}
        >
          {place.name}
        </Animated.Text>
        <Animated.Text
          entering={FadeIn.delay(300).duration(600)}
          style={styles.description}
        >
          {place.description}
        </Animated.Text>
        <Animated.View entering={FadeIn.delay(450).duration(600)}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Back to list</Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heroImage: {
    width: "100%",
    height: 320,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#111",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
