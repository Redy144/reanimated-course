import { TopTabs } from "expo-router/js-top-tabs";

export default function TabLayout() {
  return (
    <TopTabs
      screenOptions={{ headerShown: false, tabBarStyle: { display: "none" } }}
    >
      <TopTabs.Screen name="index" options={{ title: "Solar System" }} />
      <TopTabs.Screen name="animateSvg" options={{ title: "Animate SVG" }} />
      <TopTabs.Screen
        name="bouncingBall"
        options={{ title: "Bouncing Ball" }}
      />
      <TopTabs.Screen
        name="animatedKeyboard"
        options={{ title: "Animated Keyboard" }}
      />
      <TopTabs.Screen name="slides" options={{ title: "Slides" }} />
      <TopTabs.Screen name="map" options={{ title: "Map" }} />
    </TopTabs>
  );
}
