import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Register() {
    const [tipo, setTipo] = useState('cliente'); // 'cliente' ou 'vendedor'

    return (
        <LinearGradient
            colors={['#E3F2FD', '#BBDEFB', '#90CAF9']}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <View style={styles.content}>
                        {/* Logo */}
                        <View style={styles.logoContainer}>
                            <Image
                                source={require('../../assets/img/iconWiza.png')}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                            <Text style={styles.title}>
                                Criar Nova Conta
                            </Text>
                            <Text style={styles.subtitle}>
                                Cadastre-se como passageiro ou motorista
                            </Text>
                        </View>

                        {/* Toggle Cliente / Motorista */}
                        <View style={styles.toggleContainer}>
                            <View style={styles.toggleBackground}>
                                <TouchableOpacity
                                    style={[
                                        styles.toggleButton,
                                        tipo === 'cliente' && styles.toggleButtonActive
                                    ]}
                                    onPress={() => setTipo('cliente')}
                                >
                                    <Text
                                        style={[
                                            styles.toggleButtonText,
                                            tipo === 'cliente' && styles.toggleButtonTextActive
                                        ]}
                                    >
                                        Passageiro
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.toggleButton,
                                        tipo === 'vendedor' && styles.toggleButtonActive
                                    ]}
                                    onPress={() => setTipo('vendedor')}
                                >
                                    <Text
                                        style={[
                                            styles.toggleButtonText,
                                            tipo === 'vendedor' && styles.toggleButtonTextActive
                                        ]}
                                    >
                                        Motorista
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Campos do formulário */}
                        <View style={styles.formContainer}>
                            {tipo === 'cliente' ? (
                                <>
                                    {/* Nome completo */}
                                    <View style={styles.inputContainer}>
                                        <Ionicons
                                            name="person-outline"
                                            size={24}
                                            color="#1976D2"
                                            style={styles.inputIcon}
                                        />
                                        <TextInput
                                            placeholder="Nome completo"
                                            placeholderTextColor="#9CA3AF"
                                            style={styles.textInput}
                                        />
                                    </View>

                                    {/* Telefone */}
                                    <View style={styles.inputContainer}>
                                        <Ionicons
                                            name="call-outline"
                                            size={24}
                                            color="#1976D2"
                                            style={styles.inputIcon}
                                        />
                                        <TextInput
                                            placeholder="Telefone"
                                            placeholderTextColor="#9CA3AF"
                                            keyboardType="phone-pad"
                                            style={styles.textInput}
                                        />
                                    </View>

                                    {/* Email */}
                                    <View style={styles.inputContainer}>
                                        <Ionicons
                                            name="mail-outline"
                                            size={24}
                                            color="#1976D2"
                                            style={styles.inputIcon}
                                        />
                                        <TextInput
                                            placeholder="E-mail"
                                            placeholderTextColor="#9CA3AF"
                                            keyboardType="email-address"
                                            style={styles.textInput}
                                        />
                                    </View>

                                    {/* Endereço */}
                                    <View style={styles.inputContainer}>
                                        <Ionicons
                                            name="location-outline"
                                            size={24}
                                            color="#1976D2"
                                            style={styles.inputIcon}
                                        />
                                        <TextInput
                                            placeholder="Endereço"
                                            placeholderTextColor="#9CA3AF"
                                            style={styles.textInput}
                                        />
                                    </View>

                                    {/* Senha */}
                                    <View style={styles.inputContainer}>
                                        <Ionicons
                                            name="lock-closed-outline"
                                            size={24}
                                            color="#1976D2"
                                            style={styles.inputIcon}
                                        />
                                        <TextInput
                                            placeholder="Senha"
                                            placeholderTextColor="#9CA3AF"
                                            secureTextEntry
                                            style={styles.textInput}
                                        />
                                    </View>
                                </>
                            ) : (
                                <>
                                    {/* Nome completo */}
                                    <View style={styles.inputContainer}>
                                        <Ionicons
                                            name="person-outline"
                                            size={24}
                                            color="#1976D2"
                                            style={styles.inputIcon}
                                        />
                                        <TextInput
                                            placeholder="Nome completo"
                                            placeholderTextColor="#9CA3AF"
                                            style={styles.textInput}
                                        />
                                    </View>

                                    {/* NIF */}
                                    <View style={styles.inputContainer}>
                                        <Ionicons
                                            name="document-text-outline"
                                            size={24}
                                            color="#1976D2"
                                            style={styles.inputIcon}
                                        />
                                        <TextInput
                                            placeholder="NIF (opcional)"
                                            placeholderTextColor="#9CA3AF"
                                            style={styles.textInput}
                                        />
                                    </View>

                                    {/* Telefone */}
                                    <View style={styles.inputContainer}>
                                        <Ionicons
                                            name="call-outline"
                                            size={24}
                                            color="#1976D2"
                                            style={styles.inputIcon}
                                        />
                                        <TextInput
                                            placeholder="Telefone"
                                            placeholderTextColor="#9CA3AF"
                                            keyboardType="phone-pad"
                                            style={styles.textInput}
                                        />
                                    </View>

                                    {/* Email */}
                                    <View style={styles.inputContainer}>
                                        <Ionicons
                                            name="mail-outline"
                                            size={24}
                                            color="#1976D2"
                                            style={styles.inputIcon}
                                        />
                                        <TextInput
                                            placeholder="E-mail"
                                            placeholderTextColor="#9CA3AF"
                                            keyboardType="email-address"
                                            style={styles.textInput}
                                        />
                                    </View>

                                    {/* Endereço */}
                                    <View style={styles.inputContainer}>
                                        <Ionicons
                                            name="location-outline"
                                            size={24}
                                            color="#1976D2"
                                            style={styles.inputIcon}
                                        />
                                        <TextInput
                                            placeholder="Endereço"
                                            placeholderTextColor="#9CA3AF"
                                            style={styles.textInput}
                                        />
                                    </View>

                                    {/* Carta de Condução */}
                                    <View style={styles.inputContainer}>
                                        <Ionicons
                                            name="card-outline"
                                            size={24}
                                            color="#1976D2"
                                            style={styles.inputIcon}
                                        />
                                        <TextInput
                                            placeholder="Número da carta de condução"
                                            placeholderTextColor="#9CA3AF"
                                            style={styles.textInput}
                                        />
                                    </View>

                                    {/* Senha */}
                                    <View style={styles.inputContainer}>
                                        <Ionicons
                                            name="lock-closed-outline"
                                            size={24}
                                            color="#1976D2"
                                            style={styles.inputIcon}
                                        />
                                        <TextInput
                                            placeholder="Senha"
                                            placeholderTextColor="#9CA3AF"
                                            secureTextEntry
                                            style={styles.textInput}
                                        />
                                    </View>
                                </>
                            )}

                            {/* Botão Cadastrar */}
                            <TouchableOpacity
                                style={styles.registerButton}
                                onPress={() => console.log('Criar conta')}
                            >
                                <LinearGradient
                                    colors={['#1565C0', '#1976D2']}
                                    style={styles.buttonGradient}
                                >
                                    <Text style={styles.registerButtonText}>Cadastrar</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            {/* Já tem conta */}
                            <Text style={styles.loginText}>
                                Já tem uma conta?{' '}
                                <Text
                                    style={styles.loginLink}
                                    onPress={() => router.replace("/(auth)")}
                                >
                                    Fazer login
                                </Text>
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 24,
        paddingVertical: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1A202C',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#4A5568',
        textAlign: 'center',
    },
    toggleContainer: {
        marginBottom: 24,
    },
    toggleBackground: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 25,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: 'center',
    },
    toggleButtonActive: {
        backgroundColor: '#1976D2',
        shadowColor: '#1976D2',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    toggleButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6B7280',
    },
    toggleButtonTextActive: {
        color: 'white',
    },
    formContainer: {
        width: '100%',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 16,
        position: 'relative',
    },
    inputIcon: {
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 1,
    },
    textInput: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 25,
        padding: 16,
        paddingLeft: 56,
        fontSize: 16,
        color: '#1F2937',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    registerButton: {
        width: '100%',
        borderRadius: 25,
        marginVertical: 24,
        shadowColor: '#1565C0',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    buttonGradient: {
        paddingVertical: 16,
        borderRadius: 25,
        alignItems: 'center',
    },
    registerButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    loginText: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 20,
    },
    loginLink: {
        color: '#1976D2',
        fontWeight: '600',
    },
});
               