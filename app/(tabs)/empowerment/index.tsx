import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Header } from "../../components/Header";
import { i18n } from "../../utils/i18n";
import { chapters } from "./data"; // Import your chapter data

export default function EmpowermentScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={i18n.t("empowerment_guide_title")}
        onBackPress={() => router.back()}
      />
      <FlatList
        data={chapters}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: "/(tabs)/empowerment/chapter-detail",
              params: { chapterId: item.id },
            }}
            asChild
          >
            <TouchableOpacity
              style={[styles.chapterCard, { backgroundColor: item.color }]}
            >
              <Ionicons
                name={item.iconName as keyof typeof Ionicons.glyphMap}
                size={30}
                color="#fff"
              />
              <Text style={styles.chapterTitle}>{item.title}</Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0", // Light gray background
  },
  flatListContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  chapterCard: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 150, // Fixed height for cards
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
    textAlign: "center",
  },
});
