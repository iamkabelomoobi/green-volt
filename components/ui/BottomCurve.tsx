import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";

const { width } = Dimensions.get("window");

export const BottomCurve = ({ onPress }: { onPress: () => void }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.curve} />
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>GET STARTED</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { width: "100%", alignItems: "center" },
  curve: {
    position: "absolute",
    bottom: 0,
    width,
    height: 105,
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    backgroundColor: "#27AE60",
    zIndex: 1,
  },
  button: {
    marginBottom: 30,
    width: "50%",
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    elevation: 2,
  },
  buttonText: { color: "#000", fontWeight: "bold", letterSpacing: 1 },
});
