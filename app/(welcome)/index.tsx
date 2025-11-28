import { Link } from "expo-router";
import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ActionButton } from "../components/ActionButton"; // Import ActionButton

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.logo}
        />
        <Text style={styles.appName}>VibeLearn</Text>
        <Text style={styles.tagline}>Your Personal AI Tutor & Assistant</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Link href="/(tabs)" asChild>
          <ActionButton
            title="I'm a Student"
            onPress={() => {}}
            iconName="person-outline"
            style={styles.studentButton}
            textStyle={{ color: "#fff" }}
            iconColor="#fff"
          />
        </Link>
        <Link href="/(teacher)" asChild>
          <ActionButton
            title="I'm a Teacher"
            onPress={() => {}}
            iconName="book-outline"
            style={styles.teacherButton}
            textStyle={styles.teacherButtonText}
            iconColor="#673ab7"
          />
        </Link>
      </View>

      {/* <Text style={styles.versionText}>v1.0.0 • Offline Capable</Text> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 50,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  appName: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
  },
  tagline: {
    fontSize: 16,
    color: "#888",
    marginTop: 5,
  },
  buttonContainer: {
    width: "80%",
  },
  studentButton: {
    backgroundColor: "#673ab7", // Primary purple
  },
  teacherButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#673ab7", // Primary purple
  },
  teacherButtonText: {
    color: "#673ab7",
  },
  versionText: {
    fontSize: 14,
    color: "#aaa",
  },
});
