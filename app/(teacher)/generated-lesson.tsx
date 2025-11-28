import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { ActionButton } from "../components/ActionButton";
import { Header } from "../components/Header";

export default function GeneratedLessonScreen() {
  const router = useRouter();
  const { topic, grade } = useLocalSearchParams();

  // Mock lesson content for demonstration
  const lessonContent = `Here is a lesson plan for ${
    topic || "French Verbs"
  } suitable for Grade ${grade || "5"}.

Introduction:
Start by asking students what they know about ${
    topic || "French Verbs"
  }. Connect it to real-world examples.

Core Concept:
Explain the fundamental principles using simple analogies.

Activity:
Group students into pairs to solve the attached worksheet problems.

Quiz:
1. What is the main cause of ${topic || "French Verbs"}?
2. How does it affect our daily lives?`;

  const handleCreateAnother = () => {
    router.replace("/(teacher)/lesson-generator-input");
  };

  const handleSavePdf = () => {
    // Implement PDF saving logic here
    console.log("Saving PDF...");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Lesson Generator" onBackPress={() => router.back()} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.lessonHeader}>
          <Text style={styles.lessonTitle}>{topic || "French Verbs"}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Ready</Text>
          </View>
        </View>
        <Text style={styles.lessonText}>{lessonContent}</Text>

        <View style={styles.buttonContainer}>
          <ActionButton
            title="Create Another"
            onPress={handleCreateAnother}
            style={styles.createAnotherButton}
            textStyle={styles.createAnotherButtonText}
          />
          <ActionButton
            title="Save PDF"
            onPress={handleSavePdf}
            iconName="download"
            iconColor="#fff"
            style={styles.savePdfButton}
            textStyle={{ color: "#fff", fontSize: 18 }}
          />
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
    padding: 16,
  },
  lessonHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    flexShrink: 1,
    marginRight: 10,
  },
  statusBadge: {
    backgroundColor: "#4CAF50", // Green for Ready badge
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  statusText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  lessonText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  createAnotherButton: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderColor: "#673ab7",
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 30,
  },
  createAnotherButtonText: {
    color: "#673ab7",
    fontSize: 18,
  },
  savePdfButton: {
    flex: 1,
    backgroundColor: "#673ab7",
    marginLeft: 10,
    borderRadius: 30,
  },
});
