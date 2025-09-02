import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
    return (
        <LinearGradient
            colors={['#E3F2FD', '#BBDEFB', '#90CAF9']}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.content}>
                    {/* Logo */}
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/img/iconWiza.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Text style={styles.welcomeTitle}>
                            Bem-vindo(a) ao Wiza
                        </Text>
                        <Text style={styles.welcomeSubtitle}>
                            Transporte inteligente e seguro{'\n'}
                            Conecte-se ao seu destino
                        </Text>
                    </View>

                    {/* Form Container */}
                    <View style={styles.formContainer}>
                        {/* Email */}
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="mail-outline"
                                size={24}
                                color="#1976D2"
                                style={styles.inputIcon}
                            />
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="email-address"
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

                        <TouchableOpacity
                            onPress={() => router.push("/(auth)/ForgotPassword")}
                            style={styles.forgotPasswordButton}
                        >
                            <Text style={styles.forgotPasswordText}>
                                Esqueci minha senha
                            </Text>
                        </TouchableOpacity>

                        {/* Botão Entrar */}
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={() => console.log('Entrar')}
                        >
                            <LinearGradient
                                colors={['#1565C0', '#1976D2']}
                                style={styles.buttonGradient}
                            >
                                <Text style={styles.loginButtonText}>Entrar</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Registrar */}
                        <Text style={styles.signupText}>
                            Não tem uma conta?{' '}
                            <Text
                                style={styles.signupLink}
                                onPress={() => router.replace("/(auth)/Register")}
                            >
                                Registre-se
                            </Text>
                        </Text>
                    </View>
                </View>
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
    content: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    welcomeTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1A202C',
        textAlign: 'center',
        marginBottom: 8,
    },
    welcomeSubtitle: {
        fontSize: 16,
        color: '#4A5568',
        textAlign: 'center',
        lineHeight: 22,
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
    forgotPasswordButton: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotPasswordText: {
        color: '#1976D2',
        fontSize: 14,
        fontWeight: '500',
    },
    loginButton: {
        width: '100%',
        borderRadius: 25,
        marginBottom: 24,
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
    loginButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    signupText: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
    },
    signupLink: {
        color: '#1976D2',
        fontWeight: '600',
    },
});
