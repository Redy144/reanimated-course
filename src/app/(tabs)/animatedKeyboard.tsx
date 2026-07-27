import { View, TextInput, StyleSheet } from "react-native";
import {
  KeyboardProvider,
  KeyboardStickyView,
} from "react-native-keyboard-controller";
import { Image } from "expo-image";

export default function AnimatedKeyboard() {
  return (
    <KeyboardProvider>
      <View style={styles.container}>
        <KeyboardStickyView offset={{ closed: -(44 + 87 + 16), opened: 8 }}>
          <TextInput placeholder="Enter your text" style={styles.input} />
        </KeyboardStickyView>
        <Image
          source={require("@/assets/unicorn.png")}
          style={styles.unicorn}
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
    bottom: 44,
    width: 120,
    aspectRatio: 1308 / 947,
  },
});
