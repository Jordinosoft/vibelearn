import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

interface StatCardProps {
  iconName: keyof typeof Ionicons.glyphMap;
  value: string;
  label: string;
  backgroundColor: string;
  style?: ViewStyle;
}

export const StatCard = ({
  iconName,
  value,
  label,
  backgroundColor,
  style,
}: StatCardProps) => {
  return (
    <View style={[styles.card, { backgroundColor }, style]}>
      <Ionicons name={iconName} size={30} color="#fff" />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "48%",
    borderRadius: 15,
    padding: 20,
    justifyContent: "space-between",
    height: 150,
  },
  value: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    color: "#fff",
  },
});
