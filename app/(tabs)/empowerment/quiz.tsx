import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Header } from "../../components/Header";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

const quizData: QuizQuestion[] = [
  {
    id: "1",
    question: "According to Chapter 1, what does gender equality mean?",
    options: [
      "Girls should only focus on household chores.",
      "Girls and boys have the same rights, opportunities, and treatment.",
      "Boys are naturally stronger and smarter than girls.",
      "Girls should not pursue education in traditionally masculine fields.",
    ],
    correctAnswer:
      "Girls and boys have the same rights, opportunities, and treatment.",
  },
  {
    id: "2",
    question:
      "What is one of the fundamental rights of girls mentioned in Chapter 2?",
    options: [
      "Right to early marriage.",
      "Right to quality education without discrimination.",
      "Right to perform all household duties.",
      "Right to be silent in decision-making.",
    ],
    correctAnswer: "Right to quality education without discrimination.",
  },
  {
    id: "3",
    question: "According to Chapter 3, how does education help in daily life?",
    options: [
      "It helps you avoid responsibilities.",
      "It teaches you to reflect and solve problems.",
      "It makes you dependent on others.",
      "It limits your choices and opportunities.",
    ],
    correctAnswer: "It teaches you to reflect and solve problems.",
  },
  {
    id: "4",
    question:
      "What is a characteristic of a good leader as described in Chapter 4?",
    options: [
      "Being indecisive.",
      "Being secretive about goals.",
      "Being empathetic.",
      "Avoiding interaction with others.",
    ],
    correctAnswer: "Being empathetic.",
  },
  {
    id: "5",
    question: "What is self-confidence, according to Chapter 5?",
    options: [
      "Believing one can only succeed with external validation.",
      "The belief that one can succeed and face life's challenges.",
      "Avoiding risks and staying within one's comfort zone.",
      "Comparing oneself constantly to others.",
    ],
    correctAnswer:
      "The belief that one can succeed and face life's challenges.",
  },
];

export default function QuizScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const router = useRouter();

  const currentQuestion = quizData[currentQuestionIndex];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Quiz Time!"
        backgroundColor="#673ab7"
        textColor="#fff"
        onBackPress={() => router.back()}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {!showResult ? (
          <View>
            <Text style={styles.questionNumber}>
              Question {currentQuestionIndex + 1} of {quizData.length}
            </Text>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedOption === option && styles.selectedOptionButton,
                  ]}
                  onPress={() => handleOptionSelect(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedOption === option && styles.selectedOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNextQuestion}
              disabled={selectedOption === null}
            >
              <Text style={styles.nextButtonText}>Next Question</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.resultContainer}>
            <Ionicons name="trophy-outline" size={80} color="gold" />
            <Text style={styles.resultTitle}>Quiz Completed!</Text>
            <Text style={styles.resultText}>
              You scored {score} out of {quizData.length} correct answers.
            </Text>
            <TouchableOpacity
              style={styles.restartButton}
              onPress={handleRestartQuiz}
            >
              <Text style={styles.restartButtonText}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.backToGuideButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backToGuideButtonText}>Back to Guide</Text>
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
    backgroundColor: "#f0f2f5",
  },
  scrollViewContent: {
    padding: 16,
  },
  questionNumber: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
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
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  selectedOptionButton: {
    borderColor: "#673ab7",
    backgroundColor: "#e8e0f6",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  selectedOptionText: {
    fontWeight: "bold",
    color: "#673ab7",
  },
  nextButton: {
    backgroundColor: "#673ab7",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#673ab7",
    marginTop: 20,
    marginBottom: 10,
  },
  resultText: {
    fontSize: 18,
    color: "#555",
    marginBottom: 30,
  },
  restartButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
    marginBottom: 10,
  },
  restartButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backToGuideButton: {
    backgroundColor: "#999",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  backToGuideButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
