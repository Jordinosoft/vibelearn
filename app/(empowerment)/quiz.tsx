import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Header } from "../components/Header";
import { quizzes } from "../data/quizzes";

export default function QuizScreen() {
  const router = useRouter();
  const { chapterId } = useLocalSearchParams();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [chapterQuizzes, setChapterQuizzes] = useState<typeof quizzes>([]);

  useEffect(() => {
    if (chapterId) {
      const filteredQuizzes = quizzes.filter(
        (quiz) => quiz.chapterId === chapterId
      );
      setChapterQuizzes(filteredQuizzes);
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setScore(0);
      setShowResults(false);
    } else {
      // Fallback for when no chapterId is provided, or for general quizzes
      setChapterQuizzes(quizzes);
    }
  }, [chapterId]);

  const currentQuestion = chapterQuizzes[currentQuestionIndex];

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    if (selectedOption === currentQuestion?.correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < chapterQuizzes.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setShowResults(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Quiz Results"
          onBackPress={() => router.back()}
          backgroundColor="#673ab7"
          textColor="#fff"
          backButtonColor="#fff"
        />
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Quiz Completed!</Text>
          <Text style={styles.resultsText}>
            Your Score: {score} out of {chapterQuizzes.length}
          </Text>
          <TouchableOpacity
            style={styles.restartButton}
            onPress={handleRestartQuiz}
          >
            <Text style={styles.restartButtonText}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Back to Hub</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!currentQuestion) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Quiz Unavailable"
          onBackPress={() => router.back()}
          backgroundColor="#673ab7"
          textColor="#fff"
          backButtonColor="#fff"
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            No quizzes found for this chapter.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Quiz Time!"
        onBackPress={() => router.back()}
        backgroundColor="#673ab7"
        textColor="#fff"
        backButtonColor="#fff"
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedOption === index && styles.selectedOptionButton,
              ]}
              onPress={() => handleOptionSelect(index)}
              disabled={selectedOption !== null} // Disable after selection
            >
              <Text
                style={[
                  styles.optionText,
                  selectedOption === index && styles.selectedOptionText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {selectedOption !== null && ( // Show feedback after an option is selected
          <View style={styles.feedbackContainer}>
            <Text
              style={[
                styles.feedbackText,
                selectedOption === currentQuestion.correctAnswer
                  ? styles.correctFeedback
                  : styles.incorrectFeedback,
              ]}
            >
              {selectedOption === currentQuestion.correctAnswer
                ? "Correct!"
                : "Incorrect. The correct answer was: " +
                  currentQuestion.options[currentQuestion.correctAnswer]}
            </Text>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNextQuestion}
            >
              <Text style={styles.nextButtonText}>
                {currentQuestionIndex < chapterQuizzes.length - 1
                  ? "Next Question"
                  : "Show Results"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedOptionButton: {
    backgroundColor: "#d6e9ff", // Light blue for selected option
    borderColor: "#673ab7",
    borderWidth: 2,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  selectedOptionText: {
    fontWeight: "bold",
    color: "#673ab7",
  },
  feedbackContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  correctFeedback: {
    color: "#4CAF50", // Green for correct
  },
  incorrectFeedback: {
    color: "#F44336", // Red for incorrect
  },
  nextButton: {
    backgroundColor: "#673ab7",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 15,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  resultsTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  resultsText: {
    fontSize: 20,
    marginBottom: 30,
    color: "#555",
  },
  restartButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginBottom: 10,
  },
  restartButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#9E9E9E",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
