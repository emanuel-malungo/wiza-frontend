import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
	Alert,
	Image,
	Modal,
	Platform,
	ScrollView,
	StatusBar,
	StyleSheet,
	Switch,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Document {
  id: string;
  name: string;
  status: 'valid' | 'expired' | 'pending';
  expiryDate: string;
}

interface DriverStats {
  rating: number;
  totalTrips: number;
  avgWaitTime: string;
}

const Profile = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
  // Dados mockados do motorista
  const driverInfo = {
    name: 'João Manuel Santos',
    license: 'Licença: 203-AX',
    phone: '+244 923 456 789',
    email: 'joao.santos@email.com',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    isVerified: true
  };

  const vehicleInfo = {
    model: 'Toyota Corolla',
    color: 'Branco',
    plate: 'LD-45-78-AX',
    year: '2020'
  };

  const documents: Document[] = [
    { id: '1', name: 'CNH', status: 'valid', expiryDate: '15/12/2025' },
    { id: '2', name: 'Licença do Táxi', status: 'valid', expiryDate: '30/06/2025' },
    { id: '3', name: 'Seguro', status: 'expired', expiryDate: '10/08/2025' },
    { id: '4', name: 'IELT', status: 'valid', expiryDate: '20/11/2025' }
  ];

  const driverStats: DriverStats = {
    rating: 4.8,
    totalTrips: 1247,
    avgWaitTime: '3.2 min'
  };

  const getDocumentStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'valid': return '#1DBC60';
      case 'expired': return '#FF3B30';
      case 'pending': return '#FFD60A';
    }
  };

  const getDocumentStatusText = (status: Document['status']) => {
    switch (status) {
      case 'valid': return 'Válido';
      case 'expired': return 'Vencido';
      case 'pending': return 'Pendente';
    }
  };

  const openSettings = () => {
    setShowSettings(true);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  const handleEditProfile = () => {
    Alert.alert('Editar Perfil', 'Funcionalidade em desenvolvimento');
  };

  const handleEditVehicle = () => {
    Alert.alert('Editar Veículo', 'Funcionalidade em desenvolvimento');
  };

  const handleUpdateDocument = (documentName: string) => {
    Alert.alert(
      `Atualizar ${documentName}`,
      'Deseja enviar uma nova foto do documento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Câmera', onPress: () => console.log('Open camera') },
        { text: 'Galeria', onPress: () => console.log('Open gallery') }
      ]
    );
  };

  const handleSupport = () => {
    Alert.alert(
      'Suporte',
      'Como podemos ajudar?',
      [
        { text: 'Chat ao Vivo', onPress: () => console.log('Open chat') },
        { text: 'FAQ', onPress: () => console.log('Open FAQ') },
        { text: 'Ligar', onPress: () => console.log('Make call') },
        { text: 'Cancelar', style: 'cancel' }
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair da Conta',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: () => console.log('Logout') }
      ]
    );
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={`full-${i}`} name="star" size={16} color="#FFD60A" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={16} color="#FFD60A" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Ionicons key={`empty-${i}`} name="star-outline" size={16} color="#E5E7EB" />
      );
    }

    return stars;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F90BE" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Meu Perfil</Text>
        </View>
        
        <TouchableOpacity style={styles.settingsButton} onPress={openSettings}>
          <Ionicons name="settings" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Card do Motorista */}
        <View style={styles.driverCard}>
          <Image source={{ uri: driverInfo.profileImage }} style={styles.profileImage} />
          
          <View style={styles.driverInfo}>
            <View style={styles.driverNameRow}>
              <Text style={styles.driverName}>{driverInfo.name}</Text>
              {driverInfo.isVerified && (
                <Ionicons name="checkmark-circle" size={20} color="#1DBC60" />
              )}
            </View>
            <Text style={styles.driverLicense}>{driverInfo.license}</Text>
          </View>
          
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Ionicons name="create-outline" size={20} color="#1F90BE" />
          </TouchableOpacity>
        </View>

        {/* Estatísticas do Motorista */}
        <View style={styles.statsCard}>
          <Text style={styles.sectionTitle}>Estatísticas</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={styles.ratingContainer}>
                <Text style={styles.statValue}>{driverStats.rating}</Text>
                <View style={styles.starsContainer}>
                  {renderStars(driverStats.rating)}
                </View>
              </View>
              <Text style={styles.statLabel}>Avaliação</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{driverStats.totalTrips.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Viagens</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{driverStats.avgWaitTime}</Text>
              <Text style={styles.statLabel}>Tempo Médio</Text>
            </View>
          </View>
        </View>

        {/* Seções de Informação */}
        
        {/* Documentos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meus Documentos</Text>
          
          {documents.map((document) => (
            <TouchableOpacity 
              key={document.id} 
              style={styles.documentCard}
              onPress={() => handleUpdateDocument(document.name)}
            >
              <View style={styles.documentLeft}>
                <View style={[
                  styles.documentIcon,
                  { backgroundColor: `${getDocumentStatusColor(document.status)}20` }
                ]}>
                  <Ionicons 
                    name="document-text" 
                    size={20} 
                    color={getDocumentStatusColor(document.status)} 
                  />
                </View>
                
                <View style={styles.documentInfo}>
                  <Text style={styles.documentName}>{document.name}</Text>
                  <Text style={styles.documentExpiry}>
                    Válido até: {document.expiryDate}
                  </Text>
                </View>
              </View>
              
              <View style={styles.documentRight}>
                <View style={[
                  styles.documentStatus,
                  { backgroundColor: getDocumentStatusColor(document.status) }
                ]}>
                  <Text style={styles.documentStatusText}>
                    {getDocumentStatusText(document.status)}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Informações Pessoais */}
        <TouchableOpacity style={styles.infoCard} onPress={handleEditProfile}>
          <View style={styles.infoCardHeader}>
            <View style={styles.infoCardLeft}>
              <Ionicons name="person" size={24} color="#1F90BE" />
              <Text style={styles.infoCardTitle}>Informações Pessoais</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </View>
          
          <View style={styles.infoCardContent}>
            <Text style={styles.infoLabel}>Telefone: {driverInfo.phone}</Text>
            <Text style={styles.infoLabel}>E-mail: {driverInfo.email}</Text>
          </View>
        </TouchableOpacity>

        {/* Veículo */}
        <TouchableOpacity style={styles.infoCard} onPress={handleEditVehicle}>
          <View style={styles.infoCardHeader}>
            <View style={styles.infoCardLeft}>
              <Ionicons name="car" size={24} color="#1F90BE" />
              <Text style={styles.infoCardTitle}>Meu Veículo</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </View>
          
          <View style={styles.infoCardContent}>
            <Text style={styles.infoLabel}>{vehicleInfo.model} {vehicleInfo.year}</Text>
            <Text style={styles.infoLabel}>Cor: {vehicleInfo.color} • Matrícula: {vehicleInfo.plate}</Text>
          </View>
        </TouchableOpacity>

        {/* Configurações e Suporte */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações</Text>
          
          <TouchableOpacity style={styles.configCard}>
            <View style={styles.configLeft}>
              <Ionicons name="card" size={24} color="#1F90BE" />
              <Text style={styles.configTitle}>Carteira & Pagamentos</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.configCard} onPress={handleSupport}>
            <View style={styles.configLeft}>
              <Ionicons name="help-circle" size={24} color="#1F90BE" />
              <Text style={styles.configTitle}>Suporte</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.configCard}>
            <View style={styles.configLeft}>
              <Ionicons name="document-text" size={24} color="#1F90BE" />
              <Text style={styles.configTitle}>Termos e Privacidade</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Rodapé Motivacional */}
        <View style={styles.motivationalCard}>
          <View style={styles.motivationalContent}>
            <Ionicons name="trophy" size={32} color="#FFD60A" />
            <Text style={styles.motivationalTitle}>Parabéns!</Text>
            <Text style={styles.motivationalText}>
              Você está entre os 10% motoristas melhor avaliados 🚀
            </Text>
          </View>
        </View>

        {/* Botão de Sair */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="exit" size={20} color="#FF3B30" />
          <Text style={styles.logoutButtonText}>Sair da Conta</Text>
        </TouchableOpacity>
        
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Modal de Configurações */}
      <Modal
        visible={showSettings}
        transparent
        animationType="slide"
        onRequestClose={closeSettings}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.settingsModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Configurações Rápidas</Text>
              <TouchableOpacity onPress={closeSettings}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="notifications" size={24} color="#1F90BE" />
                <Text style={styles.settingTitle}>Notificações</Text>
              </View>
              <Switch 
                value={notifications} 
                onValueChange={setNotifications}
                trackColor={{ false: '#E5E7EB', true: '#1F90BE40' }}
                thumbColor={notifications ? '#1F90BE' : '#9CA3AF'}
              />
            </View>
            
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="moon" size={24} color="#1F90BE" />
                <Text style={styles.settingTitle}>Modo Escuro</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="language" size={24} color="#1F90BE" />
                <Text style={styles.settingTitle}>Idioma</Text>
              </View>
              <View style={styles.settingRight}>
                <Text style={styles.settingValue}>Português</Text>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  driverCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  driverInfo: {
    flex: 1,
  },
  driverNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  driverName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginRight: 8,
  },
  driverLicense: {
    fontSize: 14,
    color: '#6B7280',
  },
  editButton: {
    padding: 8,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  ratingContainer: {
    alignItems: 'center',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  documentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  documentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  documentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  documentExpiry: {
    fontSize: 12,
    color: '#6B7280',
  },
  documentRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  documentStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 12,
  },
  infoCardContent: {
    marginLeft: 36,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  configCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  configLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  configTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 12,
  },
  motivationalCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD60A',
  },
  motivationalContent: {
    alignItems: 'center',
  },
  motivationalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#92400E',
    marginTop: 8,
    marginBottom: 8,
  },
  motivationalText: {
    fontSize: 14,
    color: '#92400E',
    textAlign: 'center',
    lineHeight: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  settingsModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    minHeight: 300,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 12,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 8,
  },
});

export default Profile;