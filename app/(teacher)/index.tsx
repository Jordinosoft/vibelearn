import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Header } from "../components/Header";
import { TeacherHomeCard } from "../components/TeacherHomeCard";

export default function TeacherHomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header */}
        <Header title="Teacher Portal" textColor="#000" />
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>Mr. Anderson</Text>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>M</Text>
          </View>
        </View>

        {/* Main Cards */}
        <View style={styles.mainCardsContainer}>
          <Link href="/(teacher)/lesson-generator-input" asChild>
            <TeacherHomeCard
              title="Lesson Generator"
              subtitle="Create lesson plans & quizzes in seconds using AI."
              iconName="bulb-outline"
              onPress={() => {}}
              backgroundColor="#673ab7"
              textColor="#fff"
              iconColor="#fff"
              isNew={true}
              style={styles.lessonGeneratorCard}
              subtitleStyle={{ fontSize: 14, color: "#eee", lineHeight: 20 }}
            />
          </Link>
          <View style={styles.gridCardsContainer}>
            <TeacherHomeCard
              title="Class Analytics"
              iconName="stats-chart-outline"
              onPress={() => {}}
              style={styles.gridCard}
              titleStyle={{ fontSize: 16, textAlign: "center" }}
              iconColor="#673ab7"
            />
            <TeacherHomeCard
              title="Students"
              iconName="person-outline"
              onPress={() => {}}
              style={styles.gridCard}
              titleStyle={{ fontSize: 16, textAlign: "center" }}
              iconColor="#673ab7"
            />
          </View>
        </View>

        {/* Recent Generations Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Generations</Text>
          <View style={styles.recentGenerationsContainer}>
            <TouchableOpacity style={styles.recentGenerationCard}>
              <Text style={styles.recentGenerationTitle}>
                Introduction to Photosynthesis
              </Text>
              <Text style={styles.recentGenerationSubtitle}>
                Biology • 11/28/2025
              </Text>
              <Ionicons
                name="download-outline"
                size={24}
                color="#888"
                style={styles.downloadIcon}
              />
            </TouchableOpacity>
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
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  userInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
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
    backgroundColor: "#4CAF50", // Green
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  mainCardsContainer: {
    marginBottom: 30,
  },
  lessonGeneratorCard: {
    marginBottom: 20,
    height: 180,
    justifyContent: "center",
    paddingVertical: 25,
  },
  gridCardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gridCard: {
    width: "48%",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
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
  recentGenerationsContainer: {},
  recentGenerationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recentGenerationTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  recentGenerationSubtitle: {
    fontSize: 14,
    color: "#888",
    marginRight: 10,
  },
  downloadIcon: {
    // No specific styles needed here, just for positioning
  },
});
