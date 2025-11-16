import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const user = {
  name: "John Doe",
  email: "john.doe@gmail.com",
  avatar: "https://randomuser.me/api/portraits/men/1.jpg",
};

const SideNav = ({ onClose }: { onClose?: () => void }) => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.sidebar}>
      {/* Header */}
      <View style={styles.profileSection}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>

      {/* Account Section */}
      <Text style={styles.sectionLabel}>Account</Text>
      <View style={styles.sectionBox}>
        <SideNavRow
          icon={<FontAwesome name="user-o" size={20} color="#222" />}
          label="Profile"
          onPress={() => navigation.navigate("ProfileScreen")}
        />
        <SideNavRow
          icon={<Feather name="shield" size={20} color="#222" />}
          label="Security"
          onPress={() => navigation.navigate("SecurityScreen")}
        />
        <SideNavRow
          icon={<MaterialIcons name="lock-outline" size={20} color="#222" />}
          label="Privacy"
          onPress={() => navigation.navigate("PrivacyScreen")}
        />
        <SideNavRow
          icon={
            <Ionicons name="notifications-outline" size={20} color="#222" />
          }
          label="Notifications"
          onPress={() => navigation.navigate("NotificationsScreen")}
        />
      </View>

      {/* Personalization Section */}
      <Text style={styles.sectionLabel}>Personalization</Text>
      <View style={styles.sectionBox}>
        <SideNavRow
          icon={<Feather name="moon" size={20} color="#222" />}
          label="Dark Mode"
        />
        <SideNavRow
          icon={<Feather name="eye" size={20} color="#222" />}
          label="Appearance"
        />
        <SideNavRow
          icon={<Feather name="globe" size={20} color="#222" />}
          label="Language"
        />
        <SideNavRow
          icon={<Feather name="layout" size={20} color="#222" />}
          label="Theme"
        />
        <SideNavRow
          icon={<Feather name="folder" size={20} color="#222" />}
          label="Manage Content"
        />
      </View>

      {onClose && (
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Ionicons name="close" size={28} color="#222" />
        </TouchableOpacity>
      )}

      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutRow}>
          <Feather name="log-out" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SideNavRow = ({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}) => {
  const RowContent = (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        {icon}
        <Text style={styles.rowLabel}>{label}</Text>
      </View>
      <Feather name="chevron-right" size={18} color="#bbb" />
    </View>
  );
  return onPress ? (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      {RowContent}
    </TouchableOpacity>
  ) : (
    RowContent
  );
};

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 48,
    paddingHorizontal: 18,
    width: 290,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 14,
    backgroundColor: "#eee",
  },
  name: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#222",
  },
  email: {
    color: "#888",
    fontSize: 13,
    marginTop: 2,
  },
  sectionLabel: {
    fontWeight: "bold",
    color: "#222",
    fontSize: 14,
    marginBottom: 8,
    marginTop: 10,
  },
  sectionBox: {
    backgroundColor: "#f6f6f8",
    borderRadius: 14,
    marginBottom: 18,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
    justifyContent: "space-between",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowLabel: {
    marginLeft: 14,
    fontSize: 15,
    color: "#222",
  },
  logoutContainer: {
    position: "absolute",
    bottom: 32,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e11d48",
    borderRadius: 24,
    paddingVertical: 13,
    paddingHorizontal: 36,
    alignSelf: "center",
  },
  logoutText: {
    marginLeft: 14,
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  closeBtn: {
    position: "absolute",
    top: 18,
    right: 18,
    padding: 8,
  },
});

export default SideNav;
