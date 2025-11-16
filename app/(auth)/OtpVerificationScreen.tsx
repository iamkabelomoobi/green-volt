import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInput as RNTextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const OtpVerificationScreen = () => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputsRef = useRef<RNTextInput[]>([]);

  const handleChange = (value: string, index: number) => {
    const text = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    console.log("Resend OTP");
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

            <Text style={styles.title}>Verify OTP</Text>
            <Text style={styles.subtitle}>
              We’ve sent a 6-digit code to your email/phone. Enter it below to
              continue.
            </Text>

            <View style={styles.otpRow}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    if (ref) inputsRef.current[index] = ref;
                  }}
                  style={styles.otpInput}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  returnKeyType={index === 5 ? "done" : "next"}
                />
              ))}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoText}>Didn’t receive a code?</Text>
              <TouchableOpacity onPress={handleResend}>
                <Text style={styles.infoLink}> Resend</Text>
              </TouchableOpacity>
            </View>

            {/* You can plug in a timer here if you want */}
            {/* <Text style={styles.timerText}>Resend available in 00:30</Text> */}

            <TouchableOpacity
              style={[
                styles.verifyButton,
                otp.join("").length < 6 && { opacity: 0.7 },
              ]}
              disabled={otp.join("").length < 6 || isSubmitting}
              onPress={() => router.push("/ResetPasswordScreen")}
            >
              <Text style={styles.verifyButtonText}>
                {isSubmitting ? "Verifying..." : "Verify"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  scrollContent: {
    flexGrow: 1,
  },

 header: {
    height: 350,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 16,
  },

  logo: {
    width: 140,
    height: 90,
    paddingBottom: 250
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

  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    marginTop: 4,
  },

  otpInput: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    color: "#111827",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 16,
  },

  infoText: {
    fontSize: 14,
    color: "#6B7280",
  },

  infoLink: {
    fontSize: 14,
    color: "#27AE60",
    fontWeight: "500",
  },

  timerText: {
    fontSize: 13,
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 16,
  },

  verifyButton: {
    backgroundColor: "#27AE60",
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },

  verifyButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
