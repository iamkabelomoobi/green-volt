import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const OnboardingScreen = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.25,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.5,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, [scaleAnim, opacityAnim]);

  const handleGetStarted = () => {
    // router.push("/LoginScreen");
    // TODO: Implement navigation to LoginScreen
  };

  return (
    <LinearGradient colors={["#fff", "#fff"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.centerContent, { marginTop: -10 }]}>
          {/* <Image
            source={require("../assets/images/splash-icon.png")}
            style={styles.logo}
          /> */}
          <Text style={styles.appName}>NEVER LOSE POWER!</Text>
          <View style={styles.boltLineWrapper}>
            <View style={styles.boltLine} />
            <Animated.Image
              source={require("../assets/images/charging.png")}
              style={[
                styles.boltIcon,
                {
                  transform: [{ scale: scaleAnim }],
                  opacity: opacityAnim,
                },
              ]}
              resizeMode="contain"
            />
            <View style={styles.boltLine} />
          </View>
        </View>
        <View style={styles.bottomCurveContainer}>
          <View style={styles.bottomCurve} />
          <TouchableOpacity
            style={styles.button}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 32,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#222",
    letterSpacing: 1,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  boltLineWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 8,
    width: "80%",
    alignSelf: "center",
  },
  boltLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#000",
    opacity: 1.0,
    borderRadius: 1,
  },
  boltIcon: {
    width: 32,
    height: 32,
    marginHorizontal: 12,
  },
  bottomCurveContainer: {
    width: "100%",
    alignItems: "center",
    position: "relative",
    marginBottom: 0,
  },
  bottomCurve: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: width,
    height: 105,
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    backgroundColor: "#27AE60",
    zIndex: 1,
  },
  button: {
    position: "absolute",
    bottom: 30,
    left: width * 0.25,
    width: width * 0.5,
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    elevation: 2,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default OnboardingScreen;
