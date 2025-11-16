import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const ResetPasswordScreen = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordsMatch =
    password.length >= 8 &&
    confirmPassword.length >= 8 &&
    password === confirmPassword;

  const handleReset = () => {
    if (!passwordsMatch) return;

    setIsSubmitting(true);

    // TODO: call your API here
    console.log("Resetting password with:", password);

    // Simulate success
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate back to login after successful reset
      router.replace("/LoginScreen");
    }, 800);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/splash-icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.formWrapper}>
          <View style={styles.form}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <AntDesign name="arrow-left" size={22} color="#111827" />
            </TouchableOpacity>

            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>
              Enter your new password below. Make sure it’s something secure
              that you’ll remember.
            </Text>

            <Text style={styles.label}>
              New Password{" "}
              <Text style={styles.passwordHint}>(8+ characters)</Text>
            </Text>
            <View style={styles.passwordRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Enter new password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                returnKeyType="next"
              />
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
                style={styles.eyeIcon}
              >
                <AntDesign
                  name={showPassword ? "eye" : "eye-invisible"}
                  size={22}
                  color="#888"
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Re-enter new password"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                returnKeyType="done"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword((prev) => !prev)}
                style={styles.eyeIcon}
              >
                <AntDesign
                  name={showConfirmPassword ? "eye" : "eye-invisible"}
                  size={22}
                  color="#888"
                />
              </TouchableOpacity>
            </View>

            {password || confirmPassword ? (
              <Text
                style={[
                  styles.helperText,
                  !passwordsMatch && { color: "#DC2626" },
                ]}
              >
                {passwordsMatch
                  ? "Passwords match."
                  : "Passwords must be at least 8 characters and match."}
              </Text>
            ) : null}

            <TouchableOpacity
              style={[
                styles.resetButton,
                (!passwordsMatch || isSubmitting) && { opacity: 0.7 },
              ]}
              disabled={!passwordsMatch || isSubmitting}
              onPress={handleReset}
            >
              <Text style={styles.resetButtonText}>
                {isSubmitting ? "Updating..." : "Update Password"}
              </Text>
            </TouchableOpacity>

            <View style={styles.bottomRow}>
              <Text style={styles.bottomText}>Remembered your password?</Text>
              <TouchableOpacity onPress={() => router.replace("/LoginScreen")}>
                <Text style={styles.bottomLink}> Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  scrollContent: {
    flexGrow: 1,
  },

  header: {
    height: 410,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 16,
  },

  logo: {
    width: 140,
    height: 90,
    paddingBottom: 300
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
    paddingTop: 32,
    paddingBottom: 24,
    shadowColor: "#27AE60",
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
    width: width,
    alignSelf: "center",
    minHeight: 420,
    marginTop: 10,
    flexGrow: 1,
  },

  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    marginBottom: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
  },

  label: {
    fontSize: 15,
    color: "#111827",
    marginBottom: 6,
    fontWeight: "500",
  },

  passwordHint: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "400",
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
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

  helperText: {
    fontSize: 13,
    color: "#10B981",
    marginTop: 4,
    marginBottom: 8,
  },

  resetButton: {
    backgroundColor: "#27AE60",
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },

  resetButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },

  bottomText: {
    color: "#6B7280",
    fontSize: 14,
  },

  bottomLink: {
    color: "#27AE60",
    fontSize: 14,
    fontWeight: "500",
  },
});
