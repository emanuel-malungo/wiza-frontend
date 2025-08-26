import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
	Alert,
	Animated,
	Dimensions,
	Modal,
	Platform,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface PassengerHistory {
  id: string;
  name: string;
  time: string;
  status: 'confirmed' | 'error';
}

const CheckIn = () => {
  const [scannerActive, setScannerActive] = useState(true);
  const [manualCode, setManualCode] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'success' | 'error'>('success');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  
  // Animações
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const feedbackScale = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Mock do histórico de passageiros
  const [passengerHistory, setPassengerHistory] = useState<PassengerHistory[]>([
    { id: '1', name: 'Maria Silva', time: '14:32', status: 'confirmed' },
    { id: '2', name: 'João Santos', time: '14:15', status: 'confirmed' },
    { id: '3', name: 'Ana Costa', time: '13:58', status: 'error' }
  ]);

  // Animação da linha do scanner
  useEffect(() => {
    if (scannerActive) {
      const scanAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      );
      scanAnimation.start();
      return () => scanAnimation.stop();
    }
  }, [scannerActive, scanLineAnim]);

  // Animação de pulso para o botão de validação
  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();
    return () => pulseAnimation.stop();
  }, [pulseAnim]);

  const showHelp = () => {
    Alert.alert(
      'Como usar o Check-in',
      'Para validar um passageiro:\n\n1. Aponte a câmera para o QR Code do passageiro\n2. Aguarde a validação automática\n3. Ou digite o código de 6 dígitos no campo abaixo\n\nO sistema confirmará automaticamente se o passageiro está correto.',
      [{ text: 'Entendi' }]
    );
  };

  const simulateQRScan = () => {
    // Simular scan de QR Code
    setScannerActive(false);
    
    // Simular validação (50% chance de sucesso para demo)
    const isSuccess = Math.random() > 0.3;
    
    setTimeout(() => {
      if (isSuccess) {
        showFeedbackModal('success', 'Passageiro Confirmado!', 'Maria Santos');
      } else {
        showFeedbackModal('error', 'QR Code Inválido', 'Código não encontrado ou expirado');
      }
    }, 1000);
  };

  const validateManualCode = () => {
    if (manualCode.length !== 6) {
      Alert.alert('Erro', 'O código deve ter 6 dígitos');
      return;
    }

    // Simular validação do código
    const isSuccess = manualCode === '123456' || manualCode === '654321';
    
    if (isSuccess) {
      showFeedbackModal('success', 'Código Validado!', 'João Silva');
      setManualCode('');
    } else {
      showFeedbackModal('error', 'Código Inválido', 'Verifique o código e tente novamente');
    }
  };

  const showFeedbackModal = (type: 'success' | 'error', title: string, subtitle: string) => {
    setFeedbackType(type);
    setFeedbackMessage(title);
    setShowFeedback(true);
    
    // Animação do modal
    Animated.spring(feedbackScale, {
      toValue: 1,
      tension: 150,
      friction: 8,
      useNativeDriver: true,
    }).start();

    // Adicionar ao histórico se for sucesso
    if (type === 'success') {
      const newEntry: PassengerHistory = {
        id: Date.now().toString(),
        name: subtitle,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        status: 'confirmed'
      };
      setPassengerHistory(prev => [newEntry, ...prev.slice(0, 2)]);
    }
  };

  const closeFeedbackModal = () => {
    Animated.timing(feedbackScale, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowFeedback(false);
      setScannerActive(true);
    });
  };

  const toggleCamera = () => {
    Alert.alert('Câmera', 'Função de alternância de câmera disponível em breve!');
  };

  const scanLineTranslateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-120, 120],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F90BE" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Check-in de Passageiro</Text>
        </View>
        
        <TouchableOpacity style={styles.helpButton} onPress={showHelp}>
          <Ionicons name="help-circle" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Scanner de QR Code */}
        <View style={styles.scannerSection}>
          <Text style={styles.sectionTitle}>Scanner QR Code</Text>
          
          <View style={styles.scannerContainer}>
            <TouchableOpacity 
              style={styles.scannerArea}
              onPress={simulateQRScan}
              disabled={!scannerActive}
            >
              {/* Simulação da câmera */}
              <View style={styles.cameraView}>
                <View style={styles.scannerFrame}>
                  <View style={styles.corner} />
                  <View style={[styles.corner, styles.cornerTopRight]} />
                  <View style={[styles.corner, styles.cornerBottomLeft]} />
                  <View style={[styles.corner, styles.cornerBottomRight]} />
                  
                  {/* Linha animada do scanner */}
                  {scannerActive && (
                    <Animated.View 
                      style={[
                        styles.scanLine,
                        { transform: [{ translateY: scanLineTranslateY }] }
                      ]} 
                    />
                  )}
                </View>
                
                {!scannerActive && (
                  <View style={styles.scanningOverlay}>
                    <Ionicons name="hourglass" size={32} color="#FFFFFF" />
                    <Text style={styles.scanningText}>Validando...</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.cameraToggle} onPress={toggleCamera}>
              <Ionicons name="camera-reverse" size={24} color="#1F90BE" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.scannerHint}>
            Aponte a câmera para o QR Code do passageiro
          </Text>
        </View>

        {/* Divisor */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OU</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Validação por Código */}
        <View style={styles.manualSection}>
          <Text style={styles.sectionTitle}>Código da Viagem</Text>
          
          <View style={styles.codeInputContainer}>
            <TextInput
              style={styles.codeInput}
              value={manualCode}
              onChangeText={setManualCode}
              placeholder="Digite o código de 6 dígitos"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              maxLength={6}
              textAlign="center"
            />
          </View>
          
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <TouchableOpacity 
              style={[
                styles.validateButton,
                manualCode.length !== 6 && styles.validateButtonDisabled
              ]}
              onPress={validateManualCode}
              disabled={manualCode.length !== 6}
            >
              <Text style={styles.validateButtonText}>Validar Código</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Histórico Rápido */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Últimos Check-ins</Text>
          
          {passengerHistory.map((passenger) => (
            <View key={passenger.id} style={styles.historyItem}>
              <View style={styles.historyInfo}>
                <Ionicons 
                  name={passenger.status === 'confirmed' ? 'checkmark-circle' : 'close-circle'} 
                  size={20} 
                  color={passenger.status === 'confirmed' ? '#1DBC60' : '#FF3B30'} 
                />
                <View style={styles.historyText}>
                  <Text style={styles.historyName}>{passenger.name}</Text>
                  <Text style={styles.historyTime}>{passenger.time}</Text>
                </View>
              </View>
              <Text style={[
                styles.historyStatus,
                { color: passenger.status === 'confirmed' ? '#1DBC60' : '#FF3B30' }
              ]}>
                {passenger.status === 'confirmed' ? 'Confirmado' : 'Erro'}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Modal de Feedback */}
      <Modal
        visible={showFeedback}
        transparent
        animationType="none"
        onRequestClose={closeFeedbackModal}
      >
        <View style={styles.modalOverlay}>
          <Animated.View 
            style={[
              styles.feedbackModal,
              { 
                backgroundColor: feedbackType === 'success' ? '#1DBC60' : '#FF3B30',
                transform: [{ scale: feedbackScale }]
              }
            ]}
          >
            <Ionicons 
              name={feedbackType === 'success' ? 'checkmark-circle' : 'close-circle'} 
              size={64} 
              color="#FFFFFF" 
            />
            <Text style={styles.feedbackTitle}>{feedbackMessage}</Text>
            <Text style={styles.feedbackSubtitle}>
              {feedbackType === 'success' ? 'Passageiro validado com sucesso!' : 'Tente novamente'}
            </Text>
            
            <TouchableOpacity style={styles.feedbackButton} onPress={closeFeedbackModal}>
              <Text style={styles.feedbackButtonText}>
                {feedbackType === 'success' ? 'Continuar Viagem' : 'Tentar Novamente'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
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
  helpButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  scannerSection: {
    marginBottom: 32,
  },
  scannerContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  scannerArea: {
    width: width - 80,
    height: 240,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
  },
  cameraView: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  scannerFrame: {
    width: 200,
    height: 200,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#1F90BE',
    borderWidth: 3,
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    left: 'auto',
    borderLeftWidth: 0,
    borderRightWidth: 3,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    top: 'auto',
    borderTopWidth: 0,
    borderBottomWidth: 3,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    top: 'auto',
    left: 'auto',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 3,
    borderBottomWidth: 3,
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#1F90BE',
    shadowColor: '#1F90BE',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  scanningOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanningText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  cameraToggle: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  scannerHint: {
    textAlign: 'center',
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  manualSection: {
    marginBottom: 32,
  },
  codeInputContainer: {
    marginBottom: 20,
  },
  codeInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 4,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  validateButton: {
    backgroundColor: '#1F90BE',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  validateButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  validateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  historySection: {
    marginBottom: 100,
  },
  historyItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  historyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  historyText: {
    marginLeft: 12,
  },
  historyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  historyTime: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  historyStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedbackModal: {
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    marginHorizontal: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  feedbackTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  feedbackSubtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 24,
  },
  feedbackButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  feedbackButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CheckIn;