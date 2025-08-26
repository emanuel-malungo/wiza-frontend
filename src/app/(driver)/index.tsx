import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
	Image,
	RefreshControl,
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
  distance: string;
  pickupTime: string;
}

interface DailyStats {
  totalEarnings: string;
  completedTrips: number;
  hoursOnline: string;
  rating: number;
}

export default function Home() {
  const [driverStatus, setDriverStatus] = useState<'available' | 'on_way' | 'busy'>('available');
  const [refreshing, setRefreshing] = useState(false);
  const hasNotifications = true;

  const dailyStats: DailyStats = {
    totalEarnings: 'Kz 5.250',
    completedTrips: 8,
    hoursOnline: '6h 30min',
    rating: 4.8
  };

  const mockTrips: Trip[] = [
    {
      id: '1',
      origin: 'Maianga',
      destination: 'Miramar',
      estimatedTime: '8 min',
      passengers: 2,
      paymentMethod: 'tds',
      price: 'Kz 850',
      distance: '5.2 km',
      pickupTime: '14:30'
    },
    {
      id: '2',
      origin: 'Viana',
      destination: 'Talatona',
      estimatedTime: '15 min',
      passengers: 1,
      paymentMethod: 'cash',
      price: 'Kz 1.200',
      distance: '12.8 km',
      pickupTime: '15:00'
    },
    {
      id: '3',
      origin: 'Cacuaco',
      destination: 'Centro',
      estimatedTime: '25 min',
      passengers: 3,
      paymentMethod: 'tds',
      price: 'Kz 1.500',
      distance: '18.5 km',
      pickupTime: '15:45'
    }
  ];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const toggleStatus = () => {
    setDriverStatus(prev => {
      if (prev === 'available') return 'on_way';
      if (prev === 'on_way') return 'busy';
      return 'available';
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      
      {/* Enhanced Header with Gradient */}
      <LinearGradient
        colors={['#1565C0', '#1976D2', '#1E88E5']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
			{/* icon (logo) app Wiza */}
			<View style={styles.logoContainer}>
				<Image
					source={require('../../assets/img/iconWiza.png')}
					style={styles.logo}
					resizeMode="contain"
				/>
			</View>
          </View>
          
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.walletButton}>
              <Ionicons name="wallet" size={20} color="#FFFFFF" />
              <Text style={styles.walletAmount}>Kz 5.250</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications" size={24} color="#FFFFFF" />
              {hasNotifications && <View style={styles.notificationBadge} />}
            </TouchableOpacity>
          </View>
        </View>

        {/* Driver Status Toggle */}
        {/* <View style={styles.statusContainer}>
          <TouchableOpacity 
            style={[
              styles.statusToggle,
              { backgroundColor: driverStatus === 'available' ? '#4CAF50' : '#FF5722' }
            ]}
            onPress={toggleStatus}
          >
            <View style={styles.statusIndicator}>
              <View style={[
                styles.statusDot,
                { backgroundColor: driverStatus === 'available' ? '#81C784' : '#FF8A65' }
              ]} />
              <Text style={styles.statusToggleText}>
                {driverStatus === 'available' ? 'DISPONÍVEL' : 
                 driverStatus === 'on_way' ? 'A CAMINHO' : 'EM VIAGEM'}
              </Text>
            </View>
            <Ionicons 
              name={driverStatus === 'available' ? 'toggle' : 'toggle-outline'} 
              size={28} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
        </View> */}
      </LinearGradient>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        
        {/* Quick Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="car" size={24} color="#1976D2" />
            <Text style={styles.statNumber}>{dailyStats.completedTrips}</Text>
            <Text style={styles.statLabel}>Viagens Hoje</Text>
          </View>
          
          <View style={styles.statCard}>
            <Ionicons name="time" size={24} color="#4CAF50" />
            <Text style={styles.statNumber}>{dailyStats.hoursOnline}</Text>
            <Text style={styles.statLabel}>Tempo Online</Text>
          </View>
          
          <View style={styles.statCard}>
            <Ionicons name="star" size={24} color="#FF9800" />
            <Text style={styles.statNumber}>{dailyStats.rating}</Text>
            <Text style={styles.statLabel}>Avaliação</Text>
          </View>
        </View>

        {/* Trip Requests Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Solicitações de Viagem</Text>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>AO VIVO</Text>
            </View>
          </View>
          
          {mockTrips.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="car-outline" size={48} color="#9CA3AF" />
              <Text style={styles.emptyStateText}>Nenhuma solicitação no momento</Text>
              <Text style={styles.emptyStateSubtext}>Você receberá notificações quando houver novas viagens</Text>
            </View>
          ) : (
            mockTrips.map((trip, index) => (
              <View key={trip.id} style={[styles.tripCard, { marginTop: index === 0 ? 0 : 12 }]}>
                {/* Trip Priority Badge */}
                {/* <View style={styles.tripBadge}>
                  <Text style={styles.tripBadgeText}>NOVA</Text>
                </View> */}
                
                {/* Trip Header */}
                <View style={styles.tripHeader}>
                  <View style={styles.routeInfo}>
                    <View style={styles.routePoints}>
                      <View style={styles.originPoint} />
                      <View style={styles.routeLine} />
                      <View style={styles.destinationPoint} />
                    </View>
                    <View style={styles.routeTexts}>
                      <Text style={styles.originText}>{trip.origin}</Text>
                      <Text style={styles.destinationText}>{trip.destination}</Text>
                    </View>
                  </View>
                  <View style={styles.tripPrice}>
                    <Text style={styles.priceAmount}>{trip.price}</Text>
                    <Text style={styles.priceLabel}>estimado</Text>
                  </View>
                </View>
                
                {/* Trip Details */}
                <View style={styles.tripDetailsContainer}>
                  <View style={styles.tripDetailRow}>
                    <View style={styles.tripDetailItem}>
                      <Ionicons name="time-outline" size={16} color="#6B7280" />
                      <Text style={styles.tripDetailText}>{trip.estimatedTime}</Text>
                    </View>
                    
                    <View style={styles.tripDetailItem}>
                      <Ionicons name="location-outline" size={16} color="#6B7280" />
                      <Text style={styles.tripDetailText}>{trip.distance}</Text>
                    </View>
                    
                    <View style={styles.tripDetailItem}>
                      <Ionicons name="people-outline" size={16} color="#6B7280" />
                      <Text style={styles.tripDetailText}>{trip.passengers}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.tripDetailRow}>
                    <View style={styles.tripDetailItem}>
                      <Ionicons name="alarm-outline" size={16} color="#6B7280" />
                      <Text style={styles.tripDetailText}>Coleta: {trip.pickupTime}</Text>
                    </View>
                    
                    <View style={styles.tripDetailItem}>
                      <Ionicons 
                        name={trip.paymentMethod === 'cash' ? 'cash-outline' : 'card-outline'} 
                        size={16} 
                        color="#6B7280" 
                      />
                      <Text style={styles.tripDetailText}>
                        {trip.paymentMethod === 'cash' ? 'Dinheiro' : 'TDS'}
                      </Text>
                    </View>
                  </View>
                </View>
                
                {/* Trip Actions */}
                <View style={styles.tripActions}>
                  <TouchableOpacity style={styles.rejectButton}>
                    <Ionicons name="close" size={18} color="#EF4444" />
                    <Text style={styles.rejectButtonText}>Recusar</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.acceptButton}>
                    <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                    <Text style={styles.acceptButtonText}>Aceitar Viagem</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>

      </ScrollView>

      {/* Floating Action Menu */}
      <View style={styles.fabContainer}>
        <TouchableOpacity style={styles.fabSecondary}>
          <Ionicons name="help-circle" size={24} color="#1976D2" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.fabPrimary}>
          <Ionicons name="navigate" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 0,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoContainer: {
    // backgroundColor: 'rgba(255, 255, 255, 0.15)',
    // padding: 8,
    // borderRadius: 12,
    // marginRight: 12,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },
  logo: {
    width: 82,
    height: 42,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  subText: {
    color: '#B3E5FC',
    fontSize: 14,
    fontWeight: '400',
  },
  walletButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  walletAmount: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  notificationButton: {
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 20,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4444',
  },
  statusContainer: {
    marginTop: 8,
  },
  statusToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statusToggleText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
	marginTop: 24
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
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
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
  },
  liveText: {
    fontSize: 10,
    color: '#EF4444',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    padding: 40,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 12,
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
  tripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#1976D2',
  },
  tripBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#FF9800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tripBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  routeInfo: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 12,
  },
  routePoints: {
    alignItems: 'center',
    marginRight: 12,
  },
  originPoint: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
  },
  destinationPoint: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#EF4444',
  },
  routeTexts: {
    flex: 1,
  },
  originText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  destinationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 8,
  },
  tripPrice: {
    alignItems: 'flex-end',
  },
  priceAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1976D2',
    marginBottom: 2,
  },
  priceLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  tripDetailsContainer: {
    marginBottom: 20,
  },
  tripDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  tripDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tripDetailText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  tripActions: {
    flexDirection: 'row',
    gap: 12,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  rejectButtonText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '600',
  },
  acceptButton: {
    flex: 2,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    alignItems: 'center',
    gap: 12,
  },
  fabSecondary: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  fabPrimary: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  
  // Mantendo alguns estilos antigos para compatibilidade
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
  earningsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
});