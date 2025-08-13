import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Register() {
    const [tipo, setTipo] = useState('cliente'); // 'cliente' ou 'vendedor'

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
                    Criar Nova Conta
                </Text>
                <Text className="text-center text-gray-500 mt-2">
                    Cadastre-se como cliente ou vendedor
                </Text>

                {/* Toggle Cliente / Vendedor */}
                <View className="flex-row w-full mt-6 mb-4 bg-white rounded-full">
                    <TouchableOpacity
                        className={`flex-1 p-3 rounded-full ${tipo === 'cliente' ? 'bg-[#34DB7B]' : ''
                            }`}
                        onPress={() => setTipo('cliente')}
                    >
                        <Text
                            className={`text-center font-bold ${tipo === 'cliente' ? 'text-white' : 'text-gray-500'
                                }`}
                        >
                            Cliente
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={`flex-1 p-3 rounded-full ${tipo === 'vendedor' ? 'bg-[#34DB7B]' : ''
                            }`}
                        onPress={() => setTipo('vendedor')}
                    >
                        <Text
                            className={`text-center font-bold ${tipo === 'vendedor' ? 'text-white' : 'text-gray-500'
                                }`}
                        >
                            Vendedor
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Campos do formulário */}
                {tipo === 'cliente' ? (
                    <>
                        {/* Nome completo */}
                        <View className="w-full mt-2 relative">
                            <AntDesign
                                name="user"
                                size={24}
                                color="black"
                                style={{ position: 'absolute', top: 16, left: 16 }}
                            />
                            <TextInput
                                placeholder="Nome completo"
                                className="w-full bg-white rounded-full p-4 pl-14"
                            />
                        </View>

                        {/* Telefone */}
                        <View className="w-full mt-2 relative">
                            <AntDesign
                                name="phone"
                                size={24}
                                color="black"
                                style={{ position: 'absolute', top: 16, left: 16 }}
                            />
                            <TextInput
                                placeholder="Telefone"
                                keyboardType="phone-pad"
                                className="w-full bg-white rounded-full p-4 pl-14"
                            />
                        </View>

                        {/* Email */}
                        <View className="w-full mt-2 relative">
                            <AntDesign
                                name="mail"
                                size={24}
                                color="black"
                                style={{ position: 'absolute', top: 16, left: 16 }}
                            />
                            <TextInput
                                placeholder="E-mail"
                                keyboardType="email-address"
                                className="w-full bg-white rounded-full p-4 pl-14"
                            />
                        </View>

                        {/* Endereço */}
                        <View className="w-full mt-2 relative">
                            <AntDesign
                                name="home"
                                size={24}
                                color="black"
                                style={{ position: 'absolute', top: 16, left: 16 }}
                            />
                            <TextInput
                                placeholder="Endereço"
                                className="w-full bg-white rounded-full p-4 pl-14"
                            />
                        </View>

                        {/* Senha */}
                        <View className="w-full mt-2 relative">
                            <AntDesign
                                name="lock"
                                size={24}
                                color="black"
                                style={{ position: 'absolute', top: 16, left: 16 }}
                            />
                            <TextInput
                                placeholder="Senha"
                                secureTextEntry
                                className="w-full bg-white rounded-full p-4 pl-14"
                            />
                        </View>
                    </>
                ) : (
                    <>
                        {/* Nome empresa ou pessoal */}
                        <View className="w-full mt-2 relative">
                            <AntDesign
                                name="idcard"
                                size={24}
                                color="black"
                                style={{ position: 'absolute', top: 16, left: 16 }}
                            />
                            <TextInput
                                placeholder="Nome da empresa ou pessoal"
                                className="w-full bg-white rounded-full p-4 pl-14"
                            />
                        </View>

                        {/* NIF */}
                        <View className="w-full mt-2 relative">
                            <AntDesign
                                name="filetext1"
                                size={24}
                                color="black"
                                style={{ position: 'absolute', top: 16, left: 16 }}
                            />
                            <TextInput
                                placeholder="NIF (opcional)"
                                className="w-full bg-white rounded-full p-4 pl-14"
                            />
                        </View>

                        {/* Telefone */}
                        <View className="w-full mt-2 relative">
                            <AntDesign
                                name="phone"
                                size={24}
                                color="black"
                                style={{ position: 'absolute', top: 16, left: 16 }}
                            />
                            <TextInput
                                placeholder="Telefone"
                                keyboardType="phone-pad"
                                className="w-full bg-white rounded-full p-4 pl-14"
                            />
                        </View>

                        {/* Email */}
                        <View className="w-full mt-2 relative">
                            <AntDesign
                                name="mail"
                                size={24}
                                color="black"
                                style={{ position: 'absolute', top: 16, left: 16 }}
                            />
                            <TextInput
                                placeholder="E-mail"
                                keyboardType="email-address"
                                className="w-full bg-white rounded-full p-4 pl-14"
                            />
                        </View>

                        {/* Endereço */}
                        <View className="w-full mt-2 relative">
                            <AntDesign
                                name="home"
                                size={24}
                                color="black"
                                style={{ position: 'absolute', top: 16, left: 16 }}
                            />
                            <TextInput
                                placeholder="Endereço"
                                className="w-full bg-white rounded-full p-4 pl-14"
                            />
                        </View>

                        {/* Senha */}
                        <View className="w-full mt-2 relative">
                            <AntDesign
                                name="lock"
                                size={24}
                                color="black"
                                style={{ position: 'absolute', top: 16, left: 16 }}
                            />
                            <TextInput
                                placeholder="Senha"
                                secureTextEntry
                                className="w-full bg-white rounded-full p-4 pl-14"
                            />
                        </View>
                    </>
                )}

                {/* Botão Cadastrar */}
                <TouchableOpacity
                    className="w-full bg-[#34DB7B] rounded-full p-4 mt-6"
                    onPress={() => console.log('Criar conta')}
                >
                    <Text className="text-center text-white font-bold">Cadastrar</Text>
                </TouchableOpacity>

                {/* Já tem conta */}
                <Text className="text-gray-500 mt-4 text-center">
                    Já tem uma conta?{' '}
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
