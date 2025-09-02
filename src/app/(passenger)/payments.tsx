import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface PaymentMethod {
  id: string;
  type: 'tds' | 'card' | 'cash';
  name: string;
  details: string;
  icon: keyof typeof Ionicons.glyphMap;
  isDefault: boolean;
}

interface Transaction {
  id: string;
  type: 'payment' | 'refund' | 'bonus';
  amount: string;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
}

export default function Payments() {
  const [balance, setBalance] = useState('Kz 2.450');
  const [showAddMethodModal, setShowAddMethodModal] = useState(false);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');

  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'tds',
      name: 'TDS Wallet',
      details: '****1234',
      icon: 'wallet',
      isDefault: true
    },
    {
      id: '2',
      type: 'card',
      name: 'Cartão BFA',
      details: '****5678',
      icon: 'card',
      isDefault: false
    }
  ];

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'payment',
      amount: '-Kz 850',
      description: 'Viagem Maianga → Miramar',
      date: '2025-09-02',
      status: 'completed',
      paymentMethod: 'TDS Wallet'
    },
    {
      id: '2',
      type: 'payment',
      amount: '-Kz 1.200',
      description: 'Viagem Viana → Talatona',
      date: '2025-09-01',
      status: 'completed',
      paymentMethod: 'Cartão BFA'
    },
    {
      id: '3',
      type: 'bonus',
      amount: '+Kz 500',
      description: 'Bônus primeira viagem',
      date: '2025-08-30',
      status: 'completed',
      paymentMethod: 'TDS Wallet'
    },
    {
      id: '4',
      type: 'refund',
      amount: '+Kz 300',
      description: 'Reembolso viagem cancelada',
      date: '2025-08-29',
      status: 'completed',
      paymentMethod: 'TDS Wallet'
    }
  ];

  const handleTopUp = () => {
    if (!topUpAmount || parseFloat(topUpAmount) <= 0) {
      Alert.alert('Erro', 'Digite um valor válido');
      return;
    }
    
    Alert.alert(
      'Confirmar Recarga',
      `Carregar Kz ${topUpAmount} na sua carteira?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Confirmar', 
          onPress: () => {
            setShowTopUpModal(false);
            setTopUpAmount('');
            Alert.alert('Sucesso', 'Recarga realizada com sucesso!');
          }
        }
      ]
    );
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return 'arrow-up-circle';
      case 'refund':
        return 'arrow-down-circle';
      case 'bonus':
        return 'gift';
      default:
        return 'wallet';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'payment':
        return '#EF4444';
      case 'refund':
      case 'bonus':
        return '#22C55E';
      default:
        return '#6B7280';
    }
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

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Saldo disponível</Text>
          <Text style={styles.balanceAmount}>{balance}</Text>
          <View style={styles.balanceActions}>
            <TouchableOpacity
              style={styles.balanceButton}
              onPress={() => setShowTopUpModal(true)}
            >
              <Ionicons name="add" size={20} color="#1976D2" />
              <Text style={styles.balanceButtonText}>Carregar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.balanceButton}>
              <Ionicons name="send" size={20} color="#1976D2" />
              <Text style={styles.balanceButtonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Payment Methods Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Métodos de Pagamento</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddMethodModal(true)}
            >
              <Ionicons name="add" size={20} color="#1976D2" />
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>

          {paymentMethods.map((method) => (
            <View key={method.id} style={styles.paymentMethodCard}>
              <View style={styles.paymentMethodInfo}>
                <View style={[styles.paymentMethodIcon, { backgroundColor: method.type === 'tds' ? '#E3F2FD' : '#F3E5F5' }]}>
                  <Ionicons
                    name={method.icon}
                    size={24}
                    color={method.type === 'tds' ? '#1976D2' : '#9C27B0'}
                  />
                </View>
                <View style={styles.paymentMethodDetails}>
                  <Text style={styles.paymentMethodName}>{method.name}</Text>
                  <Text style={styles.paymentMethodNumber}>{method.details}</Text>
                </View>
              </View>
              <View style={styles.paymentMethodActions}>
                {method.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultBadgeText}>Padrão</Text>
                  </View>
                )}
                <TouchableOpacity style={styles.methodActionButton}>
                  <Ionicons name="ellipsis-horizontal" size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Transactions Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Transações Recentes</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>Ver todas</Text>
            </TouchableOpacity>
          </View>

          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionInfo}>
                <View style={[
                  styles.transactionIcon,
                  { backgroundColor: getTransactionColor(transaction.type) + '20' }
                ]}>
                  <Ionicons
                    name={getTransactionIcon(transaction.type)}
                    size={20}
                    color={getTransactionColor(transaction.type)}
                  />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionDescription}>{transaction.description}</Text>
                  <Text style={styles.transactionDate}>
                    {transaction.date} • {transaction.paymentMethod}
                  </Text>
                </View>
              </View>
              <View style={styles.transactionAmount}>
                <Text style={[
                  styles.transactionAmountText,
                  { color: getTransactionColor(transaction.type) }
                ]}>
                  {transaction.amount}
                </Text>
                <Text style={styles.transactionStatus}>
                  {transaction.status === 'completed' ? 'Concluída' : 'Pendente'}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Promotions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Promoções</Text>
          <View style={styles.promotionCard}>
            <LinearGradient
              colors={['#FEF3C7', '#FDE68A']}
              style={styles.promotionGradient}
            >
              <View style={styles.promotionContent}>
                <Ionicons name="gift" size={32} color="#F59E0B" />
                <View style={styles.promotionText}>
                  <Text style={styles.promotionTitle}>Indique um amigo</Text>
                  <Text style={styles.promotionDescription}>
                    Ganhe Kz 500 para cada amigo que se cadastrar
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>

      {/* Top Up Modal */}
      <Modal
        visible={showTopUpModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTopUpModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Carregar Saldo</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowTopUpModal(false)}
              >
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <Text style={styles.inputLabel}>Valor (Kz)</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                value={topUpAmount}
                onChangeText={setTopUpAmount}
                keyboardType="numeric"
              />

              <Text style={styles.paymentMethodLabel}>Método de pagamento</Text>
              {paymentMethods.map((method) => (
                <TouchableOpacity key={method.id} style={styles.modalPaymentMethod}>
                  <Ionicons name={method.icon} size={24} color="#1976D2" />
                  <Text style={styles.modalPaymentMethodText}>{method.name}</Text>
                  <Ionicons name="radio-button-off" size={24} color="#D1D5DB" />
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.confirmButton} onPress={handleTopUp}>
              <LinearGradient
                colors={['#1565C0', '#1976D2']}
                style={styles.confirmButtonGradient}
              >
                <Text style={styles.confirmButtonText}>Confirmar Recarga</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add Payment Method Modal */}
      <Modal
        visible={showAddMethodModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddMethodModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Adicionar Método</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowAddMethodModal(false)}
              >
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <TouchableOpacity style={styles.addMethodOption}>
                <Ionicons name="card" size={24} color="#1976D2" />
                <Text style={styles.addMethodOptionText}>Cartão de Débito/Crédito</Text>
                <Ionicons name="chevron-forward" size={24} color="#D1D5DB" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.addMethodOption}>
                <Ionicons name="wallet" size={24} color="#1976D2" />
                <Text style={styles.addMethodOptionText}>TDS Wallet</Text>
                <Ionicons name="chevron-forward" size={24} color="#D1D5DB" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    marginBottom: 20,
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
  balanceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
  },
  balanceActions: {
    flexDirection: 'row',
    gap: 16,
  },
  balanceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(25, 118, 210, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  balanceButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1976D2',
    marginLeft: 4,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  section: {
    marginBottom: 24,
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
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1976D2',
  },
  paymentMethodCard: {
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
  paymentMethodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentMethodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentMethodDetails: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  paymentMethodNumber: {
    fontSize: 14,
    color: '#6B7280',
  },
  paymentMethodActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  defaultBadge: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  defaultBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  methodActionButton: {
    padding: 4,
  },
  transactionCard: {
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
  transactionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  transactionAmountText: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  transactionStatus: {
    fontSize: 10,
    color: '#6B7280',
  },
  promotionCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  promotionGradient: {
    padding: 20,
  },
  promotionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promotionText: {
    flex: 1,
    marginLeft: 16,
  },
  promotionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 4,
  },
  promotionDescription: {
    fontSize: 14,
    color: '#A16207',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  modalCloseButton: {
    padding: 4,
  },
  modalBody: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  amountInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 24,
  },
  paymentMethodLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  modalPaymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  modalPaymentMethodText: {
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 12,
    flex: 1,
  },
  confirmButton: {
    marginHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#1565C0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  confirmButtonGradient: {
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  addMethodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  addMethodOptionText: {
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 12,
    flex: 1,
  },
});
