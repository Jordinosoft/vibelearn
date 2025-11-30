import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React, { useContext } from "react"; // Import useContext
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LanguageContext } from "../../_layout"; // Import LanguageContext
import { Header } from "../../components/Header";
import { i18n } from "../../lib/i18n";
import { chapters } from "./data"; // Import your chapter data

export default function EmpowermentScreen() {
  const router = useRouter();
  const languageContext = useContext(LanguageContext);

  if (!languageContext) {
    throw new Error("LanguageContext not found");
  }

  const { language } = languageContext; // Consume language from context

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={i18n.t("girls_empowerment_guide_title")}
        onBackPress={() => router.back()}
      />
      <Text style={styles.guideDescription}>
        {i18n.t("girls_empowerment_guide_description")}
      </Text>
      <FlatList
        data={chapters}
        keyExtractor={(item) => item.id + language} // Add language to keyExtractor to force re-render
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: "/(tabs)/empowerment/chapter-detail",
              params: { chapterId: item.id },
            }}
            asChild
          >
            <TouchableOpacity style={styles.chapterCard}>
              <View style={styles.cardContent}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: item.color },
                  ]}
                >
                  <Ionicons
                    name={item.iconName as keyof typeof Ionicons.glyphMap}
                    size={24}
                    color="#fff"
                  />
                </View>
                <Text style={styles.chapterTitle}>
                  {i18n.t(item.titleKey as any)}
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0", // Light gray background
  },
  flatListContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  chapterCard: {
    borderRadius: 10, // Slightly smaller border radius for a modern look
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 12, // Reduced margin for a tighter list
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Distribute icon and text with space between
    backgroundColor: "#fff", // Solid white background for the card
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 }, // Softer shadow
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    minHeight: 70, // Ensure a minimum height
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20, // Circular background for the icon
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15, // Space between icon container and text
  },
  chapterTitle: {
    fontSize: 14, // Further reduced font size
    fontWeight: "600", // Slightly less bold
    color: "#333", // Darker color for better readability
    flexShrink: 1, // Allow text to wrap
  },
  guideDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 20,
  },
});
