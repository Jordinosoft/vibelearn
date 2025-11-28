import { Stack } from "expo-router";

export default function TeacherLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" redirect={false} />
      <Stack.Screen name="lesson-generator-input" redirect={false} />
      <Stack.Screen name="generated-lesson" redirect={false} />
    </Stack>
  );
}

