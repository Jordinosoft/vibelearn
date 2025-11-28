import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  backgroundColor?: string;
  textColor?: string;
  backButtonColor?: string;
}

export const Header = ({
  title,
  onBackPress,
  backgroundColor = "#fff",
  textColor = "#000",
  backButtonColor = "#000",
}: HeaderProps) => {
  return (
    <View style={[styles.header, { backgroundColor }]}>
      {onBackPress && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={backButtonColor} />
        </TouchableOpacity>
      )}
      <Text style={[styles.headerTitle, { color: textColor }]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    paddingRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
