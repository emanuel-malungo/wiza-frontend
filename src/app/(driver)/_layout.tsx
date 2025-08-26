import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform, View } from "react-native";

export default function RootLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#FFFFFF",
                tabBarInactiveTintColor: "#B0C4DE",
                tabBarStyle: {
                    backgroundColor: "#1F90BE",
                    borderTopWidth: 0,
                    height: Platform.OS === "ios" ? 90 : 70,
                    paddingBottom: Platform.OS === "ios" ? 25 : 12,
                    paddingTop: 12,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: -3,
                    },
                    shadowOpacity: 0.15,
                    shadowRadius: 4.65,
                    elevation: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: "700",
                    marginTop: 5,
                    letterSpacing: 0.3,
                },
                tabBarIconStyle: {
                    marginBottom: 0,
                },
                headerShown: false,
            }}
        >
            {/* Home - index.tsx */}
            <Tabs.Screen
                name="index"
                options={{
                    title: "Início",
                    tabBarIcon: ({ color, focused }) => (
                        <View style={{
                            backgroundColor: focused ? "#FFFFFF20" : "transparent",
                            borderRadius: 20,
                            padding: 6,
                            alignItems: "center",
                            justifyContent: "center",
                            width: 40,
                            height: 40,
                        }}>
                            <Ionicons
                                name={focused ? "home" : "home-outline"}
                                size={22}
                                color={color}
                            />
                        </View>
                    ),
                }}
            />

            {/* Status - status.tsx */}
            <Tabs.Screen
                name="status"
                options={{
                    title: "Status",
                    tabBarIcon: ({ color, focused }) => (
                        <View style={{
                            backgroundColor: focused ? "#FFFFFF20" : "transparent",
                            borderRadius: 20,
                            padding: 6,
                            alignItems: "center",
                            justifyContent: "center",
                            width: 40,
                            height: 40,
                        }}>
                            <Ionicons
                                name={focused ? "speedometer" : "speedometer-outline"}
                                size={22}
                                color={color}
                            />
                        </View>
                    ),
                }}
            />

            {/* Check-in - check-in.tsx */}
            <Tabs.Screen
                name="check-in"
                options={{
                    title: "Check-in",
                    tabBarIcon: ({ color, focused }) => (
                        <View style={{
                            backgroundColor: focused ? "#FFFFFF20" : "transparent",
                            borderRadius: 20,
                            padding: 6,
                            alignItems: "center",
                            justifyContent: "center",
                            width: 40,
                            height: 40,
                        }}>
                            <Ionicons
                                name={focused ? "qr-code" : "qr-code-outline"}
                                size={22}
                                color={color}
                            />
                        </View>
                    ),
                }}
            />

            {/* Earnings - earnings.tsx */}
            <Tabs.Screen
                name="earnings"
                options={{
                    title: "Ganhos",
                    tabBarIcon: ({ color, focused }) => (
                        <View style={{
                            backgroundColor: focused ? "#FFFFFF20" : "transparent",
                            borderRadius: 20,
                            padding: 6,
                            alignItems: "center",
                            justifyContent: "center",
                            width: 40,
                            height: 40,
                        }}>
                            <Ionicons
                                name={focused ? "cash" : "cash-outline"}
                                size={22}
                                color={color}
                            />
                        </View>
                    ),
                }}
            />

            {/* Profile - profile.tsx */}
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Perfil",
                    tabBarIcon: ({ color, focused }) => (
                        <View style={{
                            backgroundColor: focused ? "#FFFFFF20" : "transparent",
                            borderRadius: 20,
                            padding: 6,
                            alignItems: "center",
                            justifyContent: "center",
                            width: 40,
                            height: 40,
                        }}>
                            <Ionicons
                                name={focused ? "person" : "person-outline"}
                                size={22}
                                color={color}
                            />
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}
