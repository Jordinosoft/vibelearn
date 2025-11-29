import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";

export default function StudentProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Student Profile"
        onBackPress={() => router.back()}
        backgroundColor="#673ab7"
        textColor="#fff"
        backButtonColor="#fff"
      />
      <View style={styles.content}>
        <Text style={styles.profileText}>Student Profile</Text>
      </View>
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
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});
