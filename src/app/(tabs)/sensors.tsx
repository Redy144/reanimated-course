import { View, StyleSheet } from "react-native";
import RotationSensor from "@/components/sensors/RotationSensor";
import GravitySensor from "@/components/sensors/GravitySensor";
import AccelerometerSensor from "@/components/sensors/AccelerometrSensor";
import GyroscopeSensor from "@/components/sensors/GyroscopeSensor";

export default function Sensors() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.cell, { backgroundColor: "#1A1A2E" }]}>
          <RotationSensor />
        </View>
        <View style={[styles.cell, { backgroundColor: "#4ECDC4" }]}>
          <GravitySensor />
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.cell, { backgroundColor: "#FFE66D" }]}>
          <AccelerometerSensor />
        </View>
        <View style={[styles.cell, { backgroundColor: "#1A535C" }]}>
          <GyroscopeSensor />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
