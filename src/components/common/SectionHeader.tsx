import React, { ReactNode } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

interface SectionHeaderProps {
    title: string
    subtitle?: string
    showSeeAll?: boolean
    onSeeAllPress?: () => void
    children?: ReactNode
}

export default function SectionHeader({ 
    title, 
    subtitle, 
    showSeeAll = true, 
    onSeeAllPress,
    children 
}: SectionHeaderProps) {
    return (
        <View className='px-6 mt-6'>
            <View className='flex-row justify-between items-center mb-4'>
                <View>
                    <Text className='text-gray-800 text-xl font-bold'>{title}</Text>
                    {subtitle && (
                        <Text className='text-gray-500 text-sm mt-1'>{subtitle}</Text>
                    )}
                </View>
                {showSeeAll && (
                    <TouchableOpacity onPress={onSeeAllPress}>
                        <Text className='text-[#1DBC60] font-semibold'>See all</Text>
                    </TouchableOpacity>
                )}
            </View>
            {children}
        </View>
    )
}
