import { View, Text, StyleSheet } from "react-native";
import { useAnimatedSensor, SensorType } from "react-native-reanimated";
import { GravityTooltip } from "./GravityTooltip";

export default function GravitySensor() {
  const gravity = useAnimatedSensor(SensorType.GRAVITY);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gravity</Text>
      <GravityTooltip gravity={gravity} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1A1A2E",
  },
});
