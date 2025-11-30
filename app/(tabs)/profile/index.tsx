import { useRouter } from "expo-router";
import React, { useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { LanguageContext } from "../../_layout"; // Corrected import path
import { Header } from "../../components/Header";
import { i18n } from "../../lib/i18n";

export default function ProfileScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const languageContext = useContext(LanguageContext);

  if (!languageContext) {
    throw new Error("LanguageContext not found");
  }

  const { language: currentLocale, setLanguage } = languageContext; // Get currentLocale from context

  const toggleLanguage = () => {
    const newLocale = currentLocale === "en" ? "fr" : "en";
    console.log("Current Locale before toggle:", currentLocale); // Log
    console.log("New Locale after toggle:", newLocale); // Log
    setLanguage(newLocale);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={i18n.t("student_profile")}
        onBackPress={() => router.back()}
      />
      <View style={styles.content}>
        <Text style={styles.profileText}>{i18n.t("student_profile")}</Text>

        <View style={styles.languageSelectorContainer}>
          <Text style={styles.languageLabel}>
            {i18n.t("current_language")}:
          </Text>
          <TouchableOpacity
            onPress={toggleLanguage}
            style={styles.languageButton}
          >
            <Text style={styles.languageButtonText}>
              {currentLocale === "en" ? "English" : "Français"}
            </Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 20,
  },
  languageSelectorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
  },
  languageLabel: {
    fontSize: 16,
    marginRight: 10,
    color: "#555",
  },
  languageButton: {
    backgroundColor: "#673ab7",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  languageButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
