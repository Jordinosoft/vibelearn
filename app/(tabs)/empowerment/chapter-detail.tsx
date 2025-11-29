import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Markdown from "react-native-markdown-display";
import { Header } from "../../components/Header";
import { i18n } from "../../lib/i18n";
import { chapters } from "./data";

export default function ChapterDetailScreen() {
  const router = useRouter();
  const { chapterId } = useLocalSearchParams();

  const chapter = chapters.find((c) => c.id === chapterId);

  if (!chapter) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title={i18n.t("chapter_not_found")}
          onBackPress={() => router.back()}
        />
        <View style={styles.content}>
          <Text style={styles.errorText}>
            {i18n.t("chapter_not_found_message")}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleStartQuiz = () => {
    router.push({
      pathname: "/(tabs)/empowerment/quiz-detail",
      params: { chapterId: chapter.id },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={chapter.title} onBackPress={() => router.back()} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {chapter.objectives && chapter.objectives.length > 0 && (
          <View style={styles.objectivesContainer}>
            <Text style={styles.objectivesTitle}>
              {i18n.t("objectives_title")}:
            </Text>
            {chapter.objectives.map((objective, index) => (
              <Text key={index} style={styles.objectiveText}>
                • {objective}
              </Text>
            ))}
          </View>
        )}
        <Markdown style={markdownStyles}>{chapter.content}</Markdown>

        {chapter.quizzes && chapter.quizzes.length > 0 && (
          <TouchableOpacity
            style={styles.startQuizButton}
            onPress={handleStartQuiz}
          >
            <Text style={styles.startQuizButtonText}>
              {i18n.t("start_quiz")}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const markdownStyles = StyleSheet.create({
  heading1: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
  },
  heading2: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 15,
    marginBottom: 8,
  },
  heading3: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 12,
    marginBottom: 6,
  },
  heading4: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
    marginBottom: 5,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
    marginBottom: 10,
  },
  list_item: {
    fontSize: 16,
    color: "#444",
    marginBottom: 5,
  },
  bullet_list: {
    marginBottom: 10,
  },
  // Add other styles as needed
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  objectivesContainer: {
    backgroundColor: "#f0f8ff", // Light blue background for objectives
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: "#673ab7",
  },
  objectivesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  objectiveText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  startQuizButton: {
    backgroundColor: "#673ab7", // Primary purple
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  startQuizButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
