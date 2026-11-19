import { View, Text, StyleSheet } from "react-native";
import { useAnimatedSensor, SensorType } from "react-native-reanimated";
import { RotationPlane } from "./RotationPlane";

export default function RotationSensor() {
  const rotation = useAnimatedSensor(SensorType.ROTATION);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rotation</Text>
      <RotationPlane rotation={rotation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#FFFFFF",
  },
});
