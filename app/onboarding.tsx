import React from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePulseAnimation } from "../hooks/usePulseAnimation";
import { BottomCurve } from "../components/ui/BottomCurve";

export default function OnboardingScreen() {
  const { scale, opacity } = usePulseAnimation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.title}>NEVER LOSE POWER!</Text>

        <View style={styles.pulseRow}>
          <View style={styles.line} />

          <Animated.Image
            source={require("../assets/images/charging.png")}
            style={[styles.icon, { transform: [{ scale }], opacity }]}
          />

          <View style={styles.line} />
        </View>
      </View>

      <BottomCurve />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  center: { alignItems: "center", paddingTop: "90%" },
  title: { fontSize: 32, fontWeight: "bold", color: "#222", letterSpacing: 1 },
  pulseRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    width: "80%",
  },
  line: { flex: 1, height: 2, backgroundColor: "#000", borderRadius: 1 },
  icon: { width: 32, height: 32, marginHorizontal: 12 },
});
