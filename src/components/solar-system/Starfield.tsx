import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

type StarData = {
  x: number;
  y: number;
  size: number;
  opacity: number;
};

function Star({ x, y, size, opacity }: StarData) {
  return (
    <View
      style={[
        styles.star,
        {
          left: `${x}%`,
          top: `${y}%`,
          width: size,
          height: size,
          opacity,
          borderRadius: size / 2,
        },
      ]}
    />
  );
}

export function Starfield() {
  const stars = useMemo(() => {
    return Array.from({ length: 40 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.5,
    }));
  }, []);

  return (
    <View style={styles.container}>
      {stars.map((star, index) => (
        <Star key={index} {...star} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
  },
  star: {
    position: "absolute",
    backgroundColor: "#fff",
  },
});
