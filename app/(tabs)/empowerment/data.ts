import { i18n } from "../../lib/i18n";
import { QuizQuestion } from "./quizzes";

export interface Chapter {
  id: string;
  title: string;
  titleKey: string; // Add titleKey here
  iconName: string; // Ionicons name
  color: string;
  content: string; // The full text content of the chapter
  contentKey: string;
  objectives: string[];
  objectiveKeys: string[];
  quizzes?: QuizQuestion[];
}

export const chapters: Chapter[] = [
  {
    id: "1",
    title: i18n.t("chapter1_title"),
    titleKey: "chapter1_title", // Add titleKey here
    iconName: "people-outline",
    color: "#FF5733",
    content: i18n.t("chapter1_content"),
    contentKey: "chapter1_content",
    objectives: [
      i18n.t("chapter1_obj1"),
      i18n.t("chapter1_obj2"),
    ],
    objectiveKeys: [
      "chapter1_obj1",
      "chapter1_obj2",
    ],
    quizzes: [
      {
        id: "q1_1",
        question: i18n.t("chapter1_q1"),
        options: [
          i18n.t("chapter1_q1_opt1"),
          i18n.t("chapter1_q1_opt2"),
          i18n.t("chapter1_q1_opt3"),
        ],
        correctAnswerIndex: 0,
      },
      {
        id: "q1_2",
        question: i18n.t("chapter1_q2"),
        options: [
          i18n.t("chapter1_q2_opt1"),
          i18n.t("chapter1_q2_opt2"),
          i18n.t("chapter1_q2_opt3"),
        ],
        correctAnswerIndex: 1,
      },
    ],
  },
  {
    id: "2",
    title: i18n.t("chapter2_title"),
    titleKey: "chapter2_title", // Add titleKey here
    iconName: "heart-circle-outline",
    color: "#2196F3",
    content: i18n.t("chapter2_content"),
    contentKey: "chapter2_content",
    objectives: [
      i18n.t("chapter2_obj1"),
      i18n.t("chapter2_obj2"),
    ],
    objectiveKeys: [
      "chapter2_obj1",
      "chapter2_obj2",
    ],
    quizzes: [
      {
        id: "q2_1",
        question: i18n.t("chapter2_q1"),
        options: [
          i18n.t("chapter2_q1_opt1"),
          i18n.t("chapter2_q1_opt2"),
          i18n.t("chapter2_q1_opt3"),
        ],
        correctAnswerIndex: 2,
      },
      {
        id: "q2_2",
        question: i18n.t("chapter2_q2"),
        options: [
          i18n.t("chapter2_q2_opt1"),
          i18n.t("chapter2_q2_opt2"),
          i18n.t("chapter2_q2_opt3"),
        ],
        correctAnswerIndex: 0,
      },
    ],
  },
  {
    id: "3",
    title: i18n.t("chapter3_title"),
    titleKey: "chapter3_title", // Add titleKey here
    iconName: "school-outline",
    color: "#4CAF50",
    content: i18n.t("chapter3_content"),
    contentKey: "chapter3_content",
    objectives: [
      i18n.t("chapter3_obj1"),
      i18n.t("chapter3_obj2"),
    ],
    objectiveKeys: [
      "chapter3_obj1",
      "chapter3_obj2",
    ],
    quizzes: [
      {
        id: "q3_1",
        question: i18n.t("chapter3_q1"),
        options: [
          i18n.t("chapter3_q1_opt1"),
          i18n.t("chapter3_q1_opt2"),
          i18n.t("chapter3_q1_opt3"),
        ],
        correctAnswerIndex: 0,
      },
    ],
  },
  {
    id: "4",
    title: i18n.t("chapter4_title"),
    titleKey: "chapter4_title", // Add titleKey here
    iconName: "bulb-outline",
    color: "#FF9800",
    content: i18n.t("chapter4_content"),
    contentKey: "chapter4_content",
    objectives: [
      i18n.t("chapter4_obj1"),
      i18n.t("chapter4_obj2"),
    ],
    objectiveKeys: [
      "chapter4_obj1",
      "chapter4_obj2",
    ],
    quizzes: [
      {
        id: "q4_1",
        question: i18n.t("chapter4_q1"),
        options: [
          i18n.t("chapter4_q1_opt1"),
          i18n.t("chapter4_q1_opt2"),
          i18n.t("chapter4_q1_opt3"),
        ],
        correctAnswerIndex: 0,
      },
    ],
  },
  {
    id: "5",
    title: i18n.t("chapter5_title"),
    titleKey: "chapter5_title", // Add titleKey here
    iconName: "happy-outline",
    color: "#9C27B0",
    content: i18n.t("chapter5_content"),
    contentKey: "chapter5_content",
    objectives: [
      i18n.t("chapter5_obj1"),
      i18n.t("chapter5_obj2"),
      i18n.t("chapter5_obj3"),
    ],
    objectiveKeys: [
      "chapter5_obj1",
      "chapter5_obj2",
      "chapter5_obj3",
    ],
    quizzes: [
      {
        id: "q5_1",
        question: i18n.t("chapter5_q1"),
        options: [
          i18n.t("chapter5_q1_opt1"),
          i18n.t("chapter5_q1_opt2"),
          i18n.t("chapter5_q1_opt3"),
        ],
        correctAnswerIndex: 0,
      },
    ],
  },
  {
    id: "6",
    title: i18n.t("chapter6_title"),
    titleKey: "chapter6_title", // Add titleKey here
    iconName: "options-outline",
    color: "#FFEB3B", // Yellow
    content: i18n.t("chapter6_content"),
    contentKey: "chapter6_content",
    objectives: [
      i18n.t("chapter6_obj1"),
      i18n.t("chapter6_obj2"),
    ],
    objectiveKeys: [
      "chapter6_obj1",
      "chapter6_obj2",
    ],
    quizzes: [
      {
        id: "q6_1",
        question: i18n.t("chapter6_q1"),
        options: [
          i18n.t("chapter6_q1_opt1"),
          i18n.t("chapter6_q1_opt2"),
          i18n.t("chapter6_q1_opt3"),
        ],
        correctAnswerIndex: 0,
      },
    ],
  },
  {
    id: "7",
    title: i18n.t("chapter7_title"),
    titleKey: "chapter7_title", // Add titleKey here
    iconName: "medical-outline",
    color: "#E91E63", // Pink
    content: i18n.t("chapter7_content"),
    contentKey: "chapter7_content",
    objectives: [
      i18n.t("chapter7_obj1"),
      i18n.t("chapter7_obj2"),
    ],
    objectiveKeys: [
      "chapter7_obj1",
      "chapter7_obj2",
    ],
    quizzes: [
      {
        id: "q7_1",
        question: i18n.t("chapter7_q1"),
        options: [
          i18n.t("chapter7_q1_opt1"),
          i18n.t("chapter7_q1_opt2"),
          i18n.t("chapter7_q1_opt3"),
        ],
        correctAnswerIndex: 0,
      },
    ],
  },
  {
    id: "8",
    title: i18n.t("chapter8_title"),
    titleKey: "chapter8_title", // Add titleKey here
    iconName: "shield-checkmark-outline",
    color: "#673ab7",
    content: i18n.t("chapter8_content"),
    contentKey: "chapter8_content",
    objectives: [
      i18n.t("chapter8_obj1"),
      i18n.t("chapter8_obj2"),
      i18n.t("chapter8_obj3"),
    ],
    objectiveKeys: [
      "chapter8_obj1",
      "chapter8_obj2",
      "chapter8_obj3",
    ],
    quizzes: [
      {
        id: "q8_1",
        question: i18n.t("chapter8_q1"),
        options: [
          i18n.t("chapter8_q1_opt1"),
          i18n.t("chapter8_q1_opt2"),
          i18n.t("chapter8_q1_opt3"),
        ],
        correctAnswerIndex: 0,
      },
    ],
  },
  {
    id: "9",
    title: i18n.t("chapter9_title"),
    titleKey: "chapter9_title", // Add titleKey here
    iconName: "people-circle-outline",
    color: "#3F51B5", // Indigo
    content: i18n.t("chapter9_content"),
    contentKey: "chapter9_content",
    objectives: [
      i18n.t("chapter9_obj1"),
      i18n.t("chapter9_obj2"),
      i18n.t("chapter9_obj3"),
      i18n.t("chapter9_obj4"),
    ],
    objectiveKeys: [
      "chapter9_obj1",
      "chapter9_obj2",
      "chapter9_obj3",
      "chapter9_obj4",
    ],
    quizzes: [
      {
        id: "q9_1",
        question: i18n.t("chapter9_q1"),
        options: [
          i18n.t("chapter9_q1_opt1"),
          i18n.t("chapter9_q1_opt2"),
          i18n.t("chapter9_q1_opt3"),
        ],
        correctAnswerIndex: 0,
      },
    ],
  },
  {
    id: "10",
    title: i18n.t("chapter10_title"),
    titleKey: "chapter10_title", // Add titleKey here
    iconName: "cash-outline",
    color: "#009688", // Teal
    content: i18n.t("chapter10_content"),
    contentKey: "chapter10_content",
    objectives: [
      i18n.t("chapter10_obj1"),
      i18n.t("chapter10_obj2"),
    ],
    objectiveKeys: [
      "chapter10_obj1",
      "chapter10_obj2",
    ],
    quizzes: [
      {
        id: "q10_1",
        question: i18n.t("chapter10_q1"),
        options: [
          i18n.t("chapter10_q1_opt1"),
          i18n.t("chapter10_q1_opt2"),
          i18n.t("chapter10_q1_opt3"),
        ],
        correctAnswerIndex: 0,
      },
    ],
  },
  {
    id: "girls-in-stem",
    title: i18n.t("girls_in_stem_title"),
    titleKey: "girls_in_stem_title",
    iconName: "flask-outline",
    color: "#1E90FF", // Dodger Blue
    content: i18n.t("girls_in_stem_content"),
    contentKey: "girls_in_stem_content",
    objectives: [
      i18n.t("girls_in_stem_obj1"),
      i18n.t("girls_in_stem_obj2"),
      i18n.t("girls_in_stem_obj3"),
    ],
    objectiveKeys: [
      "girls_in_stem_obj1",
      "girls_in_stem_obj2",
      "girls_in_stem_obj3",
    ],
    quizzes: [],
  },
];
