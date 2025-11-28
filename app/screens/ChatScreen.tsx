import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
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

export default function ChatScreen() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<
    { id: string; text: string; sender: "user" | "ai" }[]
  >([]);
  const [loadingAIResponse, setLoadingAIResponse] = useState(false);

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
      const response = await fetch("http://192.168.1.135:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      const aiMessage = {
        id: Date.now().toString(),
        text: data.reply || "No response from AI",
        sender: "ai" as "ai",
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        id: Date.now().toString(),
        text: "Sorry, something went wrong. Please try again.",
        sender: "ai" as "ai",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoadingAIResponse(false); // Set loading to false
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="AI Tutor"
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
                  Hi! I'm your AI Tutor. Ask me anything or upload a photo of
                  your homework!
                </Text>
              </View>
            </View>
          }
          style={styles.messageList}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        />

        {loadingAIResponse && (
          <View style={styles.typingIndicatorContainer}>
            <ActivityIndicator size="small" color="#673ab7" />
            <Text style={styles.typingText}>AI is typing...</Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            disabled={loadingAIResponse}
          >
            <Ionicons
              name="mic-outline"
              size={24}
              color={loadingAIResponse ? "#ccc" : "#888"}
            />
          </TouchableOpacity>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Ask a question..."
            style={styles.input}
            placeholderTextColor="#888"
            multiline
            editable={!loadingAIResponse}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              loadingAIResponse && styles.sendButtonDisabled,
            ]}
            onPress={sendMessage}
            disabled={loadingAIResponse}
          >
            {loadingAIResponse ? (
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
