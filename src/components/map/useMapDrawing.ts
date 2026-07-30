import { Skia, notifyChange } from "@shopify/react-native-skia";
import { useState } from "react";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";
import { Gesture } from "react-native-gesture-handler";
import { scheduleOnRN } from "react-native-worklets";

export function useMapDrawing() {
  const [isDrawingEnabled, setIsDrawingEnabled] = useState(false);
  const [isPathComplete, setIsPathComplete] = useState(false);
  const pathBuilder = useSharedValue(Skia.PathBuilder.Make());
  const path = useDerivedValue(() => pathBuilder.value.build());

  const enableDrawing = () => {
    pathBuilder.value.reset();
    notifyChange(pathBuilder);
    setIsPathComplete(false);
    setIsDrawingEnabled(true);
  };

  const finishDrawing = () => {
    setIsDrawingEnabled(false);
    setIsPathComplete(true);
  };

  const pan = Gesture.Pan()
    .enabled(isDrawingEnabled)
    .maxPointers(1)
    .minDistance(0)
    .shouldCancelWhenOutside(false)
    .onBegin((e) => {
      pathBuilder.value.reset();
      pathBuilder.value.moveTo(e.x, e.y);
      notifyChange(pathBuilder);
    })
    .onChange((e) => {
      pathBuilder.value.lineTo(e.x, e.y);
      notifyChange(pathBuilder);
    })
    .onEnd(() => {
      scheduleOnRN(finishDrawing);
    });

  return {
    isDrawingEnabled,
    isPathComplete,
    enableDrawing,
    path,
    pan,
  };
}
