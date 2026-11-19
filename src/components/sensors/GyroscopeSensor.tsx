import { View, Text, StyleSheet } from "react-native";
import { useAnimatedSensor, SensorType } from "react-native-reanimated";
import { GyroMotionBlur } from "./GyroMotionBlur";

export default function GyroscopeSensor() {
  const gyroscope = useAnimatedSensor(SensorType.GYROSCOPE);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gyroscope</Text>
      <GyroMotionBlur gyroscope={gyroscope} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  title: { fontWeight: "bold", marginBottom: 8, color: "#FFFFFF" },
});
