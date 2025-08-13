import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

interface HeaderProps {
    location?: string
    notificationCount?: number
    onNotificationPress?: () => void
    onFilterPress?: () => void
}

export default function Header({ 
    location = "Angola, Luanda", 
    notificationCount = 0,
    onNotificationPress,
    onFilterPress 
}: HeaderProps) {
    return (
        <LinearGradient
            colors={['#1DBC60', '#16A085']}
            className='w-full px-6 pt-12 pb-8 rounded-b-3xl'
        >
            {/* Top Bar */}
            <View className='flex-row justify-between items-start mb-6'>
                <View className='flex-1'>
                    <Text className='text-white/80 text-sm font-medium'>Location</Text>
                    <View className='flex-row items-center mt-1'>
                        <Ionicons name="location-outline" size={16} color="white" />
                        <Text className='text-white text-lg font-bold ml-1'>{location}</Text>
                    </View>
                </View>
                <TouchableOpacity 
                    className='bg-white/20 p-3 rounded-full'
                    onPress={onNotificationPress}
                >
                    <Ionicons name="notifications-outline" size={24} color="white" />
                    {notificationCount > 0 && (
                        <View className='absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full items-center justify-center'>
                            <Text className='text-white text-xs font-bold'>
                                {notificationCount > 9 ? '9+' : notificationCount}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View className='flex-row items-center space-x-3'>
                <View className='flex-1 bg-white/20 rounded-2xl flex-row items-center px-4 py-3'>
                    <Feather name="search" size={20} color="white" />
                    <TextInput
                        placeholder="Search products..."
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        className='flex-1 ml-3 text-white text-base'
                    />
                </View>
                <TouchableOpacity 
                    className='bg-white/20 p-3 rounded-2xl'
                    onPress={onFilterPress}
                >
                    <MaterialIcons name="tune" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}
