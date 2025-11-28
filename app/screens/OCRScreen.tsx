import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { ActivityIndicator, Button, Image, Text, View } from "react-native";

export default function OCRScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      uploadImage(uri);
    }
  }

  async function uploadImage(uri: string) {
    setLoading(true);

    const formData = new FormData();
    formData.append("image", {
      uri,
      type: "image/jpeg",
      name: "photo.jpg",
    } as any);

    const res = await fetch("http://localhost:5000/ocr", {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    });

    const data = await res.json();
    setText(data.text);
    setLoading(false);
  }

  return (
    <View style={{ padding: 20 }}>
      <Button title="Pick Image" onPress={pickImage} />

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      )}

      {loading && <ActivityIndicator size="large" />}

      <Text style={{ marginTop: 20 }}>{text}</Text>
    </View>
  );
}
