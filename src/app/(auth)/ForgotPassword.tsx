import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';
import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ForgotPassword() {
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
                    className="w-24 h-24 mb-4"
                    resizeMode="contain"
                />

                <Text className="text-2xl font-bold text-center mt-4">
                    Recuperar Senha
                </Text>
                <Text className="text-center text-gray-500 mt-2">
                    Digite seu e-mail para enviarmos{'\n'}
                    as instruções de recuperação
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

                {/* Botão Enviar */}
                <TouchableOpacity
                    className="w-full bg-[#34DB7B] rounded-full p-4 mt-6"
                    onPress={() => console.log("sucess")} // Redirect to login after sending email
                >
                    <Text className="text-center text-white font-bold">Enviar</Text>
                </TouchableOpacity>

                {/* Voltar ao login */}
                <Text className="text-gray-500 mt-4 text-center">
                    Lembrou sua senha?{' '}
                    <Text
                        className="text-[#34DB7B]"
                        onPress={() => router.replace("/(auth)")}
                    >
                        Fazer login
                    </Text>
                </Text>
            </View>
        </View>
    );
}
