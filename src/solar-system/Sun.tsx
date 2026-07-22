import { View, StyleSheet } from "react-native";
import { SUN_SIZE } from "./constants";

export function Sun() {
  return <View style={styles.sun} />;
}

const styles = StyleSheet.create({
  sun: {
    width: SUN_SIZE,
    height: SUN_SIZE,
    borderRadius: SUN_SIZE / 2,
    backgroundColor: "yellow",
  },
});
