import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
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
	TouchableOpacity,
	View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

type TimePeriod = 'day' | 'week' | 'month';
type PaymentMethod = 'cash' | 'digital' | 'tds';

interface Transaction {
  id: string;
  date: string;
  time: string;
  passenger: string;
  paymentMethod: PaymentMethod;
  amount: number;
  type: 'earning' | 'withdrawal';
}

interface EarningsSummary {
  day: number;
  week: number;
  month: number;
}

interface ChartData {
  label: string;
  value: number;
}

const Earnings = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('day');
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  
  // Animações
  const modalScale = useRef(new Animated.Value(0)).current;
  const chartAnimation = useRef(new Animated.Value(0)).current;

  // Dados mockados
  const earningsSummary: EarningsSummary = {
    day: 12500,
    week: 85000,
    month: 340000
  };

  const transactions: Transaction[] = [
    {
      id: '1',
      date: '26/08/2025',
      time: '14:32',
      passenger: 'Maria Silva',
      paymentMethod: 'cash',
      amount: 2500,
      type: 'earning'
    },
    {
      id: '2',
      date: '26/08/2025',
      time: '13:15',
      passenger: 'João Santos',
      paymentMethod: 'tds',
      amount: 3200,
      type: 'earning'
    },
    {
      id: '3',
      date: '26/08/2025',
      time: '12:45',
      passenger: 'Ana Costa',
      paymentMethod: 'digital',
      amount: 1800,
      type: 'earning'
    },
    {
      id: '4',
      date: '25/08/2025',
      time: '16:20',
      passenger: 'Resgate Solicitado',
      paymentMethod: 'cash',
      amount: 15000,
      type: 'withdrawal'
    },
    {
      id: '5',
      date: '25/08/2025',
      time: '11:30',
      passenger: 'Carlos Lima',
      paymentMethod: 'cash',
      amount: 2800,
      type: 'earning'
    },
    {
      id: '6',
      date: '25/08/2025',
      time: '09:15',
      passenger: 'Lucia Mendes',
      paymentMethod: 'tds',
      amount: 2200,
      type: 'earning'
    }
  ];

  const getChartData = (period: TimePeriod): ChartData[] => {
    switch (period) {
      case 'day':
        return [
          { label: '8h', value: 2500 },
          { label: '10h', value: 3800 },
          { label: '12h', value: 2200 },
          { label: '14h', value: 4000 },
          { label: '16h', value: 0 },
          { label: '18h', value: 0 }
        ];
      case 'week':
        return [
          { label: 'Seg', value: 15000 },
          { label: 'Ter', value: 18500 },
          { label: 'Qua', value: 12000 },
          { label: 'Qui', value: 16800 },
          { label: 'Sex', value: 22700 },
          { label: 'Sáb', value: 0 },
          { label: 'Dom', value: 0 }
        ];
      case 'month':
        return [
          { label: 'Sem 1', value: 65000 },
          { label: 'Sem 2', value: 78500 },
          { label: 'Sem 3', value: 82000 },
          { label: 'Sem 4', value: 85000 }
        ];
    }
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString('pt-AO')} AKZ`;
  };

  const getPaymentMethodIcon = (method: PaymentMethod) => {
    switch (method) {
      case 'cash': return 'cash';
      case 'digital': return 'card';
      case 'tds': return 'wallet';
    }
  };

  const getPaymentMethodText = (method: PaymentMethod) => {
    switch (method) {
      case 'cash': return 'Dinheiro';
      case 'digital': return 'Digital';
      case 'tds': return 'TDS';
    }
  };

  const handlePeriodChange = (period: TimePeriod) => {
    setSelectedPeriod(period);
    
    // Animação do gráfico
    Animated.sequence([
      Animated.timing(chartAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(chartAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const openWithdrawalModal = () => {
    setShowWithdrawalModal(true);
    Animated.spring(modalScale, {
      toValue: 1,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const closeWithdrawalModal = () => {
    Animated.timing(modalScale, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowWithdrawalModal(false);
    });
  };

  const handleWithdrawal = (method: string) => {
    closeWithdrawalModal();
    setTimeout(() => {
      Alert.alert(
        'Solicitação de Resgate',
        `Sua solicitação de resgate via ${method} foi enviada com sucesso! Você receberá uma notificação quando for processada.`,
        [{ text: 'OK' }]
      );
    }, 300);
  };

  const chartData = getChartData(selectedPeriod);
  const maxValue = Math.max(...chartData.map(item => item.value));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F90BE" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Meus Ganhos</Text>
        </View>
        
        <TouchableOpacity style={styles.withdrawButton} onPress={openWithdrawalModal}>
          <Ionicons name="card" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Resumo Rápido */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Resumo de Ganhos</Text>
          
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <View style={styles.summaryItemHeader}>
                <Ionicons name="today" size={20} color="#1F90BE" />
                <Text style={styles.summaryLabel}>Hoje</Text>
              </View>
              <Text style={styles.summaryValue}>{formatCurrency(earningsSummary.day)}</Text>
            </View>
            
            <View style={styles.summaryDivider} />
            
            <View style={styles.summaryItem}>
              <View style={styles.summaryItemHeader}>
                <Ionicons name="calendar" size={20} color="#1F90BE" />
                <Text style={styles.summaryLabel}>Semana</Text>
              </View>
              <Text style={styles.summaryValue}>{formatCurrency(earningsSummary.week)}</Text>
            </View>
            
            <View style={styles.summaryDivider} />
            
            <View style={styles.summaryItem}>
              <View style={styles.summaryItemHeader}>
                <Ionicons name="calendar-outline" size={20} color="#1F90BE" />
                <Text style={styles.summaryLabel}>Mês</Text>
              </View>
              <Text style={styles.summaryValue}>{formatCurrency(earningsSummary.month)}</Text>
            </View>
          </View>
        </View>

        {/* Gráfico de Desempenho */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Desempenho</Text>
          
          {/* Botões de Período */}
          <View style={styles.periodButtons}>
            {(['day', 'week', 'month'] as TimePeriod[]).map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.periodButton,
                  selectedPeriod === period && styles.periodButtonActive
                ]}
                onPress={() => handlePeriodChange(period)}
              >
                <Text style={[
                  styles.periodButtonText,
                  selectedPeriod === period && styles.periodButtonTextActive
                ]}>
                  {period === 'day' ? 'Diário' : period === 'week' ? 'Semanal' : 'Mensal'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Gráfico */}
          <Animated.View style={[styles.chart, { opacity: chartAnimation }]}>
            {chartData.map((item, index) => (
              <View key={index} style={styles.chartItem}>
                <View style={styles.chartBarContainer}>
                  <View 
                    style={[
                      styles.chartBar,
                      { 
                        height: maxValue > 0 ? (item.value / maxValue) * 120 : 0,
                        backgroundColor: item.value > 0 ? '#1DBC60' : '#E5E7EB'
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.chartLabel}>{item.label}</Text>
                <Text style={styles.chartValue}>
                  {item.value > 0 ? `${(item.value / 1000).toFixed(0)}k` : '0'}
                </Text>
              </View>
            ))}
          </Animated.View>
        </View>

        {/* Lista de Transações */}
        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>Histórico Detalhado</Text>
          
          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionLeft}>
                <View style={[
                  styles.transactionIcon,
                  { backgroundColor: transaction.type === 'earning' ? '#E8F5E8' : '#FFEBEE' }
                ]}>
                  <Ionicons 
                    name={transaction.type === 'earning' ? 'arrow-down' : 'arrow-up'} 
                    size={20} 
                    color={transaction.type === 'earning' ? '#1DBC60' : '#FF3B30'} 
                  />
                </View>
                
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionPassenger}>{transaction.passenger}</Text>
                  <Text style={styles.transactionDateTime}>
                    {transaction.date} • {transaction.time}
                  </Text>
                </View>
              </View>
              
              <View style={styles.transactionRight}>
                <Text style={[
                  styles.transactionAmount,
                  { color: transaction.type === 'earning' ? '#1DBC60' : '#FF3B30' }
                ]}>
                  {transaction.type === 'earning' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </Text>
                
                <View style={styles.paymentMethodContainer}>
                  <Ionicons 
                    name={getPaymentMethodIcon(transaction.paymentMethod)} 
                    size={14} 
                    color="#6B7280" 
                  />
                  <Text style={styles.paymentMethodText}>
                    {getPaymentMethodText(transaction.paymentMethod)}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Botão de Resgate Fixo */}
      <View style={styles.withdrawalButtonContainer}>
        <TouchableOpacity style={styles.withdrawalButton} onPress={openWithdrawalModal}>
          <Ionicons name="card-outline" size={24} color="#FFFFFF" />
          <Text style={styles.withdrawalButtonText}>Solicitar Resgate</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de Resgate */}
      <Modal
        visible={showWithdrawalModal}
        transparent
        animationType="none"
        onRequestClose={closeWithdrawalModal}
      >
        <View style={styles.modalOverlay}>
          <Animated.View 
            style={[styles.withdrawalModal, { transform: [{ scale: modalScale }] }]}
          >
            <Text style={styles.modalTitle}>Solicitar Resgate</Text>
            <Text style={styles.modalSubtitle}>
              Escolha como deseja receber seus ganhos
            </Text>
            
            <TouchableOpacity 
              style={styles.withdrawalOption}
              onPress={() => handleWithdrawal('Carteira Digital')}
            >
              <View style={styles.withdrawalOptionLeft}>
                <View style={[styles.withdrawalOptionIcon, { backgroundColor: '#E8F5E8' }]}>
                  <Ionicons name="wallet" size={24} color="#1DBC60" />
                </View>
                <View>
                  <Text style={styles.withdrawalOptionTitle}>Carteira Digital</Text>
                  <Text style={styles.withdrawalOptionSubtitle}>Transferência instantânea</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.withdrawalOption}
              onPress={() => handleWithdrawal('Dinheiro Físico')}
            >
              <View style={styles.withdrawalOptionLeft}>
                <View style={[styles.withdrawalOptionIcon, { backgroundColor: '#FFF8E1' }]}>
                  <Ionicons name="cash" size={24} color="#FFD60A" />
                </View>
                <View>
                  <Text style={styles.withdrawalOptionTitle}>Dinheiro Físico</Text>
                  <Text style={styles.withdrawalOptionSubtitle}>Retirar em agência</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.withdrawalOption}
              onPress={() => handleWithdrawal('WIZA TDS')}
            >
              <View style={styles.withdrawalOptionLeft}>
                <View style={[styles.withdrawalOptionIcon, { backgroundColor: '#EBF8FF' }]}>
                  <Ionicons name="card" size={24} color="#1F90BE" />
                </View>
                <View>
                  <Text style={styles.withdrawalOptionTitle}>WIZA TDS</Text>
                  <Text style={styles.withdrawalOptionSubtitle}>Converter em créditos</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.modalCancelButton} onPress={closeWithdrawalModal}>
              <Text style={styles.modalCancelText}>Cancelar</Text>
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
  withdrawButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
  },
  periodButtons: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 4,
    marginBottom: 24,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  periodButtonTextActive: {
    color: '#1F90BE',
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 160,
    paddingHorizontal: 8,
  },
  chartItem: {
    alignItems: 'center',
    flex: 1,
  },
  chartBarContainer: {
    height: 120,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  chartBar: {
    width: 20,
    borderRadius: 4,
    minHeight: 4,
  },
  chartLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 2,
  },
  chartValue: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  transactionsSection: {
    marginBottom: 120,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  transactionCard: {
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
  transactionLeft: {
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
  transactionInfo: {
    flex: 1,
  },
  transactionPassenger: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  transactionDateTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  withdrawalButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  withdrawalButton: {
    backgroundColor: '#1F90BE',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  withdrawalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  withdrawalModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    width: width - 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  withdrawalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 12,
  },
  withdrawalOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  withdrawalOptionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  withdrawalOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  withdrawalOptionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  modalCancelButton: {
    marginTop: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
});

export default Earnings;