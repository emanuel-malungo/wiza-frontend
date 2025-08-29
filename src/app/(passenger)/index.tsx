import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useRef } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	StatusBar,
	Modal,
	ScrollView,
	Animated,
	Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

interface TaxiDriver {
  id: string;
  name: string;
  rating: number;
  vehicleModel: string;
  plateNumber: string;
  estimatedArrival: string;
  price: string;
  latitude: number;
  longitude: number;
  distance: string;
}

interface RecentLocation {
  id: string;
  name: string;
  address: string;
  type: 'home' | 'work' | 'recent';
  icon: keyof typeof Ionicons.glyphMap;
}

const { width, height } = Dimensions.get('window');

const Home = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<TaxiDriver | null>(null);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [activeInput, setActiveInput] = useState<'origin' | 'destination'>('origin');
  const [tripRequested, setTripRequested] = useState(false);
  
  const mapRef = useRef<MapView>(null);
  const slideAnim = useRef(new Animated.Value(height)).current;

  // Localização inicial (Luanda, Angola)
  const initialRegion = {
    latitude: -8.8390,
    longitude: 13.2894,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // Motoristas próximos mockados
  const nearbyDrivers: TaxiDriver[] = [
    {
      id: '1',
      name: 'João Silva',
      rating: 4.8,
      vehicleModel: 'Toyota Hiace',
      plateNumber: 'LD-123-45',
      estimatedArrival: '3 min',
      price: 'Kz 850',
      latitude: -8.8380,
      longitude: 13.2884,
      distance: '0.5 km'
    },
    {
      id: '2',
      name: 'Maria Santos',
      rating: 4.9,
      vehicleModel: 'Nissan Urvan',
      plateNumber: 'LD-678-90',
      estimatedArrival: '5 min',
      price: 'Kz 750',
      latitude: -8.8400,
      longitude: 13.2904,
      distance: '0.8 km'
    },
    {
      id: '3',
      name: 'Carlos Mendes',
      rating: 4.7,
      vehicleModel: 'Toyota Coaster',
      plateNumber: 'LD-345-67',
      estimatedArrival: '7 min',
      price: 'Kz 900',
      latitude: -8.8370,
      longitude: 13.2914,
      distance: '1.2 km'
    }
  ];

  // Localizações recentes e favoritas
  const recentLocations: RecentLocation[] = [
    {
      id: '1',
      name: 'Casa',
      address: 'Maianga, Luanda',
      type: 'home',
      icon: 'home'
    },
    {
      id: '2',
      name: 'Trabalho',
      address: 'Talatona, Luanda',
      type: 'work',
      icon: 'business'
    },
    {
      id: '3',
      name: 'Shopping Fortaleza',
      address: 'Talatona, Luanda',
      type: 'recent',
      icon: 'storefront'
    },
    {
      id: '4',
      name: 'Aeroporto Internacional',
      address: 'Luanda, Angola',
      type: 'recent',
      icon: 'airplane'
    }
  ];

  const handleLocationSelect = (location: RecentLocation) => {
    if (activeInput === 'origin') {
      setOrigin(location.name);
    } else {
      setDestination(location.name);
    }
    setSearchModalVisible(false);
  };

  const openSearchModal = (inputType: 'origin' | 'destination') => {
    setActiveInput(inputType);
    setSearchModalVisible(true);
  };

  const handleRequestTrip = () => {
    if (!origin || !destination) {
      Alert.alert('Atenção', 'Por favor, informe origem e destino da viagem.');
      return;
    }
    
    setShowDriverModal(true);
    animateSlideUp();
  };

  const animateSlideUp = () => {
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 50,
      friction: 8,
    }).start();
  };

  const animateSlideDown = () => {
    Animated.spring(slideAnim, {
      toValue: height,
      useNativeDriver: true,
      tension: 50,
      friction: 8,
    }).start(() => {
      setShowDriverModal(false);
      setSelectedDriver(null);
    });
  };

  const confirmDriver = (driver: TaxiDriver) => {
    setSelectedDriver(driver);
    setTripRequested(true);
    animateSlideDown();
    
    Alert.alert(
      'Viagem Confirmada!',
      `${driver.name} está a caminho.\nTempo estimado: ${driver.estimatedArrival}\nVeículo: ${driver.vehicleModel} (${driver.plateNumber})`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Map View */}
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton={false}
        toolbarEnabled={false}
      >
        {/* Motoristas próximos */}
        {nearbyDrivers.map((driver) => (
          <Marker
            key={driver.id}
            coordinate={{
              latitude: driver.latitude,
              longitude: driver.longitude,
            }}
          >
            <View style={styles.driverMarker}>
              <Ionicons name="car" size={20} color="#FFFFFF" />
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Header com Logo */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="car" size={24} color="#1976D2" />
          <Text style={styles.logoText}>Wiza</Text>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="person-circle" size={28} color="#1976D2" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Container */}
      <View style={styles.searchContainer}>
        <View style={styles.searchCard}>
          {/* Campo Origem */}
          <TouchableOpacity 
            style={styles.searchField}
            onPress={() => openSearchModal('origin')}
          >
            <View style={styles.searchIcon}>
              <View style={styles.originDot} />
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="De onde?"
              placeholderTextColor="#9CA3AF"
              value={origin}
              editable={false}
              pointerEvents="none"
            />
            {origin ? (
              <TouchableOpacity onPress={() => setOrigin('')}>
                <Ionicons name="close-circle" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ) : null}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.searchDivider}>
            <View style={styles.dividerLine} />
          </View>

          {/* Campo Destino */}
          <TouchableOpacity 
            style={styles.searchField}
            onPress={() => openSearchModal('destination')}
          >
            <View style={styles.searchIcon}>
              <View style={styles.destinationDot} />
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Para onde?"
              placeholderTextColor="#9CA3AF"
              value={destination}
              editable={false}
              pointerEvents="none"
            />
            {destination ? (
              <TouchableOpacity onPress={() => setDestination('')}>
                <Ionicons name="close-circle" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ) : null}
          </TouchableOpacity>
        </View>

        {/* Botão Confirmar Viagem */}
        {origin && destination && (
          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={handleRequestTrip}
          >
            <LinearGradient
              colors={['#4CAF50', '#45A049']}
              style={styles.confirmGradient}
            >
              <Ionicons name="car" size={24} color="#FFFFFF" />
              <Text style={styles.confirmButtonText}>Confirmar Viagem</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.quickActionItem}>
            <View style={styles.quickActionIcon}>
              <Ionicons name="home" size={20} color="#1976D2" />
            </View>
            <Text style={styles.quickActionText}>Casa</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionItem}>
            <View style={styles.quickActionIcon}>
              <Ionicons name="business" size={20} color="#4CAF50" />
            </View>
            <Text style={styles.quickActionText}>Trabalho</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionItem}>
            <View style={styles.quickActionIcon}>
              <Ionicons name="airplane" size={20} color="#FF9800" />
            </View>
            <Text style={styles.quickActionText}>Aeroporto</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionItem}>
            <View style={styles.quickActionIcon}>
              <Ionicons name="medical" size={20} color="#F44336" />
            </View>
            <Text style={styles.quickActionText}>Hospital</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* My Location Button */}
      <TouchableOpacity style={styles.myLocationButton}>
        <Ionicons name="locate" size={24} color="#1976D2" />
      </TouchableOpacity>

      {/* Search Modal */}
      <Modal
        visible={searchModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setSearchModalVisible(false)}>
              <Ionicons name="arrow-back" size={24} color="#1F2937" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {activeInput === 'origin' ? 'De onde?' : 'Para onde?'}
            </Text>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.modalSearch}>
            <View style={styles.modalSearchIcon}>
              <Ionicons name="search" size={20} color="#9CA3AF" />
            </View>
            <TextInput
              style={styles.modalSearchInput}
              placeholder="Digite o endereço..."
              placeholderTextColor="#9CA3AF"
              autoFocus
            />
          </View>

          <ScrollView style={styles.modalContent}>
            <Text style={styles.sectionTitle}>Locais Salvos</Text>
            
            {recentLocations.map((location) => (
              <TouchableOpacity
                key={location.id}
                style={styles.locationItem}
                onPress={() => handleLocationSelect(location)}
              >
                <View style={[
                  styles.locationIcon,
                  { backgroundColor: location.type === 'home' ? '#E3F2FD' : 
                    location.type === 'work' ? '#E8F5E8' : '#FFF3E0' }
                ]}>
                  <Ionicons 
                    name={location.icon} 
                    size={20} 
                    color={location.type === 'home' ? '#1976D2' : 
                      location.type === 'work' ? '#4CAF50' : '#FF9800'}
                  />
                </View>
                <View style={styles.locationText}>
                  <Text style={styles.locationName}>{location.name}</Text>
                  <Text style={styles.locationAddress}>{location.address}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Drivers Selection Modal */}
      <Modal
        visible={showDriverModal}
        transparent
        animationType="none"
      >
        <View style={styles.modalBackdrop}>
          <Animated.View 
            style={[
              styles.driversModal,
              { transform: [{ translateY: slideAnim }] }
            ]}
          >
            <View style={styles.modalHandle} />
            
            <View style={styles.driversHeader}>
              <Text style={styles.driversTitle}>Motoristas Disponíveis</Text>
              <TouchableOpacity onPress={animateSlideDown}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.driversList}>
              {nearbyDrivers.map((driver) => (
                <TouchableOpacity
                  key={driver.id}
                  style={styles.driverCard}
                  onPress={() => confirmDriver(driver)}
                >
                  <View style={styles.driverInfo}>
                    <View style={styles.driverAvatar}>
                      <Ionicons name="person" size={24} color="#1976D2" />
                    </View>
                    
                    <View style={styles.driverDetails}>
                      <View style={styles.driverHeader}>
                        <Text style={styles.driverName}>{driver.name}</Text>
                        <View style={styles.ratingContainer}>
                          <Ionicons name="star" size={16} color="#FFD700" />
                          <Text style={styles.rating}>{driver.rating}</Text>
                        </View>
                      </View>
                      
                      <Text style={styles.vehicleInfo}>
                        {driver.vehicleModel} • {driver.plateNumber}
                      </Text>
                      
                      <View style={styles.tripInfo}>
                        <Text style={styles.arrivalTime}>{driver.estimatedArrival}</Text>
                        <Text style={styles.distance}>{driver.distance}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.priceContainer}>
                      <Text style={styles.price}>{driver.price}</Text>
                      <Text style={styles.priceLabel}>estimado</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  map: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  logoContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1976D2',
    marginLeft: 6,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchContainer: {
    position: 'absolute',
    bottom: 140,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  searchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  searchField: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  searchIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  originDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
  },
  destinationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#F44336',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  searchDivider: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  dividerLine: {
    width: 2,
    height: 20,
    backgroundColor: '#E5E7EB',
  },
  confirmButton: {
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  confirmGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  quickActions: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  quickActionItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  myLocationButton: {
    position: 'absolute',
    bottom: 200,
    right: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  driverMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  modalSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    margin: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  modalSearchIcon: {
    marginRight: 12,
  },
  modalSearchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  locationText: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  locationAddress: {
    fontSize: 14,
    color: '#6B7280',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  driversModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.7,
    paddingBottom: 20,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  driversHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  driversTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  driversList: {
    paddingHorizontal: 20,
  },
  driverCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  driverDetails: {
    flex: 1,
  },
  driverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  vehicleInfo: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  tripInfo: {
    flexDirection: 'row',
    gap: 16,
  },
  arrivalTime: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  distance: {
    fontSize: 14,
    color: '#6B7280',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1976D2',
  },
  priceLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
});

export default Home;