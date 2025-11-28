import { Link } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { ActionButton } from "../components/ActionButton";
import { LessonCard } from "../components/LessonCard";
import { StatCard } from "../components/StatCard";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
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
            label="Math Score"
            backgroundColor="#673ab7"
          />
          <StatCard
            iconName="checkmark-circle-outline"
            value="12"
            label="Topics Mastered"
            backgroundColor="#4CAF50"
          />
        </View>

        {/* Start Learning Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Start Learning</Text>
          <View style={styles.learningOptionsContainer}>
            <Link href="/chat" asChild>
              <ActionButton
                title="AI Tutor"
                onPress={() => {}}
                iconName="chatbubble-ellipses-outline"
                iconSize={30} // Reduced icon size
                iconColor="#673ab7"
                style={styles.learningOptionCard}
                textStyle={styles.learningOptionText}
              />
            </Link>
            <Link href="/ocr" asChild>
              <ActionButton
                title="Homework\nHelper" // Broken into two lines
                onPress={() => {}}
                iconName="camera-outline"
                iconSize={30} // Reduced icon size
                iconColor="#673ab7"
                style={styles.learningOptionCard}
                textStyle={styles.learningOptionText}
              />
            </Link>
          </View>
        </View>

        {/* Recommended for You Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
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
  },
  recommendedContainer: {
    // Styles for recommended lessons container if needed
  },
});
