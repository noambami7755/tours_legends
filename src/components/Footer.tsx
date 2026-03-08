import React from 'react';
import { View, Text } from 'react-native';

export const Footer = () => (
    <View className="bg-white py-6 items-center justify-center w-full">
        <Text className="text-gray-500 text-sm font-bold">
            טיולים ואגדות {new Date().getFullYear()}. כל הזכויות שמורות ©
        </Text>
    </View>
);
