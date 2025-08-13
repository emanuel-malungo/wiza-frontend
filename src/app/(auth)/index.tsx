import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';
import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
    return (
        <View className="flex-1 bg-gray-100">
            {/* Background image */}
            <Image
                source={require('../../assets/img/Vector 1.png')}
                className="absolute top-0 left-0"
                resizeMode="cover"
            />

            <View className="flex-1 px-6 items-center justify-center">
                {/* Logo */}
                <Image
                    source={require('../../assets/img/iconWiza.png')}
                    className="w-32 h-32"
                    resizeMode="contain"
                />
                <Text className="text-2xl font-bold text-center mt-4">
                    Bem-vindo(a) à Wiza
                </Text>
                <Text className="text-center text-gray-500 mt-2">
                    Seu marketplace de confiança{'\n'}
                    Conecte-se e comece a comprar{'\n'}
                    ou vender
                </Text>

                {/* Email */}
                <View className="w-full mt-6 relative">
                    <Ionicons
                        name="mail-outline"
                        size={24}
                        color="#6B7280"
                        style={{ position: 'absolute', top: 16, left: 16 }}
                    />
                    <TextInput
                        placeholder="Email"
                        keyboardType="email-address"
                        className="w-full bg-white rounded-full p-4 pl-14"
                    />
                </View>

                {/* Senha */}
                <View className="w-full mt-4 relative">
                    <Ionicons
                        name="lock-closed-outline"
                        size={24}
                        color="#6B7280"
                        style={{ position: 'absolute', top: 16, left: 16 }}
                    />
                    <TextInput
                        placeholder="Senha"
                        secureTextEntry
                        className="w-full bg-white rounded-full p-4 pl-14"
                    />
                </View>

                <TouchableOpacity onPress={() => router.push("/(auth)/ForgotPassword")} className='self-end' >
                    <Text className="text-[#34DB7B] mt-2">
                        Esqueci minha senha
                    </Text>
                </TouchableOpacity>

                {/* Botão Entrar */}
                <TouchableOpacity
                    className="w-full bg-[#34DB7B] rounded-full p-4 mt-6"
                    onPress={() => console.log('Entrar')}
                >
                    <Text className="text-center text-white font-bold">Entrar</Text>
                </TouchableOpacity>

                {/* Registrar */}
                <Text className="text-gray-500 mt-4 text-center">
                    Não tem uma conta?{' '}
                    <Text
                        className="text-[#34DB7B]"
                        onPress={() => router.replace("/(auth)/Register")}
                    >
                        Registre-se
                    </Text>
                </Text>
            </View>
        </View>
    );
}
