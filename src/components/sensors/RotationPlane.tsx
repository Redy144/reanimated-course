import { Canvas } from "@react-three/fiber/native";
import { Suspense } from "react";
import { StyleSheet, View } from "react-native";
import type { AnimatedSensor, ValueRotation } from "react-native-reanimated";
import { AirplaneModel } from "./AirplaneModel";

const STAGE = 110;
const CAMERA_POSITION: [number, number, number] = [0, 1.5, 4];

type RotationPlaneProps = {
  rotation: AnimatedSensor<ValueRotation>;
};

export function RotationPlane({ rotation }: RotationPlaneProps) {
  return (
    <View style={styles.stage}>
      <Canvas
        style={styles.canvas}
        camera={{ position: CAMERA_POSITION, fov: 45 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 4, 3]} intensity={1.2} />
        <Suspense fallback={null}>
          <AirplaneModel rotation={rotation} />
        </Suspense>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  stage: {
    width: STAGE,
    height: STAGE,
    alignItems: "center",
    justifyContent: "center",
  },
  canvas: {
    width: STAGE,
    height: STAGE,
  },
});
