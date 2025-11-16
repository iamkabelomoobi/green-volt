import { Stack } from "expo-router";

const DashboardLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardScreen" />
    </Stack>
  );
};

export default DashboardLayout;
