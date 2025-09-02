import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPassword() {
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
                        <Text style={styles.title}>
                            Recuperar Senha
                        </Text>
                        <Text style={styles.subtitle}>
                            Digite seu e-mail para enviarmos{'\n'}
                            as instruções de recuperação
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

                        {/* Botão Enviar */}
                        <TouchableOpacity
                            style={styles.sendButton}
                            onPress={() => console.log("success")}
                        >
                            <LinearGradient
                                colors={['#1565C0', '#1976D2']}
                                style={styles.buttonGradient}
                            >
                                <Ionicons name="mail" size={20} color="white" style={styles.buttonIcon} />
                                <Text style={styles.sendButtonText}>Enviar Instruções</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Voltar ao login */}
                        <Text style={styles.backToLoginText}>
                            Lembrou sua senha?{' '}
                            <Text
                                style={styles.backToLoginLink}
                                onPress={() => router.replace("/(auth)")}
                            >
                                Fazer login
                            </Text>
                        </Text>
                    </View>

                    {/* Additional Info */}
                    <View style={styles.infoContainer}>
                        <View style={styles.infoCard}>
                            <Ionicons name="information-circle" size={24} color="#1976D2" />
                            <Text style={styles.infoText}>
                                Verifique sua caixa de entrada e spam. 
                                Se não receber o email em alguns minutos, 
                                tente novamente.
                            </Text>
                        </View>
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
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1A202C',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#4A5568',
        textAlign: 'center',
        lineHeight: 22,
    },
    formContainer: {
        width: '100%',
        marginBottom: 30,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 24,
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
    sendButton: {
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
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonIcon: {
        marginRight: 8,
    },
    sendButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    backToLoginText: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
    },
    backToLoginLink: {
        color: '#1976D2',
        fontWeight: '600',
    },
    infoContainer: {
        marginTop: 20,
    },
    infoCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    infoText: {
        flex: 1,
        fontSize: 14,
        color: '#4A5568',
        lineHeight: 20,
        marginLeft: 12,
    },
});
