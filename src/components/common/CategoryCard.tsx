import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

interface CategoryCardProps {
    name: string
    icon: string
    color: string
    onPress?: () => void
}

export default function CategoryCard({ name, icon, color, onPress }: CategoryCardProps) {
    return (
        <TouchableOpacity onPress={onPress} className='w-[30%] mb-4'>
            <View className='bg-white rounded-2xl p-4 items-center shadow-sm border border-gray-100'>
                <View 
                    className='w-12 h-12 rounded-full items-center justify-center mb-3'
                    style={{ backgroundColor: color + '20' }}
                >
                    <Ionicons name={icon as any} size={24} color={color} />
                </View>
                <Text className='text-gray-700 text-sm font-medium text-center'>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}
