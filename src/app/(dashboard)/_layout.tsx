import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform, View } from "react-native";

export default function RootLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#1DBC60",
                tabBarInactiveTintColor: "#8E8E93",
                tabBarStyle: {
                    backgroundColor: "#FFFFFF",
                    borderTopWidth: 1,
                    borderTopColor: "#E5E5EA",
                    height: Platform.OS === "ios" ? 85 : 65,
                    paddingBottom: Platform.OS === "ios" ? 25 : 10,
                    paddingTop: 10,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: -2,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 3.84,
                    elevation: 5,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600",
                    marginTop: 4,
                },
                tabBarIconStyle: {
                    marginBottom: 2,
                },
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={{
                            backgroundColor: focused ? "#1DBC60" : "transparent",
                            borderRadius: 20,
                            padding: focused ? 8 : 4,
                            width: 36,
                            height: 36,
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <Ionicons
                                name={focused ? "home" : "home-outline"}
                                size={focused ? 20 : size}
                                color={focused ? "#FFFFFF" : color}
                            />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="Categories"
                options={{
                    title: "Categorias",
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={{
                            backgroundColor: focused ? "#1DBC60" : "transparent",
                            borderRadius: 20,
                            padding: focused ? 8 : 4,
                            width: 36,
                            height: 36,
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <Ionicons
                                name={focused ? "grid" : "grid-outline"}
                                size={focused ? 20 : size}
                                color={focused ? "#FFFFFF" : color}
                            />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="Cart"
                options={{
                    title: "Carrinho",
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={{
                            backgroundColor: focused ? "#1DBC60" : "transparent",
                            borderRadius: 20,
                            padding: focused ? 8 : 4,
                            width: 36,
                            height: 36,
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <Ionicons
                                name={focused ? "cart" : "cart-outline"}
                                size={focused ? 20 : size}
                                color={focused ? "#FFFFFF" : color}
                            />
                        </View>
                    ),
                    tabBarBadge: 3, // Exemplo de badge para mostrar itens no carrinho
                    tabBarBadgeStyle: {
                        backgroundColor: "#FF3B30",
                        color: "#FFFFFF",
                        fontSize: 12,
                        fontWeight: "bold",
                    },
                }}
            />
            <Tabs.Screen
                name="Requests"
                options={{
                    title: "Pedidos",
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={{
                            backgroundColor: focused ? "#1DBC60" : "transparent",
                            borderRadius: 20,
                            padding: focused ? 8 : 4,
                            width: 36,
                            height: 36,
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <Ionicons
                                name={focused ? "receipt" : "receipt-outline"}
                                size={focused ? 20 : size}
                                color={focused ? "#FFFFFF" : color}
                            />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="Profile"
                options={{
                    title: "Perfil",
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={{
                            backgroundColor: focused ? "#1DBC60" : "transparent",
                            borderRadius: 20,
                            padding: focused ? 8 : 4,
                            width: 36,
                            height: 36,
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <Ionicons
                                name={focused ? "person" : "person-outline"}
                                size={focused ? 20 : size}
                                color={focused ? "#FFFFFF" : color}
                            />
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}