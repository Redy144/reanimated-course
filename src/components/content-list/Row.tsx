import { Pressable, View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import Animated from "react-native-reanimated";

import { imageTransition } from "@/animations/imageTransition";
import { Place, VisitPriority } from "./mockData";

const priorityConfig: Record<VisitPriority, { label: string; color: string }> =
  {
    "must-see": { label: "Must see", color: "#D32F2F" },
    "highly-recommended": { label: "Highly recommended", color: "#1976D2" },
    "worth-a-detour": { label: "Worth a detour", color: "#757575" },
  };

export function Row({ item }: { item: Place }) {
  const priority = priorityConfig[item.priority];

  return (
    <Pressable onPress={() => router.push(`/list/${item.id}`)}>
      <View style={styles.container}>
        <Animated.Image
          source={item.image}
          style={styles.image}
          resizeMode="cover"
          sharedTransitionTag={item.id}
          sharedTransitionStyle={imageTransition}
        />
        <View style={styles.textBlock}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.priorityRow}>
            <View
              style={[styles.priorityDot, { backgroundColor: priority.color }]}
            />
            <Text style={styles.priorityLabel}>{priority.label}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  textBlock: {
    flex: 1,
    marginLeft: 12,
    gap: 6,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },
  priorityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  priorityLabel: {
    fontSize: 13,
    color: "#666",
  },
});
