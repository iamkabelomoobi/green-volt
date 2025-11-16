import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" />
      <Stack.Screen name="RegisterScreen" />
      <Stack.Screen name="ForgotPasswordScreen" />
      <Stack.Screen name="OtpVerificationScreen" />
      <Stack.Screen name="ResetPasswordScreen" />
    </Stack>
  );
};

export default AuthLayout;
