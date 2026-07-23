import { StyleSheet, View } from "react-native";
import { SolarSystem } from "@/components/solar-system/SolarSystem";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <SolarSystem />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
