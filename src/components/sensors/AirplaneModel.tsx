import { useAnimations, useGLTF } from "@react-three/drei/native";
import { useFrame } from "@react-three/fiber/native";
import { useEffect, useRef } from "react";
import type { AnimatedSensor, ValueRotation } from "react-native-reanimated";
import type { Group } from "three";
import type { GLTF } from "three-stdlib";

const PLANE_MODEL = require("@/assets/plane.glb");

const MODEL_SCALE = 0.4;
const MODEL_OFFSET_ROTATION: [number, number, number] = [0, Math.PI, 0];
const PROP_ANIMATION = "HeliceAction";
const MOVEMENT_ANIMATION = "FuselagemAction.001";

useGLTF.preload(PLANE_MODEL);

type AirplaneModelProps = {
  rotation: AnimatedSensor<ValueRotation>;
};

export function AirplaneModel({ rotation }: AirplaneModelProps) {
  const sensorGroupRef = useRef<Group>(null);
  const { scene, animations } = useGLTF(PLANE_MODEL) as GLTF;
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    actions[PROP_ANIMATION]?.reset().fadeIn(0).play();
    actions[MOVEMENT_ANIMATION]?.reset().fadeIn(0).play();

    return () => {
      actions[PROP_ANIMATION]?.fadeOut(0);
      actions[MOVEMENT_ANIMATION]?.fadeOut(0);
    };
  }, [actions]);

  useFrame(() => {
    if (!sensorGroupRef.current) {
      return;
    }

    const { qw, qx, qy, qz } = rotation.sensor.value;
    sensorGroupRef.current.quaternion.set(qx, qy, qz, qw);
  });

  return (
    <group ref={sensorGroupRef} scale={MODEL_SCALE}>
      <primitive object={scene} rotation={MODEL_OFFSET_ROTATION} />
    </group>
  );
}
