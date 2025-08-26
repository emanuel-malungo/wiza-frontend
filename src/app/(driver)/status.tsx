import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
	Alert,
	Animated,
	Platform,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type DriverStatus = 'available' | 'on_way' | 'busy';

interface StatusConfig {
  color: string;
  backgroundColor: string;
  text: string;
  icon: keyof typeof Ionicons.glyphMap;
  description: string;
}

const Status = () => {
  const [currentStatus, setCurrentStatus] = useState<DriverStatus>('available');
  const [statusDuration, setStatusDuration] = useState('2h 15min');
  const [lastUpdate, setLastUpdate] = useState('há 3 min');
  
  // Animação para mudança de status
  const fadeAnim = new Animated.Value(1);

  const statusConfigs: Record<DriverStatus, StatusConfig> = {
    available: {
      color: '#1DBC60',
      backgroundColor: '#E8F5E8',
      text: 'Disponível (A Lotar)',
      icon: 'checkmark-circle',
      description: 'Você está visível para passageiros'
    },
    on_way: {
      color: '#FFD60A',
      backgroundColor: '#FFF8E1',
      text: 'A Caminho',
      icon: 'car',
      description: 'Indo buscar passageiro'
    },
    busy: {
      color: '#FF3B30',
      backgroundColor: '#FFEBEE',
      text: 'Táxi Cheio',
      icon: 'people',
      description: 'Em viagem com passageiros'
    }
  };

  const handleStatusChange = (newStatus: DriverStatus) => {
    if (newStatus === currentStatus) return;
    
    // Animação de fade
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    
    setCurrentStatus(newStatus);
    setLastUpdate('agora');
    setStatusDuration('0min');
  };

  const cycleStatus = () => {
    const statusOrder: DriverStatus[] = ['available', 'on_way', 'busy'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    const nextStatus = statusOrder[nextIndex];
    
    Alert.alert(
      'Alterar Status',
      `Deseja mudar para "${statusConfigs[nextStatus].text}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => handleStatusChange(nextStatus) }
      ]
    );
  };

  const openSettings = () => {
    Alert.alert(
      'Configurações Rápidas',
      'Funcionalidade em desenvolvimento',
      [{ text: 'OK' }]
    );
  };

  const currentConfig = statusConfigs[currentStatus];

  // Simular atualização de tempo (em uma implementação real, seria conectado ao backend)
  useEffect(() => {
    const interval = setInterval(() => {
      // Lógica para atualizar duração do status
    }, 60000); // Atualiza a cada minuto

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F90BE" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Meu Status</Text>
        </View>
        
        <TouchableOpacity style={styles.settingsButton} onPress={openSettings}>
          <Ionicons name="settings" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        
        {/* Status Atual (Card Principal) */}
        <Animated.View 
          style={[
            styles.statusCard, 
            { 
              backgroundColor: currentConfig.backgroundColor,
              opacity: fadeAnim 
            }
          ]}
        >
          <View style={styles.statusIconContainer}>
            <Ionicons 
              name={currentConfig.icon} 
              size={64} 
              color={currentConfig.color} 
            />
          </View>
          
          <Text style={[styles.statusTitle, { color: currentConfig.color }]}>
            {currentConfig.text}
          </Text>
          
          <Text style={styles.statusDescription}>
            {currentConfig.description}
          </Text>
        </Animated.View>

        {/* Botões de Seleção de Status */}
        <View style={styles.statusButtons}>
          <Text style={styles.sectionTitle}>Alterar Status</Text>
          
          {Object.entries(statusConfigs).map(([status, config]) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.statusButton,
                currentStatus === status && styles.statusButtonActive,
                { borderColor: config.color }
              ]}
              onPress={() => handleStatusChange(status as DriverStatus)}
            >
              <View style={styles.statusButtonContent}>
                <View style={[
                  styles.statusButtonIcon,
                  currentStatus === status && { backgroundColor: config.color }
                ]}>
                  <Ionicons 
                    name={config.icon} 
                    size={24} 
                    color={currentStatus === status ? '#FFFFFF' : config.color}
                  />
                </View>
                
                <View style={styles.statusButtonText}>
                  <Text style={[
                    styles.statusButtonTitle,
                    currentStatus === status && { color: config.color }
                  ]}>
                    {config.text}
                  </Text>
                  <Text style={styles.statusButtonSubtitle}>
                    {config.description}
                  </Text>
                </View>
                
                {currentStatus === status && (
                  <Ionicons 
                    name="checkmark-circle" 
                    size={20} 
                    color={config.color}
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Informações Complementares */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Informações do Status</Text>
          
          <View style={styles.infoRow}>
            <Ionicons name="time" size={16} color="#6B7280" />
            <Text style={styles.infoText}>
              {currentConfig.text} há {statusDuration}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="refresh" size={16} color="#6B7280" />
            <Text style={styles.infoText}>
              Última atualização {lastUpdate}
            </Text>
          </View>
        </View>

        {/* Sugestão Inteligente */}
        {currentStatus === 'available' && (
          <View style={styles.suggestionCard}>
            <View style={styles.suggestionHeader}>
              <Ionicons name="bulb" size={20} color="#F59E0B" />
              <Text style={styles.suggestionTitle}>Sugestão</Text>
            </View>
            <Text style={styles.suggestionText}>
              Você está disponível há muito tempo. Considere verificar áreas com mais movimento.
            </Text>
          </View>
        )}
        
      </View>

      {/* Botão Flutuante para Alternar Status */}
      <TouchableOpacity style={styles.fab} onPress={cycleStatus}>
        <Ionicons name="refresh" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#1F90BE',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: Platform.OS === 'android' ? 15 : 15,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  settingsButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statusCard: {
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  statusIconContainer: {
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  statusDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  statusButtons: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  statusButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statusButtonActive: {
    backgroundColor: '#F8FAFC',
  },
  statusButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusButtonIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    marginRight: 16,
  },
  statusButtonText: {
    flex: 1,
  },
  statusButtonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  statusButtonSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  suggestionCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
    marginBottom: 100,
  },
  suggestionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginLeft: 8,
  },
  suggestionText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1F90BE',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default Status;