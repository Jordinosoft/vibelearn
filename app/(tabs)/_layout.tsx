import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4F46E5",
        tabBarInactiveTintColor: "#999",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
        }}
      />

      <Tabs.Screen
        name="ocr"
        options={{
          title: "OCR",
        }}
      />
    </Tabs>
  );
}
