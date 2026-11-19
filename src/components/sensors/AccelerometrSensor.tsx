import { View, Text, StyleSheet } from "react-native";
import { useAnimatedSensor, SensorType } from "react-native-reanimated";
import { ImpulseCard } from "./ImpulseCard";

export default function AccelerometerSensor() {
  const accelerometer = useAnimatedSensor(SensorType.ACCELEROMETER);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accelerometer</Text>
      <ImpulseCard accelerometer={accelerometer} />
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
