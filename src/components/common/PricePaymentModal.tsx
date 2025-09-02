import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  emoji: string;
  enabled: boolean;
  discount?: number;
}

interface PriceBreakdown {
  basePrice: number;
  distance: string;
  duration: string;
  surge?: number;
  discount?: number;
  total: number;
}

interface PricePaymentModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (paymentMethodId: string) => void;
  priceData: PriceBreakdown;
  origin: string;
  destination: string;
}

const { height } = Dimensions.get('window');

const PricePaymentModal: React.FC<PricePaymentModalProps> = ({
  visible,
  onClose,
  onConfirm,
  priceData,
  origin,
  destination
}) => {
  const [selectedPayment, setSelectedPayment] = useState<string>('cash');
  const slideAnim = useRef(new Animated.Value(height)).current;

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'cash',
      name: 'Dinheiro',
      description: 'Pagamento em dinheiro físico',
      icon: 'cash',
      emoji: '💵',
      enabled: true
    },
    {
      id: 'digital_wallet',
      name: 'Carteira Digital',
      description: 'Multicaixa Express, BAI Directo',
      icon: 'card',
      emoji: '💳',
      enabled: true,
      discount: 5
    },
    {
      id: 'wiza_tds',
      name: 'WIZA TDS',
      description: 'Sistema de créditos Wiza',
      icon: 'wallet',
      emoji: '🪙',
      enabled: true,
      discount: 10
    }
  ];

  const animateSlideUp = React.useCallback(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 50,
      friction: 8,
    }).start();
  }, [slideAnim]);

  const animateSlideDown = React.useCallback(() => {
    Animated.spring(slideAnim, {
      toValue: height,
      useNativeDriver: true,
      tension: 50,
      friction: 8,
    }).start();
  }, [slideAnim]);

  useEffect(() => {
    if (visible) {
      animateSlideUp();
    } else {
      animateSlideDown();
    }
  }, [visible, animateSlideUp, animateSlideDown]);

  const calculateFinalPrice = (methodId: string) => {
    const method = paymentMethods.find(m => m.id === methodId);
    let finalPrice = priceData.total;
    
    if (method?.discount) {
      finalPrice = finalPrice * (1 - method.discount / 100);
    }
    
    return Math.round(finalPrice);
  };

  const handleConfirm = () => {
    if (!selectedPayment) {
      Alert.alert('Atenção', 'Por favor, selecione um método de pagamento.');
      return;
    }
    
    onConfirm(selectedPayment);
  };

  const formatPrice = (price: number) => {
    return `Kz ${price.toLocaleString('pt-AO')}`;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      <View style={styles.modalBackdrop}>
        <TouchableOpacity 
          style={styles.backdropTouchable}
          activeOpacity={1}
          onPress={onClose}
        />
        
        <Animated.View 
          style={[
            styles.modalContainer,
            { transform: [{ translateY: slideAnim }] }
          ]}
        >
          {/* Handle */}
          <View style={styles.modalHandle} />
          
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Confirmar Viagem</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            
            {/* Trip Summary */}
            <View style={styles.tripSummary}>
              <View style={styles.routeContainer}>
                <View style={styles.routePoints}>
                  <View style={styles.originPoint} />
                  <View style={styles.routeLine} />
                  <View style={styles.destinationPoint} />
                </View>
                <View style={styles.routeTexts}>
                  <Text style={styles.originText}>{origin}</Text>
                  <Text style={styles.destinationText}>{destination}</Text>
                </View>
              </View>
              
              <View style={styles.tripDetails}>
                <View style={styles.tripDetailItem}>
                  <Ionicons name="time-outline" size={16} color="#6B7280" />
                  <Text style={styles.tripDetailText}>{priceData.duration}</Text>
                </View>
                <View style={styles.tripDetailItem}>
                  <Ionicons name="location-outline" size={16} color="#6B7280" />
                  <Text style={styles.tripDetailText}>{priceData.distance}</Text>
                </View>
              </View>
            </View>

            {/* Price Breakdown */}
            <View style={styles.priceSection}>
              <Text style={styles.sectionTitle}>Detalhes do Preço</Text>
              
              <View style={styles.priceBreakdown}>
                <View style={styles.priceItem}>
                  <Text style={styles.priceLabel}>Tarifa base</Text>
                  <Text style={styles.priceValue}>{formatPrice(priceData.basePrice)}</Text>
                </View>
                
                {priceData.surge && priceData.surge > 0 && (
                  <View style={styles.priceItem}>
                    <View style={styles.surgeContainer}>
                      <Text style={styles.priceLabel}>Tarifa dinâmica</Text>
                      <View style={styles.surgeBadge}>
                        <Text style={styles.surgeText}>{priceData.surge}x</Text>
                      </View>
                    </View>
                    <Text style={styles.priceValue}>+{formatPrice(priceData.basePrice * (priceData.surge - 1))}</Text>
                  </View>
                )}
                
                {selectedPayment !== 'cash' && (
                  <View style={styles.priceItem}>
                    <View style={styles.discountContainer}>
                      <Text style={styles.discountLabel}>Desconto digital</Text>
                      <Ionicons name="gift-outline" size={16} color="#4CAF50" />
                    </View>
                    <Text style={styles.discountValue}>
                      -{formatPrice(priceData.total - calculateFinalPrice(selectedPayment))}
                    </Text>
                  </View>
                )}
                
                <View style={styles.divider} />
                
                <View style={styles.totalPrice}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>{formatPrice(calculateFinalPrice(selectedPayment))}</Text>
                </View>
              </View>
            </View>

            {/* Payment Methods */}
            <View style={styles.paymentSection}>
              <Text style={styles.sectionTitle}>Método de Pagamento</Text>
              
              <View style={styles.paymentMethods}>
                {paymentMethods.map((method) => (
                  <TouchableOpacity
                    key={method.id}
                    style={[
                      styles.paymentMethod,
                      selectedPayment === method.id && styles.paymentMethodSelected,
                      !method.enabled && styles.paymentMethodDisabled
                    ]}
                    onPress={() => method.enabled && setSelectedPayment(method.id)}
                    disabled={!method.enabled}
                  >
                    <View style={styles.paymentMethodLeft}>
                      <View style={[
                        styles.paymentIcon,
                        selectedPayment === method.id && styles.paymentIconSelected
                      ]}>
                        <Text style={styles.paymentEmoji}>{method.emoji}</Text>
                      </View>
                      
                      <View style={styles.paymentInfo}>
                        <Text style={[
                          styles.paymentName,
                          selectedPayment === method.id && styles.paymentNameSelected
                        ]}>
                          {method.name}
                        </Text>
                        <Text style={styles.paymentDescription}>{method.description}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.paymentMethodRight}>
                      {method.discount && (
                        <View style={styles.discountBadge}>
                          <Text style={styles.discountBadgeText}>-{method.discount}%</Text>
                        </View>
                      )}
                      
                      <View style={[
                        styles.radioButton,
                        selectedPayment === method.id && styles.radioButtonSelected
                      ]}>
                        {selectedPayment === method.id && (
                          <View style={styles.radioButtonInner} />
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Security Note */}
            <View style={styles.securityNote}>
              <View style={styles.securityIcon}>
                <Ionicons name="shield-checkmark" size={20} color="#4CAF50" />
              </View>
              <Text style={styles.securityText}>
                Seus dados de pagamento são protegidos por criptografia de ponta a ponta
              </Text>
            </View>
          </ScrollView>

          {/* Confirm Button */}
          <View style={styles.bottomContainer}>
            <TouchableOpacity 
              style={styles.confirmButton}
              onPress={handleConfirm}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#4CAF50', '#45A049']}
                style={styles.confirmGradient}
              >
                <Text style={styles.confirmButtonText}>
                  Escolher e Confirmar • {formatPrice(calculateFinalPrice(selectedPayment))}
                </Text>
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  backdropTouchable: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: height * 0.85,
    paddingBottom: 0,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  tripSummary: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  routeContainer: {
    flexDirection: 'row',
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
    backgroundColor: '#4CAF50',
  },
  routeLine: {
    width: 2,
    height: 24,
    backgroundColor: '#D1D5DB',
    marginVertical: 6,
  },
  destinationPoint: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#F44336',
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
  tripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  tripDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tripDetailText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  priceSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  priceBreakdown: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
  },
  priceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  surgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  surgeBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  surgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#92400E',
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  discountLabel: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '500',
  },
  discountValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  totalPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1976D2',
  },
  paymentSection: {
    marginBottom: 24,
  },
  paymentMethods: {
    gap: 12,
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
  },
  paymentMethodSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#F0F9FF',
  },
  paymentMethodDisabled: {
    opacity: 0.5,
  },
  paymentMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentIconSelected: {
    backgroundColor: '#E8F5E8',
  },
  paymentEmoji: {
    fontSize: 20,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  paymentNameSelected: {
    color: '#4CAF50',
  },
  paymentDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  paymentMethodRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  discountBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#4CAF50',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  securityIcon: {
    marginRight: 12,
  },
  securityText: {
    fontSize: 14,
    color: '#1E40AF',
    flex: 1,
    lineHeight: 20,
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  confirmButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  confirmGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 8,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default PricePaymentModal;
