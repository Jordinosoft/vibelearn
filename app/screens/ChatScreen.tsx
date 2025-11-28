import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function ChatScreen() {
  const [query, setQuery] = useState("");
  const [reply, setReply] = useState("");

  async function sendMessage() {
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    setReply(data.reply);
  }

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Ask something..."
        style={{ borderWidth: 1, padding: 12, borderRadius: 8 }}
      />

      <Button title="Send" onPress={sendMessage} />

      <Text style={{ marginTop: 20 }}>{reply}</Text>
    </View>
  );
}
