import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.logo}
        />
        <Text style={styles.appName}>VibLearn</Text>
        <Text style={styles.tagline}>Your Personal AI Tutor & Assistant</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Link href="/home" asChild>
          <TouchableOpacity style={[styles.button, styles.studentButton]}>
            <Ionicons
              name="person-outline"
              size={24}
              color="#fff"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>I'm a Student</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={[styles.button, styles.teacherButton]}>
          <Ionicons
            name="book-outline"
            size={24}
            color="#673ab7"
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonText, styles.teacherButtonText]}>
            I'm a Teacher
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.versionText}>v1.0.0 • Offline Capable</Text>
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
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 30,
    marginVertical: 10,
  },
  studentButton: {
    backgroundColor: "#673ab7", // Primary purple
  },
  teacherButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#673ab7", // Primary purple
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  teacherButtonText: {
    color: "#673ab7",
  },
  versionText: {
    fontSize: 14,
    color: "#aaa",
  },
});
