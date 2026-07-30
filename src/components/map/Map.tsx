import { useCallback, useEffect, useState } from "react";
import { type LayoutChangeEvent, StyleSheet, View } from "react-native";
import { useImage } from "@shopify/react-native-skia";
import {
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import { DrawButton } from "./DrawButton";
import { MapCanvas } from "./MapCanvas";
import { useMapDrawing } from "./useMapDrawing";

export function Map() {
  const navigation = useNavigation();
  const image = useImage(require("@/assets/map.png"));
  const { isDrawingEnabled, isPathComplete, enableDrawing, path, pan } =
    useMapDrawing();
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    navigation.setOptions({ swipeEnabled: !isDrawingEnabled });
  }, [isDrawingEnabled, navigation]);

  useEffect(() => {
    return () => {
      navigation.setOptions({ swipeEnabled: true });
    };
  }, [navigation]);

  const onCanvasLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setCanvasSize((current) =>
      current.width === width && current.height === height
        ? current
        : { width, height },
    );
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={pan}>
        <View
          collapsable={false}
          style={styles.canvas}
          onLayout={onCanvasLayout}
        >
          {canvasSize.width > 0 && (
            <MapCanvas
              width={canvasSize.width}
              height={canvasSize.height}
              image={image}
              path={path}
              isPathComplete={isPathComplete}
            />
          )}
        </View>
      </GestureDetector>
      {!isDrawingEnabled && <DrawButton onPress={enableDrawing} />}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvas: {
    flex: 1,
  },
});
