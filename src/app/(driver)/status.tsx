import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
	Alert,
	Animated,
	ScrollView,
	StatusBar,
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
  benefits: string[];
}

const Status = () => {
  const [currentStatus, setCurrentStatus] = useState<DriverStatus>('available');
  const [statusDuration, setStatusDuration] = useState('2h 15min');
  const [lastUpdate, setLastUpdate] = useState('há 3 min');
  
  // Animação para mudança de status
  const fadeAnim = new Animated.Value(1);

  const statusConfigs: Record<DriverStatus, StatusConfig> = {
    available: {
      color: '#22C55E',
      backgroundColor: '#DCFCE7',
      text: 'Disponível',
      icon: 'checkmark-circle',
      description: 'Você está visível para passageiros',
      benefits: ['Recebe novas solicitações', 'Maximiza ganhos', 'Alto score no sistema']
    },
    on_way: {
      color: '#F59E0B',
      backgroundColor: '#FEF3C7',
      text: 'A Caminho',
      icon: 'car',
      description: 'Indo buscar passageiro',
      benefits: ['Viagem garantida', 'Navegação ativa', 'Tempo estimado preciso']
    },
    busy: {
      color: '#EF4444',
      backgroundColor: '#FEE2E2',
      text: 'Em Viagem',
      icon: 'people',
      description: 'Transportando passageiros',
      benefits: ['Receita em progresso', 'Não recebe solicitações', 'Foco na segurança']
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
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      
      {/* Enhanced Header with Gradient */}
      <LinearGradient
        colors={['#1565C0', '#1976D2', '#1E88E5']}
        className="px-5 py-4 pb-6"
      >
        <View className="flex-row justify-between items-center">
          <View className="flex-1 items-center">
            <Text className="text-white text-xl font-bold">Meu Status</Text>
            <Text className="text-blue-100 text-sm mt-1">Gerencie sua disponibilidade</Text>
          </View>
          
          <TouchableOpacity 
            className="bg-white/20 p-2.5 rounded-full" 
            onPress={openSettings}
          >
            <Ionicons name="settings" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-5">
          
          {/* Status Principal Card */}
          <Animated.View 
            className="bg-white rounded-3xl p-8 mb-6 items-center shadow-lg"
            style={{ 
              backgroundColor: currentConfig.backgroundColor,
              opacity: fadeAnim,
              borderLeftWidth: 6,
              borderLeftColor: currentConfig.color
            }}
          >
            <View className="bg-white/50 p-4 rounded-full mb-4">
              <Ionicons 
                name={currentConfig.icon} 
                size={48} 
                color={currentConfig.color} 
              />
            </View>
            
            <Text 
              className="text-2xl font-bold mb-2 text-center"
              style={{ color: currentConfig.color }}
            >
              {currentConfig.text}
            </Text>
            
            <Text className="text-gray-600 text-center text-base mb-4">
              {currentConfig.description}
            </Text>

            {/* Status Benefits */}
            <View className="w-full mt-4">
              {currentConfig.benefits.map((benefit, index) => (
                <View key={index} className="flex-row items-center mb-2">
                  <Ionicons name="checkmark-circle" size={16} color={currentConfig.color} />
                  <Text className="text-gray-700 text-sm ml-2 flex-1">{benefit}</Text>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* Status Cards Grid */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-900 mb-4">Alterar Status</Text>
            
            <View className="space-y-3">
              {Object.entries(statusConfigs).map(([status, config]) => (
                <TouchableOpacity
                  key={status}
                  className={`bg-white rounded-2xl p-4 border-2 ${
                    currentStatus === status 
                      ? 'border-opacity-100 shadow-md' 
                      : 'border-gray-100 shadow-sm'
                  }`}
                  style={{ 
                    borderColor: currentStatus === status ? config.color : '#F3F4F6',
                    backgroundColor: currentStatus === status ? config.backgroundColor : '#FFFFFF'
                  }}
                  onPress={() => handleStatusChange(status as DriverStatus)}
                >
                  <View className="flex-row items-center">
                    <View 
                      className={`w-12 h-12 rounded-xl justify-center items-center mr-4 ${
                        currentStatus === status ? 'bg-white' : 'bg-gray-50'
                      }`}
                      style={{
                        backgroundColor: currentStatus === status ? config.color : '#F9FAFB'
                      }}
                    >
                      <Ionicons 
                        name={config.icon} 
                        size={24} 
                        color={currentStatus === status ? '#FFFFFF' : config.color}
                      />
                    </View>
                    
                    <View className="flex-1">
                      <Text 
                        className={`text-base font-semibold mb-1 ${
                          currentStatus === status ? 'text-gray-900' : 'text-gray-800'
                        }`}
                      >
                        {config.text}
                      </Text>
                      <Text className="text-gray-500 text-sm">
                        {config.description}
                      </Text>
                    </View>
                    
                    {currentStatus === status && (
                      <View className="ml-2">
                        <Ionicons 
                          name="radio-button-on" 
                          size={20} 
                          color={config.color}
                        />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Status Info Card */}
          <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Informações do Status
            </Text>
            
            <View className="space-y-3">
              <View className="flex-row items-center">
                <View className="bg-blue-50 p-2 rounded-lg mr-3">
                  <Ionicons name="time-outline" size={16} color="#3B82F6" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 font-medium">Duração</Text>
                  <Text className="text-gray-500 text-sm">
                    {currentConfig.text} há {statusDuration}
                  </Text>
                </View>
              </View>
              
              <View className="flex-row items-center">
                <View className="bg-green-50 p-2 rounded-lg mr-3">
                  <Ionicons name="refresh-outline" size={16} color="#10B981" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 font-medium">Última atualização</Text>
                  <Text className="text-gray-500 text-sm">{lastUpdate}</Text>
                </View>
              </View>

              <View className="flex-row items-center">
                <View className="bg-yellow-50 p-2 rounded-lg mr-3">
                  <Ionicons name="location-outline" size={16} color="#F59E0B" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 font-medium">Localização</Text>
                  <Text className="text-gray-500 text-sm">Luanda, Angola</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Suggestion Card */}
          {currentStatus === 'available' && (
            <View className="bg-amber-50 rounded-2xl p-4 border-l-4 border-amber-400 mb-20">
              <View className="flex-row items-center mb-3">
                <View className="bg-amber-100 p-2 rounded-lg mr-3">
                  <Ionicons name="bulb" size={18} color="#F59E0B" />
                </View>
                <Text className="text-amber-800 font-semibold text-base">
                  Dica Inteligente
                </Text>
              </View>
              <Text className="text-amber-700 text-sm leading-5">
                Você está disponível há {statusDuration}. Para maximizar seus ganhos, 
                considere se mover para áreas com maior demanda como centros comerciais ou estações de transporte.
              </Text>
            </View>
          )}

          {currentStatus === 'busy' && (
            <View className="bg-blue-50 rounded-2xl p-4 border-l-4 border-blue-400 mb-20">
              <View className="flex-row items-center mb-3">
                <View className="bg-blue-100 p-2 rounded-lg mr-3">
                  <Ionicons name="shield-checkmark" size={18} color="#3B82F6" />
                </View>
                <Text className="text-blue-800 font-semibold text-base">
                  Segurança em Viagem
                </Text>
              </View>
              <Text className="text-blue-700 text-sm leading-5">
                Lembre-se: mantenha o cinto de segurança, respeite as leis de trânsito 
                e ofereça um serviço cordial aos passageiros.
              </Text>
            </View>
          )}
          
        </View>
      </ScrollView>

      {/* Enhanced FAB */}
      <View className="absolute bottom-8 right-5 items-center">
        <TouchableOpacity 
          className="bg-blue-600 w-16 h-16 rounded-full justify-center items-center shadow-xl"
          style={{
            shadowColor: '#3B82F6',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.3,
            shadowRadius: 16,
            elevation: 8,
          }}
          onPress={cycleStatus}
        >
          <Ionicons name="refresh" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Status;