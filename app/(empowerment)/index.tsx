import { Link, useRouter } from "expo-router";
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
import { empowermentChapters } from "../data/empowermentContent"; // Import the chapters

export default function EmpowermentHubScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Empowerment Hub"
        onBackPress={() => router.back()}
        backgroundColor="#673ab7"
        textColor="#fff"
        backButtonColor="#fff"
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.sectionTitle}>Manual Chapters</Text>
        <View style={styles.chapterList}>
          {empowermentChapters.map((chapter) => (
            <Link
              href={{
                pathname: "/(empowerment)/[chapterId]",
                params: { chapterId: chapter.id },
              }}
              asChild
              key={chapter.id}
            >
              <TouchableOpacity style={styles.chapterCard}>
                <Text style={styles.chapterTitle}>{chapter.title}</Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
        <View style={styles.quizSection}>
          <Text style={styles.sectionTitle}>Test Your Knowledge</Text>
          <Link
            href={{
              pathname: "/(empowerment)/quiz",
              params: { chapterId: "chapter1" },
            }}
            asChild
          >
            <TouchableOpacity style={styles.quizButton}>
              <Text style={styles.quizButtonText}>Start Quiz</Text>
            </TouchableOpacity>
          </Link>
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
    flexGrow: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  chapterList: {
    marginBottom: 30,
  },
  chapterCard: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  quizSection: {
    marginTop: 20,
    alignItems: "center",
  },
  quizButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quizButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
