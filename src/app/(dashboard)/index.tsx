import React from 'react'
import { ScrollView, View } from 'react-native'
import CategoryCard from '../../components/common/CategoryCard'
import OfferCard from '../../components/common/OfferCard'
import ProductCard from '../../components/common/ProductCard'
import SectionHeader from '../../components/common/SectionHeader'
import Header from '../../components/layout/Header'

export default function Home() {
    const categories = [
        { id: 1, name: 'Electronics', icon: 'phone-portrait-outline', color: '#FF6B6B' },
        { id: 2, name: 'Fashion', icon: 'shirt-outline', color: '#4ECDC4' },
        { id: 3, name: 'Home', icon: 'home-outline', color: '#45B7D1' },
        { id: 4, name: 'Sports', icon: 'football-outline', color: '#FFA726' },
        { id: 5, name: 'Books', icon: 'book-outline', color: '#AB47BC' },
        { id: 6, name: 'Beauty', icon: 'rose-outline', color: '#EF5350' },
    ]

    const offers = [
        { id: 1, title: 'Summer Sale', discount: '50% OFF' },
        { id: 2, title: 'New Arrivals', discount: '30% OFF' },
        { id: 3, title: 'Flash Deal', discount: '70% OFF' },
    ]

    const recentProducts = [
        { id: 1, name: 'Smartphone', price: '$299', image: require('../../../assets/images/react-logo.png'), rating: 4.5 },
        { id: 2, name: 'Headphones', price: '$89', image: require('../../../assets/images/react-logo.png'), rating: 4.8 },
        { id: 3, name: 'Laptop', price: '$899', image: require('../../../assets/images/react-logo.png'), rating: 4.7 },
        { id: 4, name: 'Watch', price: '$199', image: require('../../../assets/images/react-logo.png'), rating: 4.6 },
    ]

    return (
        <ScrollView className='flex-1 bg-gray-50'>
            {/* Header Section */}
            <Header
                location="Angola, Luanda"
                notificationCount={3}
                onNotificationPress={() => console.log('Notifications pressed')}
                onFilterPress={() => console.log('Filter pressed')}
            />

            {/* Special Offers Section */}
            <SectionHeader
                title="#Special Offers for you"
                subtitle="Check out the best offers"
                onSeeAllPress={() => console.log('See all offers')}
            >
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mb-2'>
                    {offers.map((offer) => (
                        <OfferCard
                            key={offer.id}
                            title={offer.title}
                            discount={offer.discount}
                            onPress={() => console.log('Offer pressed:', offer.title)}
                        />
                    ))}
                </ScrollView>
            </SectionHeader>

            {/* Categories Section */}
            <SectionHeader
                title="Categories"
                onSeeAllPress={() => console.log('See all categories')}
            >
                <View className='flex-row flex-wrap justify-between'>
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            name={category.name}
                            icon={category.icon}
                            color={category.color}
                            onPress={() => console.log('Category pressed:', category.name)}
                        />
                    ))}
                </View>
            </SectionHeader>

            {/* Recent Products Section */}
            <SectionHeader
                title="Recent Products"
                onSeeAllPress={() => console.log('See all products')}
            >
                <View className='flex-row flex-wrap justify-between mb-8'>
                    {recentProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                            rating={product.rating}
                            onPress={() => console.log('Product pressed:', product.name)}
                        />
                    ))}
                </View>
            </SectionHeader>
        </ScrollView>
    )
}