
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Theme } from '../config';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types/navigation';

export const TriviaIntroScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <View className="flex-1 bg-gray-50 items-center justify-center p-6">
            <View className="mb-10 p-6 bg-white rounded-full shadow-lg">
                <Ionicons name="trophy-outline" size={80} color={Theme.colors.primary} />
            </View>

            <Text className="text-3xl font-extrabold text-gray-900 text-center mb-4">
                כמה אתם מכירים את הארץ?
            </Text>

            <Text className="text-lg text-gray-600 text-center leading-8">
                20 שאלות, נראה אתכם משיגים ציון מושלם.
            </Text>
            <Text className="text-xl text-primary font-semibold mb-12" style={{ color: Theme.colors.primary }}>
                זהו את המקום לפי התמונה!
            </Text>

            <TouchableOpacity
                onPress={() => navigation.navigate('TriviaGame')}
                className="w-full bg-primary py-4 rounded-xl shadow-md active:opacity-90 transition-opacity"
                style={{ backgroundColor: Theme.colors.primary }}
            >
                <Text className="text-white text-center font-bold text-xl">
                    התחל משחק
                </Text>
            </TouchableOpacity>
        </View>
    );
};
