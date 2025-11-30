import { Link } from "expo-router";
import React, { useContext } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LanguageContext } from "../_layout";
import { ActionButton } from "../components/ActionButton";
import { LessonCard } from "../components/LessonCard";
import { StatCard } from "../components/StatCard";
import { i18n } from "../lib/i18n";

export default function HomeScreen() {
  const languageContext = useContext(LanguageContext);

  if (!languageContext) {
    throw new Error("LanguageContext not found");
  }

  const { language } = languageContext;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>{i18n.t("welcome_back")}</Text>
            <Text style={styles.userName}>Elame</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>E</Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <StatCard
            iconName="stats-chart-outline"
            value="85%"
            label={i18n.t("math_score")}
            backgroundColor="#673ab7"
          />
          <StatCard
            iconName="checkmark-circle-outline"
            value="12"
            label={i18n.t("topics_mastered")}
            backgroundColor="#4CAF50"
          />
        </View>

        {/* Start Learning Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n.t("start_learning")}</Text>
          <FlatList
            data={[
              {
                id: "1",
                title: i18n.t("ai_tutor_title"),
                iconName: "chatbubble-ellipses-outline",
                href: "/chat",
              },
              {
                id: "2",
                title: i18n.t("homework_helper_title"),
                iconName: "camera-outline",
                href: "/ocr",
              },
              {
                id: "3",
                title: (
                  <>
                    <Text style={styles.learningOptionText}>{i18n.t("empowerment_guide_title").split(" ")[0]}</Text>
                    <Text style={styles.learningOptionText}>{i18n.t("empowerment_guide_title").split(" ")[1]}</Text>
                  </>
                ),
                iconName: "bulb-outline", // Reverted to original icon for better contrast on cards
                href: "/(tabs)/empowerment",
              },
            ]}
            keyExtractor={(item, index) => item.id + language + index} // Add index to keyExtractor to prevent errors with React.ReactNode as title
            numColumns={2}
            columnWrapperStyle={styles.learningOptionsContainer}
            renderItem={({ item }) => (
              <Link href={item.href as any} asChild>
                <ActionButton
                  title={item.title}
                  onPress={() => {}}
                  iconName={item.iconName as any}
                  iconSize={30}
                  iconColor="#673ab7"
                  style={styles.learningOptionCard}
                  textStyle={styles.learningOptionText}
                />
              </Link>
            )}
          />
        </View>

        {/* Recommended for You Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {i18n.t("recommended_for_you")}
          </Text>
          <View style={styles.recommendedContainer}>
            <LessonCard
              iconName="bulb-outline"
              iconBackgroundColor="#FF9800"
              title="Quadratic Equations"
              subtitle="Algebra • 15 min lesson"
              onPress={() => {}}
            />
            <LessonCard
              iconName="book-outline"
              iconBackgroundColor="#2196F3"
              title="The Water Cycle"
              subtitle="Earth Science • 10 min lesson"
              onPress={() => {}}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    paddingTop: 0, // Set to 0, SafeAreaView will handle top padding
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 40, // Adjusted padding to provide safe area from top
  },
  welcomeText: {
    fontSize: 18,
    color: "#888",
  },
  userName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#673ab7", // Primary purple
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  learningOptionsContainer: {
    justifyContent: "space-between",
    marginBottom: 10, // Add some bottom margin for spacing between rows
  },
  learningOptionCard: {
    width: "48%",
    backgroundColor: "#f8f8f8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderRadius: 15, // Ensure border radius is consistent
    padding: 15, // Add padding inside the card
    alignItems: "center", // Center content horizontally
    justifyContent: "center", // Center content vertically
    height: 160, // Give it a fixed height to prevent collapsing
  },
  learningOptionText: {
    color: "#333",
    textAlign: "center",
    marginTop: 10, // Space between icon and text
    fontWeight: "bold", // Make text bold as per UI
    fontSize: 16, // Adjust font size as per UI
    flexShrink: 1, // Allow text to shrink if necessary
    // Remove or reduce marginTop to decrease gap if needed. ActionButton styles already handle spacing.
  },
  recommendedContainer: {
    // Styles for recommended lessons container if needed
  },
});
