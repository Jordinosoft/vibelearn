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
  title: string;
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
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 30,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
