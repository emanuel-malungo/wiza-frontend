import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native'

interface ProductCardProps {
    name: string
    price: string
    image: ImageSourcePropType
    rating: number
    onPress?: () => void
}

export default function ProductCard({ name, price, image, rating, onPress }: ProductCardProps) {
    return (
        <TouchableOpacity onPress={onPress} className='w-[48%] mb-4' activeOpacity={0.8}>
            <View className='bg-white rounded-2xl overflow-hidden shadow-lg shadow-gray-200/50 border border-gray-50'>
                <View className='bg-gray-50 h-32 items-center justify-center'>
                    <Image source={image} className='w-16 h-16' resizeMode="contain" />
                </View>
                <View className='p-4'>
                    <Text className='text-gray-800 font-semibold text-base mb-2' numberOfLines={1}>
                        {name}
                    </Text>
                    <View className='flex-row items-center justify-between'>
                        <Text className='text-[#1DBC60] font-bold text-lg'>{price}</Text>
                        <View className='flex-row items-center bg-gray-50 px-2 py-1 rounded-lg'>
                            <Ionicons name="star" size={12} color="#FFA726" />
                            <Text className='text-gray-600 text-xs ml-1 font-medium'>{rating}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}
