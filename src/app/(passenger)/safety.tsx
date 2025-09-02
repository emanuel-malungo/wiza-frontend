import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    Linking,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

interface SafetyFeature {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  enabled: boolean;
  type: 'toggle' | 'action' | 'info';
}

export default function Safety() {
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { id: '1', name: 'Ana Silva', phone: '+244 923 456 789', relationship: 'Mãe' },
    { id: '2', name: 'Carlos Santos', phone: '+244 912 345 678', relationship: 'Irmão' },
  ]);

  const safetyFeatures: SafetyFeature[] = [
    {
      id: '1',
      title: 'Compartilhar viagem',
      description: 'Compartilhe automaticamente sua viagem com contatos de emergência',
      icon: 'share',
      enabled: true,
      type: 'toggle'
    },
    {
      id: '2',
      title: 'Verificação de chegada',
      description: 'Receba lembretes para confirmar que chegou ao destino',
      icon: 'checkmark-circle',
      enabled: false,
      type: 'toggle'
    },
    {
      id: '3',
      title: 'Botão de emergência',
      description: 'Acesso rápido às autoridades em situações de emergência',
      icon: 'warning',
      enabled: true,
      type: 'action'
    },
    {
      id: '4',
      title: 'Gravação de áudio',
      description: 'Grave áudio durante a viagem para sua segurança',
      icon: 'mic',
      enabled: false,
      type: 'toggle'
    }
  ];

  const handleEmergencyCall = (phone: string) => {
    Alert.alert(
      'Ligar para Emergência',
      `Deseja ligar para ${phone}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Ligar', 
          onPress: () => Linking.openURL(`tel:${phone}`)
        }
      ]
    );
  };

  const handlePoliceCall = () => {
    Alert.alert(
      'Emergência Policial',
      'Deseja ligar para a Polícia Nacional?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Ligar Agora', 
          style: 'destructive',
          onPress: () => Linking.openURL('tel:111')
        }
      ]
    );
  };

  const handleSOSPress = () => {
    Alert.alert(
      '🚨 EMERGÊNCIA',
      'Isto irá enviar sua localização para contatos de emergência e autoridades. Continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'ENVIAR SOS', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('SOS Enviado', 'Sua localização foi enviada para os contatos de emergência.');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      
      {/* Header with Gradient */}
      <LinearGradient
        colors={['#1565C0', '#1976D2', '#1E88E5']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/img/iconWiza.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Emergency SOS Button */}
        <View style={styles.sosSection}>
          <TouchableOpacity style={styles.sosButton} onPress={handleSOSPress}>
            <LinearGradient
              colors={['#DC2626', '#EF4444']}
              style={styles.sosButtonGradient}
            >
              <Ionicons name="warning" size={32} color="#FFFFFF" />
              <Text style={styles.sosButtonText}>EMERGÊNCIA</Text>
              <Text style={styles.sosButtonSubtext}>Toque e segure para ativar</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.sosDescription}>
            Em caso de emergência, este botão enviará sua localização atual para seus contatos de emergência e autoridades
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard} onPress={handlePoliceCall}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#FEE2E2' }]}>
                <Ionicons name="shield" size={24} color="#DC2626" />
              </View>
              <Text style={styles.quickActionText}>Polícia</Text>
              <Text style={styles.quickActionSubtext}>111</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => handleEmergencyCall('118')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#FEF3C7' }]}>
                <Ionicons name="medical" size={24} color="#D97706" />
              </View>
              <Text style={styles.quickActionText}>SAMU</Text>
              <Text style={styles.quickActionSubtext}>118</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => handleEmergencyCall('119')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#FEE2E2' }]}>
                <Ionicons name="flame" size={24} color="#DC2626" />
              </View>
              <Text style={styles.quickActionText}>Bombeiros</Text>
              <Text style={styles.quickActionSubtext}>119</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#E0F2FE' }]}>
                <Ionicons name="car" size={24} color="#0369A1" />
              </View>
              <Text style={styles.quickActionText}>Wiza</Text>
              <Text style={styles.quickActionSubtext}>Suporte</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Emergency Contacts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Contatos de Emergência</Text>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add" size={20} color="#1976D2" />
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>

          {emergencyContacts.map((contact) => (
            <View key={contact.id} style={styles.contactCard}>
              <View style={styles.contactInfo}>
                <View style={styles.contactAvatar}>
                  <Ionicons name="person" size={24} color="#1976D2" />
                </View>
                <View style={styles.contactDetails}>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.contactPhone}>{contact.phone}</Text>
                  <Text style={styles.contactRelationship}>{contact.relationship}</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.callButton}
                onPress={() => handleEmergencyCall(contact.phone)}
              >
                <Ionicons name="call" size={20} color="#22C55E" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Safety Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recursos de Segurança</Text>
          
          {safetyFeatures.map((feature) => (
            <View key={feature.id} style={styles.featureCard}>
              <View style={styles.featureInfo}>
                <View style={[styles.featureIcon, { backgroundColor: '#E3F2FD' }]}>
                  <Ionicons name={feature.icon} size={24} color="#1976D2" />
                </View>
                <View style={styles.featureDetails}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              </View>
              {feature.type === 'toggle' && (
                <TouchableOpacity style={styles.toggleButton}>
                  <View style={[
                    styles.toggleSwitch,
                    { backgroundColor: feature.enabled ? '#22C55E' : '#D1D5DB' }
                  ]}>
                    <View style={[
                      styles.toggleKnob,
                      { transform: [{ translateX: feature.enabled ? 20 : 2 }] }
                    ]} />
                  </View>
                </TouchableOpacity>
              )}
              {feature.type === 'action' && (
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="chevron-forward" size={20} color="#6B7280" />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        {/* Safety Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dicas de Segurança</Text>
          <View style={styles.tipsContainer}>
            <View style={styles.tipCard}>
              <Ionicons name="eye" size={20} color="#1976D2" />
              <Text style={styles.tipText}>Sempre verifique a placa do veículo antes de entrar</Text>
            </View>
            <View style={styles.tipCard}>
              <Ionicons name="share" size={20} color="#1976D2" />
              <Text style={styles.tipText}>Compartilhe sua viagem com familiares e amigos</Text>
            </View>
            <View style={styles.tipCard}>
              <Ionicons name="location" size={20} color="#1976D2" />
              <Text style={styles.tipText}>Mantenha o GPS do seu celular sempre ativado</Text>
            </View>
            <View style={styles.tipCard}>
              <Ionicons name="chatbubble" size={20} color="#1976D2" />
              <Text style={styles.tipText}>Use o chat do app para se comunicar com o motorista</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 24,
    height: 24,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  sosSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  sosButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 16,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  sosButtonGradient: {
    flex: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 8,
  },
  sosButtonSubtext: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  sosDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1976D2',
    marginLeft: 4,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  quickActionSubtext: {
    fontSize: 12,
    color: '#6B7280',
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  contactPhone: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  contactRelationship: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  callButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featureInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureDetails: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 18,
  },
  toggleButton: {
    padding: 4,
  },
  toggleSwitch: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    position: 'relative',
  },
  toggleKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
  },
  actionButton: {
    padding: 4,
  },
  tipsContainer: {
    gap: 12,
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tipText: {
    fontSize: 14,
    color: '#4B5563',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
});
