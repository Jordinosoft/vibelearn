import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LanguageContext } from "../../_layout";
import { Header } from "../../components/Header";
import { i18n } from "../../lib/i18n";
import { chapters } from "./data";
import { QuizQuestion } from "./quizzes";

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function QuizScreen() {
  const router = useRouter();
  const { chapterId } = useLocalSearchParams();

  const languageContext = useContext(LanguageContext);

  if (!languageContext) {
    throw new Error("LanguageContext not found");
  }

  const { language } = languageContext; // Consume language from context

  const chapter = chapters.find((c) => c.id === chapterId);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(
    null
  );
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>(
    []
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);

  const loadQuestion = useCallback(() => {
    if (chapter && chapter.quizzes && shuffledQuestions.length > 0) {
      setCurrentQuestion(shuffledQuestions[questionIndex]);
      setSelectedIndex(null);
      setFeedback(null);
    } else if (chapter && chapter.quizzes && chapter.quizzes.length > 0) {
      const shuffled = shuffleArray([...chapter.quizzes]);
      setShuffledQuestions(shuffled);
      setCurrentQuestion(shuffled[0]);
      setQuestionIndex(0);
      setSelectedIndex(null);
      setFeedback(null);
    }
  }, [chapter, shuffledQuestions, questionIndex]);

  useEffect(() => {
    loadQuestion();
  }, [loadQuestion]);

  const handleAnswer = (index: number) => {
    if (currentQuestion) {
      setSelectedIndex(index);
      if (index === currentQuestion.correctAnswerIndex) {
        setFeedback(i18n.t("quiz_correct"));
        setScore((prev) => prev + 1);
      } else {
        setFeedback(i18n.t("quiz_incorrect"));
      }
    }
  };

  const handleNextQuestion = () => {
    if (questionIndex < shuffledQuestions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
      loadQuestion();
    } else {
      // End of quiz
      alert(
        i18n.t("quiz_finished", { score, total: shuffledQuestions.length })
      );
      router.back();
    }
  };

  if (!chapter || !chapter.quizzes || chapter.quizzes.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title={i18n.t("quiz_no_quizzes")}
          onBackPress={() => router.back()}
        />
        <View style={styles.content}>
          <Text style={styles.errorText}>
            {i18n.t("quiz_no_quizzes_available")}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={`${i18n.t(chapter.titleKey as any)} ${i18n.t("quiz_title")}`}
        onBackPress={() => router.back()}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {currentQuestion && (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedIndex === index && styles.selectedOption,
                    feedback &&
                      index === currentQuestion.correctAnswerIndex &&
                      styles.correctOption,
                    feedback &&
                      selectedIndex === index &&
                      selectedIndex !== currentQuestion.correctAnswerIndex &&
                      styles.incorrectOption,
                  ]}
                  onPress={() => handleAnswer(index)}
                  disabled={selectedIndex !== null}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {feedback && <Text style={styles.feedbackText}>{feedback}</Text>}
            {selectedIndex !== null && (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNextQuestion}
              >
                <Text style={styles.nextButtonText}>
                  {i18n.t("quiz_next_question")}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
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
  questionContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#eee",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedOption: {
    borderColor: "#673ab7", // Primary purple for selected
    borderWidth: 2,
  },
  correctOption: {
    backgroundColor: "#d4edda", // Light green
    borderColor: "#28a745", // Green
  },
  incorrectOption: {
    backgroundColor: "#f8d7da", // Light red
    borderColor: "#dc3545", // Red
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  feedbackText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: "#673ab7",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
  nextButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
