import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface ActionButtonProps {
  title: React.ReactNode; // Change title type to React.ReactNode
  onPress: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconColor?: string;
  iconSize?: number;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const ActionButton = ({
  title,
  onPress,
  iconName,
  style,
  textStyle,
  iconColor = "#fff",
  iconSize = 24,
  children,
  disabled = false,
}: ActionButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} disabled={disabled}>
      {iconName && (
        <Ionicons
          name={iconName}
          size={iconSize}
          color={iconColor}
          style={styles.icon}
        />
      )}
      {/* Render title as React.ReactNode */}
      {typeof title === 'string' ? (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      ) : (
        title
      )}
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center", // Vertically center content
    justifyContent: "center", // Horizontally center content
    paddingVertical: 15,
    borderRadius: 30,
    marginVertical: 10,
  },
  icon: {
    marginBottom: 5, // Space between icon and text
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'center', // Center text
  },
});
