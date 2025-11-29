import { Ionicons } from "@expo/vector-icons";
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Header } from "../components/Header"; // Import the Header component
import { i18n } from "../lib/i18n";

export default function ChatScreen() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<
    { id: string; text: string; sender: "user" | "ai" }[]
  >([]);
  const [loadingAIResponse, setLoadingAIResponse] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false); // New state for transcription

  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);

  useEffect(() => {
    (async () => {
      const { granted } = await AudioModule.requestRecordingPermissionsAsync();
      if (!granted) {
        // Handle permission denial appropriately (e.g., show an alert)
        console.error(i18n.t("camera_permission_denied")); // Using i18n
      }
      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
        interruptionModeAndroid: "duckOthers", // Example, adjust as needed
        interruptionMode: "mixWithOthers", // Example, adjust as needed
        shouldPlayInBackground: true, // Allow recording in background
      });
    })();
  }, []);

  useEffect(() => {
    // Check if recording has just stopped and a URI is available from audioRecorder
    if (!recorderState.isRecording && audioRecorder.uri && !isTranscribing) {
      uploadAudioForTranscription(audioRecorder.uri);
    }
  }, [recorderState.isRecording, audioRecorder.uri, isTranscribing]);

  async function uploadAudioForTranscription(uri: string) {
    setIsTranscribing(true);
    setLoadingAIResponse(true); // Indicate overall loading

    const formData = new FormData();
    formData.append("audio", {
      uri,
      type: "audio/m4a", // Adjust mime type based on RecordingPresets.HIGH_QUALITY extension
      name: `recording-${Date.now()}.m4a`,
    } as any);

    try {
      const response = await fetch(
        "https://vibelearn-backend.onrender.com/audio",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || i18n.t("error_transcribing_audio")
        ); // Using i18n
      }

      const data = await response.json();
      setQuery(data.text); // Set transcribed text to query input
    } catch (error) {
      console.error("Error transcribing audio:", error);
      // Optionally display an error message to the user
    } finally {
      setIsTranscribing(false);
      setLoadingAIResponse(false);
    }
  }

  async function sendMessage() {
    if (query.trim() === "") return;

    const userMessage = {
      id: Date.now().toString(),
      text: query,
      sender: "user" as "user",
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setQuery("");
    setLoadingAIResponse(true); // Set loading to true

    try {
      const response = await fetch(
        "https://vibelearn-backend.onrender.com/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        }
      );

      const data = await response.json();
      const aiMessage = {
        id: Date.now().toString(),
        text: data.reply || i18n.t("no_response_from_ai"), // Using i18n
        sender: "ai" as "ai",
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        id: Date.now().toString(),
        text: i18n.t("error_sending_message"), // Using i18n
        sender: "ai" as "ai",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoadingAIResponse(false); // Set loading to false
    }
  }

  const handleMicButtonPress = async () => {
    if (recorderState.isRecording) {
      audioRecorder.stop();
    } else if (!isTranscribing && !loadingAIResponse) {
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
    }
  };

  const isInputDisabled = loadingAIResponse || isTranscribing; // Only disable if AI is responding or transcribing

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={i18n.t("ai_tutor_title")}
        onBackPress={() => {}}
        backgroundColor="#fff"
        textColor="#000"
        backButtonColor="#000"
      />

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageBubble,
                item.sender === "user" ? styles.userMessage : styles.aiMessage,
              ]}
            >
              <Text
                style={item.sender === "user" ? styles.userText : styles.aiText}
              >
                {item.text}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.introContainer}>
              <View style={styles.introBubble}>
                <Text style={styles.introText}>
                  {i18n.t("ai_intro_message")}
                </Text>
              </View>
            </View>
          }
          style={styles.messageList}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        />

        {(loadingAIResponse || isTranscribing) && (
          <View style={styles.typingIndicatorContainer}>
            <ActivityIndicator size="small" color="#673ab7" />
            <Text style={styles.typingText}>
              {isTranscribing
                ? i18n.t("transcribing_audio")
                : i18n.t("ai_is_typing")}
            </Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={[
              styles.iconButton,
              isInputDisabled && styles.iconButtonDisabled,
              recorderState.isRecording && styles.recordingButtonActive,
            ]}
            onPress={handleMicButtonPress}
            disabled={isInputDisabled}
          >
            {recorderState.isRecording ? (
              <Ionicons name="stop-circle-outline" size={24} color="red" />
            ) : (
              <Ionicons
                name="mic-outline"
                size={24}
                color={isInputDisabled ? "#ccc" : "#888"}
              />
            )}
          </TouchableOpacity>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={i18n.t("ask_a_question_placeholder")}
            style={styles.input}
            placeholderTextColor="#888"
            multiline
            editable={!isInputDisabled && !recorderState.isRecording}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              isInputDisabled && styles.sendButtonDisabled,
            ]}
            onPress={sendMessage}
            disabled={isInputDisabled || recorderState.isRecording}
          >
            {isInputDisabled && !recorderState.isRecording ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Ionicons name="send" size={24} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  messageList: {
    flex: 1,
  },
  introContainer: {
    alignItems: "flex-start",
    marginBottom: 20,
    marginTop: 20,
  },
  introBubble: {
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    maxWidth: "80%",
    marginLeft: 16,
  },
  introText: {
    fontSize: 16,
    color: "#333",
  },
  messageBubble: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    maxWidth: "80%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#673ab7", // Primary purple
    borderBottomRightRadius: 5,
  },
  aiMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f0f0f0",
    borderBottomLeftRadius: 5,
  },
  userText: {
    color: "#fff",
    fontSize: 16,
  },
  aiText: {
    color: "#333",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    marginBottom: 0, // Ensure it sits at the bottom
  },
  iconButton: {
    padding: 8,
  },
  iconButtonDisabled: {
    opacity: 0.5,
  },
  recordingButtonActive: {
    // Optional: add a visual cue when recording is active but not disabled
    // For example, a pulse animation or a different background color
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 8,
    fontSize: 16,
    maxHeight: 100, // Limit input height
  },
  sendButton: {
    backgroundColor: "#673ab7", // Primary purple
    borderRadius: 25,
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#a783da", // Lighter purple for disabled state
  },
  typingIndicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  typingText: {
    marginLeft: 10,
    color: "#888",
    fontStyle: "italic",
  },
});
