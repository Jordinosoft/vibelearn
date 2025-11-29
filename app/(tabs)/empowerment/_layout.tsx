import { Stack } from "expo-router";

export default function EmpowermentLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" redirect={false} />
      <Stack.Screen name="chapter-detail" redirect={false} />
      <Stack.Screen name="quiz-detail" redirect={false} />
    </Stack>
  );
}
