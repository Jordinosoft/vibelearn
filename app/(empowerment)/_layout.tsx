import { Stack } from "expo-router";

export default function EmpowermentLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" redirect={false} />
      <Stack.Screen name="[chapterId]" redirect={false} />
      <Stack.Screen name="quiz" redirect={false} /> {/* New Quiz Screen */}
    </Stack>
  );
}
