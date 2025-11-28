import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Loads the tabs navigator */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
