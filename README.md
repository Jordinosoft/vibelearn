# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Vibelearn App Documentation

This document provides an overview of the Vibelearn React Native application, its architecture, core features, and user guides for end-users and project managers.

### 1. Architecture Overview

Vibelearn is a cross-platform mobile application built using **React Native** and the **Expo** framework. It leverages **Expo Router** for declarative file-based navigation and **i18n-js** with **Expo Localization** for robust internationalization (English and French).

The application is structured into several key directories:

*   **`app/`**: Contains the frontend React Native code, including screens, components, navigation layouts, and internationalization logic.
*   **`backend/`**: Houses the Node.js backend services that interact with external APIs (e.g., Gemini for AI, Google Cloud Vision for OCR) and Supabase.
*   **`supabase/`**: Contains Supabase edge functions for serverless backend logic.

Key technologies and patterns include:

*   **React Native**: For building native mobile UIs.
*   **Expo**: A framework and platform for universal React applications.
*   **Expo Router**: For intuitive file-system based navigation.
*   **`i18n-js`**: A flexible JavaScript library for internationalization.
*   **React Context**: Used for global state management, particularly for language switching.
*   **Supabase**: Provides database, authentication, and serverless functions.

### 2. Core Features Explained

Vibelearn offers a suite of educational tools designed to support learning and empowerment:

#### 2.1. Internationalization (i18n) System

The app provides full localization support for **English** and **French**.

*   **Implementation**: The `i18n-js` library is used in conjunction with `Expo Localization` to detect the device's language.
*   **Language Switching**: Users can dynamically switch between English and French from the Profile screen. This change is managed globally using a `LanguageContext` provider, ensuring all components re-render with the selected language.
*   **Translation Files**: All translations are stored in `app/lib/i18n.ts`, with separate objects for `en` (English) and `fr` (French).

#### 2.2. AI Chat (AI Tutor)

The AI Chat feature provides an interactive AI tutor for students.

*   **Functionality**: Students can ask questions and receive explanations from an AI model. It supports both text and audio input (via transcription).
*   **Backend Integration**: The chat functionality is powered by the **Gemini API** through our Node.js backend (`backend/src/services/chatGemini.ts` and `backend/src/routes/chat.ts`). Audio transcription is handled by `backend/src/services/audioGemini.ts`.
*   **Purpose**: To offer personalized and immediate academic assistance.

#### 2.3. OCR (Homework Helper)

The OCR feature allows students to extract text from images, primarily for homework assistance.

*   **Functionality**: Users can take a photo of their homework or select an image from their gallery. The app then processes the image to extract text.
*   **Backend Integration**: Image processing and text extraction are handled by the **Google Cloud Vision API** (or a local OCR solution) through our Node.js backend (`backend/src/services/ocrGoogle.ts` or `backend/src/services/ocrLocal.ts` and `backend/src/routes/ocr.ts`).
*   **Purpose**: To help students quickly digitize and potentially get help with their physical homework assignments.

#### 2.4. Girls Empowerment Guide

This section provides a curated collection of educational chapters focused on empowering girls.

*   **Structure**: The guide is divided into various chapters, each with a title, descriptive content, and learning objectives.
*   **Content Management**: Chapter data, including titles, content keys, and objective keys, is defined in `app/(tabs)/empowerment/data.ts`. The actual translated content is fetched from the i18n system using these keys.
*   **New Chapter: Girls in STEM**: A new chapter, "Girls in STEM," has been added to encourage interest and provide resources for girls in science, technology, engineering, and mathematics. This chapter includes specific content and objectives.
*   **Purpose**: To inspire and educate young girls on various topics, including leadership, education, and career opportunities.

#### 2.5. Navigation

Vibelearn utilizes `expo-router` for its navigation structure, providing a clear and organized user experience.

*   **Tab Navigation**: The main sections of the app (Home, AI Tutor, Homework Helper, Empowerment, Profile) are accessible via a bottom tab navigator.
*   **File-Based Routing**: `expo-router` automatically creates routes based on the file structure in the `app/` directory, simplifying navigation management.

#### 2.6. Topic Generation (Teacher View)

(Note: Assuming this refers to the `app/(teacher)` directory and its related functionalities).

*   **Functionality**: This feature is designed for educators (or a "teacher view") to generate customized lesson topics based on specific grades or subjects.
*   **Implementation**: It leverages backend services (`backend/src/services/lessonGenerator.ts` and `backend/src/routes/lesson.ts`) to dynamically create educational content.
*   **Purpose**: To assist teachers in quickly generating relevant and grade-appropriate learning materials.

### 3. User Guides

*   **Language Selection**: Navigate to the "Profile" tab and tap the language button to switch between English and French.
*   **AI Tutor**: Go to the "AI Tutor" tab. Type your question or use the microphone icon for voice input.
*   **Homework Helper**: Select the "Homework Helper" tab. Grant camera permissions if prompted, then take a photo of your text or choose one from your gallery.
*   **Empowerment Guide**: Access the "Empowerment" tab to browse through various chapters. Tap on a chapter to view its detailed content and objectives.
*   **Topic Generation (Teacher)**: (If applicable and exposed to a specific user role) Access the "Teacher" section to input grade and topic preferences, then generate lessons.

### 4. API References (Functional Overview)

Vibelearn integrates with several external APIs to provide its core functionalities:

*   **Gemini API**: Used for advanced AI capabilities, including:
    *   **Chat Completions**: Powering the AI Tutor for natural language conversations.
    *   **Audio Transcription**: Converting spoken language into text for the AI Tutor.
*   **Google Cloud Vision API**: Utilized for highly accurate Optical Character Recognition (OCR) to extract text from images in the Homework Helper.
*   **Supabase**: Serves as the backend-as-a-service, providing:
    *   **Database**: For storing application data.
    *   **Authentication**: Managing user accounts and sessions.
    *   **Edge Functions**: Running serverless functions for custom backend logic.

### 5. Current Implementations and Future Considerations

*   **Current State**: The application provides a fully functional, multi-language learning platform with AI assistance, OCR capabilities, and an empowerment content guide. The UI has been refined for better user experience.
*   **Future Enhancements**: Potential areas for future development include:
    *   Expanded content for the Empowerment Guide.
    *   More advanced AI capabilities for personalized learning paths.
    *   Additional integrations for different educational resources.
    *   Further UI/UX improvements based on user feedback.

---
