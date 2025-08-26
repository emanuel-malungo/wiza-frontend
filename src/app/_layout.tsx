import { Stack } from "expo-router";
import "../assets/styles/globals.css";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(driver)" />
    </Stack>
  );
}
