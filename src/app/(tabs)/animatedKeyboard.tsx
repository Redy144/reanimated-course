import { View, TextInput, StyleSheet } from "react-native";
import {
  KeyboardProvider,
  KeyboardAvoidingView,
} from "react-native-keyboard-controller";
import { Image } from "expo-image";

export default function AnimatedKeyboard() {
  return (
    <KeyboardProvider>
      <Image
        source={require("@/assets/unicorn.png")}
        style={styles.unicorn}
        contentFit="contain"
      />
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={100}
        style={styles.content}
      >
        <TextInput placeholder="Enter your text" style={styles.input} />
      </KeyboardAvoidingView>
    </KeyboardProvider>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 150,
  },
  input: {
    width: "50%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginBottom: 16,
  },
  unicorn: {
    width: 120,
    aspectRatio: 1308 / 947,
  },
});
