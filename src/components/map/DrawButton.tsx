import { Pressable, StyleSheet, Text } from "react-native";

type DrawButtonProps = {
  onPress: () => void;
};

export function DrawButton({ onPress }: DrawButtonProps) {
  return (
    <Pressable style={styles.drawButton} onPress={onPress}>
      <Text style={styles.drawButtonText}>Draw</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  drawButton: {
    position: "absolute",
    bottom: 32,
    alignSelf: "center",
    backgroundColor: "#6C63FF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  drawButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
