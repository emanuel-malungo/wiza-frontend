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
  driverName: string;
  driverPhoto?: string;
  vehicleModel: string;
  plateNumber: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  price: string;
  distance: string;
  duration: string;
  status: 'completed' | 'cancelled' | 'in_progress';
  rating?: number;
  paymentMethod: 'tds' | 'cash';
}

export default function Trips() {
  const [activeTab, setActiveTab] = useState<'recent' | 'upcoming'>('recent');
  const [refreshing, setRefreshing] = useState(false);

  const mockTrips: Trip[] = [
    {
      id: '1',
      driverName: 'João Santos',
      vehicleModel: 'Toyota Corolla',
      plateNumber: 'LD-45-78-KZ',
      origin: 'Maianga',
      destination: 'Miramar',
      date: '2025-09-02',
      time: '14:30',
      price: 'Kz 850',
      distance: '5.2 km',
      duration: '12 min',
      status: 'completed',
      rating: 5,
      paymentMethod: 'tds'
    },
    {
      id: '2',
      driverName: 'Maria Costa',
      vehicleModel: 'Hyundai HB20',
      plateNumber: 'LD-78-92-AN',
      origin: 'Viana',
      destination: 'Talatona',
      date: '2025-09-01',
      time: '09:15',
      price: 'Kz 1.200',
      distance: '12.8 km',
      duration: '18 min',
      status: 'completed',
      rating: 4,
      paymentMethod: 'cash'
    },
    {
      id: '3',
      driverName: 'Pedro Alves',
      vehicleModel: 'Kia Rio',
      plateNumber: 'LD-33-56-LU',
      origin: 'Cacuaco',
      destination: 'Centro',
      date: '2025-08-30',
      time: '16:45',
      price: 'Kz 1.500',
      distance: '18.5 km',
      duration: '25 min',
      status: 'cancelled',
      paymentMethod: 'tds'
    }
  ];

  const upcomingTrips: Trip[] = [
    {
      id: '4',
      driverName: 'Carlos Silva',
      vehicleModel: 'Nissan March',
      plateNumber: 'LD-12-34-BG',
      origin: 'Casa',
      destination: 'Aeroporto',
      date: '2025-09-03',
      time: '06:00',
      price: 'Kz 2.500',
      distance: '25.0 km',
      duration: '35 min',
      status: 'in_progress',
      paymentMethod: 'tds'
    }
  ];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#22C55E';
      case 'cancelled':
        return '#EF4444';
      case 'in_progress':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluída';
      case 'cancelled':
        return 'Cancelada';
      case 'in_progress':
        return 'Em andamento';
      default:
        return 'Desconhecido';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? 'star' : 'star-outline'}
        size={16}
        color="#FFC107"
      />
    ));
  };

  const renderTripCard = (trip: Trip) => (
    <View key={trip.id} style={styles.tripCard}>
      {/* Trip Status Badge */}
      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(trip.status) }]}>
        <Text style={styles.statusText}>{getStatusText(trip.status)}</Text>
      </View>

      {/* Trip Header */}
      <View style={styles.tripHeader}>
        <View style={styles.driverInfo}>
          <View style={styles.driverAvatar}>
            <Ionicons name="person" size={24} color="#1976D2" />
          </View>
          <View style={styles.driverDetails}>
            <Text style={styles.driverName}>{trip.driverName}</Text>
            <Text style={styles.vehicleInfo}>{trip.vehicleModel} • {trip.plateNumber}</Text>
          </View>
        </View>
        <View style={styles.tripPrice}>
          <Text style={styles.priceAmount}>{trip.price}</Text>
          <View style={styles.paymentMethod}>
            <Ionicons 
              name={trip.paymentMethod === 'tds' ? 'card' : 'cash'} 
              size={14} 
              color="#6B7280" 
            />
            <Text style={styles.paymentText}>
              {trip.paymentMethod === 'tds' ? 'TDS' : 'Dinheiro'}
            </Text>
          </View>
        </View>
      </View>

      {/* Route Info */}
      <View style={styles.routeContainer}>
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

      {/* Trip Details */}
      <View style={styles.tripDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="calendar-outline" size={16} color="#6B7280" />
          <Text style={styles.detailText}>{trip.date} • {trip.time}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={16} color="#6B7280" />
          <Text style={styles.detailText}>{trip.distance}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={16} color="#6B7280" />
          <Text style={styles.detailText}>{trip.duration}</Text>
        </View>
      </View>

      {/* Rating (for completed trips) */}
      {trip.status === 'completed' && trip.rating && (
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingLabel}>Sua avaliação:</Text>
          <View style={styles.starsContainer}>
            {renderStars(trip.rating)}
          </View>
        </View>
      )}

      {/* Actions */}
      <View style={styles.tripActions}>
        {trip.status === 'completed' && (
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="refresh-outline" size={16} color="#1976D2" />
            <Text style={styles.actionButtonText}>Repetir viagem</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="receipt-outline" size={16} color="#1976D2" />
          <Text style={styles.actionButtonText}>Ver recibo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'recent' && styles.activeTab]}
          onPress={() => setActiveTab('recent')}
        >
          <Text style={[styles.tabText, activeTab === 'recent' && styles.activeTabText]}>
            Recentes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Agendadas
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {activeTab === 'recent' ? (
          mockTrips.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="car-outline" size={64} color="#9CA3AF" />
              <Text style={styles.emptyStateText}>Nenhuma viagem ainda</Text>
              <Text style={styles.emptyStateSubtext}>
                Suas viagens aparecerão aqui após serem realizadas
              </Text>
            </View>
          ) : (
            <View style={styles.tripsContainer}>
              {mockTrips.map(renderTripCard)}
            </View>
          )
        ) : (
          upcomingTrips.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={64} color="#9CA3AF" />
              <Text style={styles.emptyStateText}>Nenhuma viagem agendada</Text>
              <Text style={styles.emptyStateSubtext}>
                Agende suas viagens para aparecerem aqui
              </Text>
            </View>
          ) : (
            <View style={styles.tripsContainer}>
              {upcomingTrips.map(renderTripCard)}
            </View>
          )
        )}
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -10,
    borderRadius: 25,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#1976D2',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  tripsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  tripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 8,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  vehicleInfo: {
    fontSize: 12,
    color: '#6B7280',
  },
  tripPrice: {
    alignItems: 'flex-end',
  },
  priceAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1976D2',
    marginBottom: 4,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  routePoints: {
    alignItems: 'center',
    marginRight: 16,
  },
  originPoint: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22C55E',
  },
  routeLine: {
    width: 2,
    height: 24,
    backgroundColor: '#D1D5DB',
    marginVertical: 4,
  },
  destinationPoint: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: '#EF4444',
  },
  routeTexts: {
    flex: 1,
  },
  originText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  destinationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 8,
  },
  tripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  ratingLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 8,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  tripActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: '500',
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4B5563',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
});
