import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { ColorValue, Text, TouchableOpacity, View } from 'react-native'

interface OfferCardProps {
    title: string
    discount: string
    gradientColors?: [ColorValue, ColorValue, ...ColorValue[]]
    onPress?: () => void
}

export default function OfferCard({ 
    title, 
    discount, 
    gradientColors = ['#FF6B6B', '#FF8E53'],
    onPress 
}: OfferCardProps) {
    return (
        <TouchableOpacity onPress={onPress} className='mr-4'>
            <LinearGradient
                colors={gradientColors}
                className='w-72 h-40 rounded-2xl p-6 justify-between'
            >
                <View>
                    <Text className='text-white text-2xl font-bold'>{discount}</Text>
                    <Text className='text-white text-lg font-semibold mt-1'>{title}</Text>
                </View>
                <TouchableOpacity className='bg-white/20 self-start px-6 py-2 rounded-full'>
                    <Text className='text-white font-semibold'>Shop Now</Text>
                </TouchableOpacity>
            </LinearGradient>
        </TouchableOpacity>
    )
}
