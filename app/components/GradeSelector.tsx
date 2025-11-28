import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface GradeSelectorProps {
  grades: string[];
  selectedGrade: string | null;
  onSelectGrade: (grade: string) => void;
  containerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  selectedButtonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  selectedButtonTextStyle?: TextStyle;
}

export const GradeSelector = ({
  grades,
  selectedGrade,
  onSelectGrade,
  containerStyle,
  buttonStyle,
  selectedButtonStyle,
  buttonTextStyle,
  selectedButtonTextStyle,
}: GradeSelectorProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {grades.map((grade) => (
        <TouchableOpacity
          key={grade}
          style={[
            styles.button,
            buttonStyle,
            selectedGrade === grade && styles.selectedButton,
            selectedGrade === grade && selectedButtonStyle,
          ]}
          onPress={() => onSelectGrade(grade)}
        >
          <Text
            style={[
              styles.buttonText,
              buttonTextStyle,
              selectedGrade === grade && styles.selectedButtonText,
              selectedGrade === grade && selectedButtonTextStyle,
            ]}
          >
            {grade}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  button: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  selectedButton: {
    backgroundColor: "#673ab7",
    borderColor: "#673ab7",
  },
  buttonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedButtonText: {
    color: "#fff",
  },
});

