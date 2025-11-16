import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/splash-icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.formWrapper}>
        <View style={styles.form}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/(auth)/OtpVerificationScreen")}
          >
            <Text style={styles.loginButtonText}>Send Reset Link</Text>
          </TouchableOpacity>

          <View style={styles.bottomRow}>
            <TouchableOpacity onPress={() => router.push("/LoginScreen")}>
              <Text style={styles.bottomLink}> Remember Password ? </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    height: 250,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 3,
  },
  logo: {
    width: 170,
    height: 90,
  },
  formWrapper: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  form: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
    shadowColor: "#27AE60",
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
    width: width,
    alignSelf: "center",
    minHeight: 500,
    marginTop: 70,
    flexGrow: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: "#888",
    textAlign: "center",
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    color: "#222",
    marginBottom: 6,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 8,
    backgroundColor: "#F9FAFB",
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  eyeIcon: {
    marginLeft: -36,
    padding: 8,
    zIndex: 1,
  },
  optionsRow: {
    flexDirection: "row",
    alignSelf: "flex-end",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  forgot: {
    color: "#27AE60",
    fontSize: 14,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  loginButton: {
    backgroundColor: "#27AE60",
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 18,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  orRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  orText: {
    color: "#888",
    fontSize: 15,
    marginHorizontal: 8,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 18,
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  socialIcon: {
    marginRight: 8,
  },
  socialText: {
    color: "#222",
    fontSize: 16,
    fontWeight: "500",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  bottomText: {
    color: "#888",
    fontSize: 15,
  },
  bottomLink: {
    color: "#27AE60",
    fontSize: 15,
    fontWeight: "500",
  },
});
