
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { Theme } from '../config';
import { PostCard } from '../components/PostCard';
import { AdCarousel } from '../components/AdCarousel';
import { useAds } from '../hooks/useAds';
import { Ionicons } from '@expo/vector-icons';

type TriviaSummaryRouteProp = RouteProp<RootStackParamList, 'TriviaSummary'>;

export const TriviaSummaryScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute<TriviaSummaryRouteProp>();
    const { score, mistakes, total } = route.params;
    const { ads } = useAds();

    const percentage = (score / total) * 100;

    let title = "לא נורא, נסו שוב";
    let iconName: keyof typeof Ionicons.glyphMap = "refresh-circle";
    let color = "text-orange-500";

    if (percentage > 90) {
        title = "אלוף!";
        iconName = "trophy";
        color = "text-yellow-500";
    } else if (percentage > 60) {
        title = "כל הכבוד!";
        iconName = "ribbon";
        color = "text-blue-500";
    }

    const recommendedPost = mistakes.length > 0
        ? mistakes[0]
        : null;

    const handleRestart = () => {
        navigation.replace('TriviaIntro');
    };

    return (
        <ScrollView className="flex-1 bg-gray-50" contentContainerStyle={{ paddingBottom: 40 }}>
            <View className="items-center pt-10 px-6">
                <Ionicons name={iconName} size={80} color={percentage > 90 ? '#eab308' : percentage > 60 ? '#3b82f6' : '#f97316'} />

                <Text className={`text-4xl font-extrabold mt-4 mb-2 ${color} text-center`}>
                    {score}/{total}
                </Text>

                <Text className="text-2xl font-bold text-gray-800 text-center mb-10">
                    {title}
                </Text>

                {recommendedPost && (
                    <View className="w-full mb-10">
                        <Text className="text-right text-gray-600 mb-4 font-semibold text-lg">
                            פיספסתם את הטיול הזה, כדאי לקרוא עליו:
                        </Text>
                        <PostCard
                            post={recommendedPost}
                            onPress={() => navigation.navigate('Post', { postId: recommendedPost.id, title: recommendedPost.title })}
                        />
                    </View>
                )}

                <TouchableOpacity
                    onPress={handleRestart}
                    className="w-full bg-white border border-gray-200 py-4 rounded-xl shadow-sm active:opacity-90 mb-4"
                >
                    <Text className="text-gray-800 text-center font-bold text-xl">
                        שחק שוב
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Feed')}
                    className="mb-8"
                >
                    <Text className="text-primary font-semibold" style={{ color: Theme.colors.primary }}>
                        חזרה לדף הראשי
                    </Text>
                </TouchableOpacity>
            </View>

            <View className="mt-4 border-t border-gray-100 pt-6">
                <AdCarousel ads={ads} />
            </View>
        </ScrollView>
    );
};
