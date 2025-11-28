import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface TeacherHomeCardProps {
  title: string;
  subtitle?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  iconColor?: string;
  isNew?: boolean;
  style?: ViewStyle;
  titleStyle?: ViewStyle;
  subtitleStyle?: ViewStyle;
}

export const TeacherHomeCard = ({
  title,
  subtitle,
  iconName,
  onPress,
  backgroundColor = "#fff",
  textColor = "#000",
  iconColor = "#000",
  isNew = false,
  style,
  titleStyle,
  subtitleStyle,
}: TeacherHomeCardProps) => {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor }, style]}
      onPress={onPress}
    >
      {isNew && <Text style={styles.newBadge}>New</Text>}
      <View style={styles.content}>
        {iconName && (
          <Ionicons
            name={iconName}
            size={30}
            color={iconColor}
            style={styles.icon}
          />
        )}
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: textColor }, titleStyle]}>
            {title}
          </Text>
          {subtitle && (
            <Text
              style={[styles.subtitle, { color: textColor }, subtitleStyle]}
            >
              {subtitle}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    padding: 20,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  newBadge: {
    position: "absolute",
    top: 10,
    right: 15,
    backgroundColor: "#4CAF50", // Green for New badge
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    zIndex: 1,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 5,
  },
});

