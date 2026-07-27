import { View, TextInput, StyleSheet } from "react-native";
import {
  KeyboardProvider,
  KeyboardStickyView,
} from "react-native-keyboard-controller";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const UNICORN_WIDTH = 120;
const UNICORN_ASPECT = 1308 / 947;
const UNICORN_HEIGHT = UNICORN_WIDTH / UNICORN_ASPECT; // ~86.9
const INPUT_MARGIN_BOTTOM = 16;

export default function AnimatedKeyboard() {
  const insets = useSafeAreaInsets();
  const closedOffset = -(insets.bottom + UNICORN_HEIGHT + INPUT_MARGIN_BOTTOM);
  return (
    <KeyboardProvider>
      <View style={styles.container}>
        <KeyboardStickyView offset={{ closed: closedOffset, opened: 0 }}>
          <TextInput placeholder="Enter your text" style={styles.input} />
        </KeyboardStickyView>
        <Image
          source={require("@/assets/unicorn.png")}
          style={[styles.unicorn, { bottom: insets.bottom }]}
          contentFit="contain"
        />
      </View>
    </KeyboardProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  input: {
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginBottom: 16,
  },
  unicorn: {
    position: "absolute",
    width: UNICORN_WIDTH,
    aspectRatio: UNICORN_ASPECT,
  },
});
