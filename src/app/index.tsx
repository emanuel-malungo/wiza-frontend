import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get('window');

interface OnboardingSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

const onboardingData: OnboardingSlide[] = [
  {
    id: 1,
    title: "Bem-vindo ao Wiza",
    subtitle: "Transporte Inteligente",
    description: "A forma mais fácil e segura de se locomover pela cidade. Conectamos você ao seu destino.",
    icon: "car",
    color: "#1565C0"
  },
  {
    id: 2,
    title: "Viaje com Conforto",
    subtitle: "Segurança em Primeiro Lugar",
    description: "Motoristas verificados, veículos inspecionados e viagens monitoradas em tempo real.",
    icon: "shield-checkmark",
    color: "#1976D2"
  },
  {
    id: 3,
    title: "Pagamento Simples",
    subtitle: "TDS Integrado",
    description: "Pague com seu TDS ou dinheiro. Sem complicações, sem surpresas no final da viagem.",
    icon: "wallet",
    color: "#1E88E5"
  },
  {
    id: 4,
    title: "Pronto para Começar?",
    subtitle: "Sua Jornada Inicia Aqui",
    description: "Faça login ou crie sua conta para começar a viajar com o Wiza hoje mesmo.",
    icon: "rocket",
    color: "#1F90BE"
  }
];

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleNext = () => {
    if (currentSlide < onboardingData.length - 1) {
      const nextSlide = currentSlide + 1;
      setCurrentSlide(nextSlide);
      scrollViewRef.current?.scrollTo({
        x: nextSlide * width,
        animated: true
      });
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      const prevSlide = currentSlide - 1;
      setCurrentSlide(prevSlide);
      scrollViewRef.current?.scrollTo({
        x: prevSlide * width,
        animated: true
      });
    }
  };

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.floor(event.nativeEvent.contentOffset.x / slideSize);
    setCurrentSlide(index);
  };

  const isLastSlide = currentSlide === onboardingData.length - 1;
  const currentSlideData = onboardingData[currentSlide];

  return (
    <LinearGradient
      colors={['#E3F2FD', '#BBDEFB', '#90CAF9']}
      style={styles.container}
    >
      {/* Header with Logo */}
      <View style={styles.header}>
        <Image
          source={require("@/assets/img/iconWiza.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Onboarding Slides */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.slidesContainer}
      >
        {onboardingData.map((slide, index) => (
          <View key={slide.id} style={[styles.slide, { width }]}>
            <View style={styles.slideContent}>
              {/* Icon */}
              <View style={[styles.iconContainer, { backgroundColor: slide.color + '20' }]}>
                <Ionicons name={slide.icon} size={60} color={slide.color} />
              </View>

              {/* Title */}
              <Text style={styles.title}>{slide.title}</Text>
              
              {/* Subtitle */}
              <Text style={[styles.subtitle, { color: slide.color }]}>{slide.subtitle}</Text>
              
              {/* Description */}
              <Text style={styles.description}>{slide.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: index === currentSlide ? currentSlideData.color : '#B0BEC5',
                width: index === currentSlide ? 24 : 8,
              }
            ]}
          />
        ))}
      </View>

      {/* Navigation Buttons */}
      <View style={styles.footer}>
        {!isLastSlide ? (
          <View style={styles.navigationContainer}>
            {/* Previous Button */}
            {currentSlide > 0 && (
              <TouchableOpacity
                style={[styles.navButton, styles.prevButton]}
                onPress={handlePrevious}
              >
                <Ionicons name="chevron-back" size={24} color={currentSlideData.color} />
                <Text style={[styles.navButtonText, { color: currentSlideData.color }]}>Voltar</Text>
              </TouchableOpacity>
            )}

            {/* Skip Button */}
            <TouchableOpacity
              style={styles.skipButton}
              onPress={() => router.push("/(auth)")}
            >
              <Text style={styles.skipButtonText}>Pular</Text>
            </TouchableOpacity>

            {/* Next Button */}
            <TouchableOpacity
              style={[styles.navButton, { backgroundColor: currentSlideData.color }]}
              onPress={handleNext}
            >
              <Text style={styles.navButtonText}>Próximo</Text>
              <Ionicons name="chevron-forward" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          /* Action Buttons - Last Slide */
          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: currentSlideData.color }]}
              onPress={() => router.push("/(auth)")}
            >
              <Text style={styles.actionButtonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.secondaryButton, { borderColor: currentSlideData.color }]}
              onPress={() => router.push("/(auth)/Register")}
            >
              <Text style={[styles.actionButtonTextSecondary, { color: currentSlideData.color }]}>Criar Conta</Text>
            </TouchableOpacity>

            {/* Quick Access to Passenger (for testing) */}
            <TouchableOpacity
              style={styles.quickAccessButton}
              onPress={() => router.push("/(passenger)")}
            >
              <Text style={styles.quickAccessText}>Acesso Rápido</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
  },
  slidesContainer: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  slideContent: {
    alignItems: 'center',
    maxWidth: 300,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A202C',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  footer: {
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    minWidth: 100,
  },
  prevButton: {
    backgroundColor: 'transparent',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginHorizontal: 4,
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  skipButtonText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  actionContainer: {
    gap: 16,
  },
  actionButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  actionButtonTextSecondary: {
    fontSize: 18,
    fontWeight: '600',
  },
  quickAccessButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  quickAccessText: {
    fontSize: 14,
    color: '#6B7280',
    textDecorationLine: 'underline',
  },
});
