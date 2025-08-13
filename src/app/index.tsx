import { Text, View, TouchableOpacity } from "react-native";
import { router } from "expo-router"

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-red-600" >Edit app/index.tsx to edit this screen.</Text>
      <TouchableOpacity onPress={() => router.push("/(auth)")}>
        <Text className="text-blue-600">Open Modal</Text>
      </TouchableOpacity>
    </View>
  );
}
