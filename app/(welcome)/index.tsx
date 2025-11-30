import { Ionicons } from "@expo/vector-icons";
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
            title={
              <View style={styles.actionButtonContent}>
                <Ionicons
                  name="person-outline"
                  size={24}
                  color="#fff"
                  style={styles.actionButtonIcon}
                />
                <Text style={{ color: "#fff" }}>I'm a Student</Text>
              </View>
            }
            onPress={() => {}}
            // iconName="person-outline" // Icon is now part of the title prop
            style={styles.studentButton}
            // textStyle={{ color: "#fff" }} // Text style applied directly to Text component
            // iconColor="#fff" // Icon color applied directly to Ionicons component
          />
        </Link>
        <Link href="/(teacher)" asChild>
          <ActionButton
            title={
              <View style={styles.actionButtonContent}>
                <Ionicons
                  name="book-outline"
                  size={24}
                  color="#673ab7"
                  style={styles.actionButtonIcon}
                />
                <Text style={styles.teacherButtonText}>I'm a Teacher</Text>
              </View>
            }
            onPress={() => {}}
            // iconName="book-outline" // Icon is now part of the title prop
            style={styles.teacherButton}
            // textStyle={styles.teacherButtonText} // Text style applied directly to Text component
            // iconColor="#673ab7" // Icon color applied directly to Ionicons component
          />
        </Link>
      </View>

      <Text style={styles.versionText}>Offline Capable</Text>
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
  actionButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonIcon: {
    marginRight: 10,
  },
  versionText: {
    fontSize: 14,
    color: "#aaa",
  },
});
