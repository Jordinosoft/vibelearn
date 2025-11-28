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

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>Alex</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.mathScoreCard]}>
            <Ionicons name="stats-chart-outline" size={30} color="#fff" />
            <Text style={styles.statValue}>85%</Text>
            <Text style={styles.statLabel}>Math Score</Text>
          </View>
          <View style={[styles.statCard, styles.topicsMasteredCard]}>
            <Ionicons name="checkmark-circle-outline" size={30} color="#fff" />
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Topics Mastered</Text>
          </View>
        </View>

        {/* Start Learning Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Start Learning</Text>
          <View style={styles.learningOptionsContainer}>
            <Link href="/chat" asChild>
              <TouchableOpacity style={styles.learningOptionCard}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={40}
                  color="#673ab7"
                />
                <Text style={styles.learningOptionText}>AI Tutor</Text>
              </TouchableOpacity>
            </Link>
            <Link href="/ocr" asChild>
              <TouchableOpacity style={styles.learningOptionCard}>
                <Ionicons name="camera-outline" size={40} color="#673ab7" />
                <Text style={styles.learningOptionText}>Homework Helper</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Recommended for You Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <View style={styles.recommendedContainer}>
            <TouchableOpacity style={styles.lessonCard}>
              <View
                style={[styles.lessonIconContainer, styles.lessonIconOrange]}
              >
                <Ionicons name="bulb-outline" size={24} color="#fff" />
              </View>
              <View style={styles.lessonInfo}>
                <Text style={styles.lessonTitle}>Quadratic Equations</Text>
                <Text style={styles.lessonSubtitle}>
                  Algebra • 15 min lesson
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.lessonCard}>
              <View style={[styles.lessonIconContainer, styles.lessonIconBlue]}>
                <Ionicons name="book-outline" size={24} color="#fff" />
              </View>
              <View style={styles.lessonInfo}>
                <Text style={styles.lessonTitle}>The Water Cycle</Text>
                <Text style={styles.lessonSubtitle}>
                  Earth Science • 10 min lesson
                </Text>
              </View>
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
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
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
  statCard: {
    width: "48%",
    borderRadius: 15,
    padding: 20,
    justifyContent: "space-between",
    height: 150,
  },
  mathScoreCard: {
    backgroundColor: "#673ab7", // Primary purple
  },
  topicsMasteredCard: {
    backgroundColor: "#4CAF50", // Green
  },
  statValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  statLabel: {
    fontSize: 16,
    color: "#fff",
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
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 160,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  learningOptionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
    textAlign: "center",
  },
  recommendedContainer: {
    // Styles for recommended lessons container if needed
  },
  lessonCard: {
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
  lessonIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  lessonIconOrange: {
    backgroundColor: "#FF9800", // Orange
  },
  lessonIconBlue: {
    backgroundColor: "#2196F3", // Blue
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  lessonSubtitle: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },
});
