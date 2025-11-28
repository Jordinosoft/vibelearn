import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { ActionButton } from "../components/ActionButton";
import { GradeSelector } from "../components/GradeSelector";
import { Header } from "../components/Header";

export default function LessonGeneratorInputScreen() {
  const [topic, setTopic] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const grades = ["Gr 3", "Gr 5", "Gr 8", "Gr 10", "Gr 12"];

  const handleGenerateLesson = async () => {
    if (!topic.trim() || !selectedGrade) {
      setError("Please enter a topic and select a grade level.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://192.168.1.135:5000/generate-lesson",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic,
            grade_level: selectedGrade,
            teacherId: "123",
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to generate lesson.");
      }

      const data = await response.json();
      const lessonContent = data.lesson; // Assuming the API returns a 'lesson' field

      router.push({
        pathname: "/(teacher)/generated-lesson",
        params: { topic, grade: selectedGrade, lessonContent },
      });
    } catch (err: any) {
      console.error("Error generating lesson:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Lesson Generator" onBackPress={() => router.back()} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.label}>Topic or Concept</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., The French Revolution, Fractions"
          value={topic}
          onChangeText={setTopic}
          editable={!loading}
        />

        <Text style={styles.label}>Target Grade Level</Text>
        <GradeSelector
          grades={grades}
          selectedGrade={selectedGrade}
          onSelectGrade={setSelectedGrade}
          containerStyle={styles.gradeSelectorContainer}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}

        <ActionButton
          title={loading ? "Generating..." : "Generate with AI"}
          onPress={handleGenerateLesson}
          iconName={loading ? undefined : "flash"}
          iconColor="#fff"
          style={styles.generateButton}
          textStyle={{ color: "#fff", fontSize: 18 }}
          disabled={loading}
        >
          {loading && (
            <ActivityIndicator
              size="small"
              color="#fff"
              style={styles.loadingIndicator}
            />
          )}
        </ActionButton>
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
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 20,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  gradeSelectorContainer: {
    marginBottom: 30,
  },
  generateButton: {
    backgroundColor: "#673ab7", // Primary purple
    borderRadius: 30,
    paddingVertical: 15,
    flexDirection: "row", // To align icon and text
    justifyContent: "center",
    alignItems: "center",
  },
  loadingIndicator: {
    marginLeft: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
