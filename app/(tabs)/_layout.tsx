import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { useContext } from "react"; // Import useContext
import { LanguageContext } from "../_layout"; // Import LanguageContext
import { i18n } from "../lib/i18n"; // Import i18n

export default function TabsLayout() {
  const languageContext = useContext(LanguageContext);

  if (!languageContext) {
    throw new Error("LanguageContext not found");
  }

  // Access language from context (even if not directly used in JSX, it forces re-render)
  const { language } = languageContext;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#673ab7", // Primary purple
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#eee",
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: i18n.t("start_learning"), // Using i18n for title
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: i18n.t("ai_tutor_title"), // Using i18n for title
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="ocr"
        options={{
          title: i18n.t("homework_helper_title"), // Using i18n for title
          tabBarIcon: ({ color }) => (
            <Ionicons name="camera-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="empowerment/index"
        options={{
          title: i18n.t("empowerment_guide_title"), // Using i18n for title
          tabBarIcon: ({ color }) => (
            <Ionicons name="sparkles-outline" size={24} color={color} /> // Changed icon to sparkles-outline
          ),
        }}
      />

      <Tabs.Screen
        name="profile/index"
        options={{
          title: i18n.t("student_profile"), // Using i18n for title
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
