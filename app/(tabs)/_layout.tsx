import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" redirect={false} />
      <Stack.Screen name="chat" redirect={false} />
      <Stack.Screen name="ocr" redirect={false} />
      <Stack.Screen name="profile" redirect={false} /> {/* New Profile Screen */}
    </Stack>
  );
}
