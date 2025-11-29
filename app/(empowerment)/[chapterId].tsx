import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ChapterContent } from "../components/ChapterContent";
import { Header } from "../components/Header";
import { empowermentChapters } from "../data/empowermentContent";

export default function ChapterDetailScreen() {
  const router = useRouter();
  const { chapterId } = useLocalSearchParams();

  const chapter = empowermentChapters.find((c) => c.id === chapterId);

  if (!chapter) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Chapter Not Found"
          onBackPress={() => router.back()}
          backgroundColor="#673ab7"
          textColor="#fff"
          backButtonColor="#fff"
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            The requested chapter could not be found.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={chapter.title}
        onBackPress={() => router.back()}
        backgroundColor="#673ab7"
        textColor="#fff"
        backButtonColor="#fff"
      />
      <ChapterContent title={chapter.title} content={chapter.content} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#f00",
    textAlign: "center",
  },
});
