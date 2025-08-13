import { Text, View, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-[#D3F6E7] px-6">
      {/* Logo */}
      <Image
        source={require("@/assets/img/iconWiza.png")}
        className="w-32 h-32 mb-6"
        resizeMode="contain"
      />

      {/* Botão Login */}
      <TouchableOpacity
        className="w-full bg-[#34DB7B] rounded-full p-4 mb-4"
        onPress={() => router.push("/(auth)")}
      >
        <Text className="text-center text-white font-bold">Entrar</Text>
      </TouchableOpacity>

        <TouchableOpacity
        className="w-full bg-[#34DB7B] rounded-full p-4 mb-4"
        onPress={() => router.push("/(dashboard)")}
      >
        <Text className="text-center text-white font-bold">Home</Text>
      </TouchableOpacity>

      {/* Botão Criar Conta */}
      <TouchableOpacity
        className="w-full bg-white rounded-full p-4 border border-[#34DB7B]"
        onPress={() => router.push("/(auth)/Register")}
      >
        <Text className="text-center text-[#34DB7B] font-bold">Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
}
