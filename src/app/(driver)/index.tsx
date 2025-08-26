import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
	Image,
	Platform,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Trip {
  id: string;
  origin: string;
  destination: string;
  estimatedTime: string;
  passengers: number;
  paymentMethod: 'cash' | 'tds';
  price: string;
}

export default function Home() {
  const [driverStatus, setDriverStatus] = useState<'available' | 'on_way' | 'busy'>('available');
  const hasNotifications = true;

  const mockTrips: Trip[] = [
    {
      id: '1',
      origin: 'Maianga',
      destination: 'Miramar',
      estimatedTime: '8 min',
      passengers: 2,
      paymentMethod: 'tds',
      price: 'Kz 850'
    },
    {
      id: '2',
      origin: 'Viana',
      destination: 'Talatona',
      estimatedTime: '15 min',
      passengers: 1,
      paymentMethod: 'cash',
      price: 'Kz 1.200'
    },
    {
      id: '3',
      origin: 'Cacuaco',
      destination: 'Centro',
      estimatedTime: '25 min',
      passengers: 3,
      paymentMethod: 'tds',
      price: 'Kz 1.500'
    }
  ];

  const getStatusConfig = (status: typeof driverStatus) => {
    switch (status) {
      case 'available':
        return { 
          color: '#22C55E', 
          text: 'Você está Disponível', 
          icon: 'checkmark-circle' as const 
        };
      case 'on_way':
        return { 
          color: '#F59E0B', 
          text: 'A Caminho do Passageiro', 
          icon: 'car' as const 
        };
      case 'busy':
        return { 
          color: '#EF4444', 
          text: 'Em Viagem', 
          icon: 'close-circle' as const 
        };
    }
  };

  const toggleStatus = () => {
    setDriverStatus(prev => {
      if (prev === 'available') return 'on_way';
      if (prev === 'on_way') return 'busy';
      return 'available';
    });
  };

  const currentStatus = getStatusConfig(driverStatus);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F90BE" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' }}
            style={styles.avatar}
          />
          <Text style={styles.welcomeText}>Olá, João!</Text>
        </View>
        
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications" size={24} color="#FFFFFF" />
          {hasNotifications && <View style={styles.notificationBadge} />}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Ionicons 
              name={currentStatus.icon} 
              size={32} 
              color={currentStatus.color} 
            />
            <Text style={styles.statusText}>{currentStatus.text}</Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.statusButton, { backgroundColor: currentStatus.color }]}
            onPress={toggleStatus}
          >
            <Text style={styles.statusButtonText}>Mudar Status</Text>
          </TouchableOpacity>
        </View>

        {/* Próximas Viagens */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próximas Viagens</Text>
          
          {mockTrips.map((trip) => (
            <View key={trip.id} style={styles.tripCard}>
              <View style={styles.tripHeader}>
                <View style={styles.routeContainer}>
                  <Ionicons name="location" size={16} color="#1F90BE" />
                  <Text style={styles.routeText}>
                    {trip.origin} → {trip.destination}
                  </Text>
                </View>
                <Text style={styles.priceText}>{trip.price}</Text>
              </View>
              
              <View style={styles.tripDetails}>
                <View style={styles.tripDetailItem}>
                  <Ionicons name="time" size={14} color="#6B7280" />
                  <Text style={styles.tripDetailText}>{trip.estimatedTime}</Text>
                </View>
                
                <View style={styles.tripDetailItem}>
                  <Ionicons name="people" size={14} color="#6B7280" />
                  <Text style={styles.tripDetailText}>{trip.passengers} passageiro(s)</Text>
                </View>
                
                <View style={styles.tripDetailItem}>
                  <Ionicons 
                    name={trip.paymentMethod === 'cash' ? 'cash' : 'card'} 
                    size={14} 
                    color="#6B7280" 
                  />
                  <Text style={styles.tripDetailText}>
                    {trip.paymentMethod === 'cash' ? 'Dinheiro' : 'TDS'}
                  </Text>
                </View>
              </View>
              
              <View style={styles.tripActions}>
                <TouchableOpacity style={styles.rejectButton}>
                  <Text style={styles.rejectButtonText}>Recusar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.acceptButton}>
                  <Text style={styles.acceptButtonText}>Aceitar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Resumo de Ganhos */}
        <View style={styles.earningsCard}>
          <View style={styles.earningsHeader}>
            <Text style={styles.earningsTitle}>Seus Ganhos Hoje</Text>
            <Ionicons name="trending-up" size={20} color="#22C55E" />
          </View>
          
          <Text style={styles.earningsAmount}>Kz 5.250</Text>
          
          <View style={styles.earningsChange}>
            <Ionicons name="arrow-up" size={14} color="#22C55E" />
            <Text style={styles.earningsChangeText}>+12% vs ontem</Text>
          </View>
        </View>

      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="car" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 12,
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 12,
  },
  statusButton: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  statusButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  tripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  routeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 6,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F90BE',
  },
  tripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tripDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripDetailText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  tripActions: {
    flexDirection: 'row',
    gap: 12,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  rejectButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#22C55E',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  earningsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  earningsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  earningsAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  earningsChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  earningsChangeText: {
    fontSize: 14,
    color: '#22C55E',
    marginLeft: 4,
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