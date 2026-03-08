
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, Vibration, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { usePosts } from '../hooks/usePosts';
import { useTriviaGame } from '../hooks/useTriviaGame';
import { GameButton } from '../components/GameButton';
import { Theme } from '../config';
import { RootStackParamList } from '../types/navigation';

export const TriviaGameScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { posts, loading: postsLoading } = usePosts();
    const {
        currentQuestion,
        currentIndex,
        totalQuestions,
        status,
        startGame,
        submitAnswer,
        nextQuestion,
        score,
        mistakes
    } = useTriviaGame(posts);

    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    // Initial Start
    useEffect(() => {
        if (posts.length > 0 && status === 'loading') {
            startGame();
        }
    }, [posts, status, startGame]);

    // Handle Finish
    useEffect(() => {
        if (status === 'finished') {
            navigation.replace('TriviaSummary', { score, mistakes, total: totalQuestions });
        }
    }, [status, navigation, score, mistakes, totalQuestions]);

    const handleAnswer = (index: number) => {
        if (isAnswered) return;

        setSelectedOption(index);
        setIsAnswered(true);
        const isCorrect = submitAnswer(index);

        if (isCorrect) {
            // Success vibration
            Vibration.vibrate(50); // Optional: add vibration if desired
        } else {
            Vibration.vibrate([0, 100, 50, 100]); // Error pattern
        }

        // Delay next question
        setTimeout(() => {
            setIsAnswered(false);
            setSelectedOption(null);
            nextQuestion();
        }, 1500);
    };

    if (postsLoading || status === 'loading') {
        return (
            <View className="flex-1 justify-center items-center bg-gray-50">
                <ActivityIndicator size="large" color={Theme.colors.primary} />
                <Text className="mt-4 text-gray-500">מכין את השאלות...</Text>
            </View>
        );
    }

    if (!currentQuestion) return null;

    return (
        <ScrollView className="flex-1 bg-gray-50" contentContainerStyle={{ padding: 16 }}>
            {/* Progress Bar/Header */}
            <View className="flex-row justify-between items-center mb-6 mt-4">
                <Text className="text-gray-500 font-medium">
                    שאלה {currentIndex + 1} מתוך {totalQuestions}
                </Text>
                <View className="bg-gray-200 h-2 flex-1 mx-4 rounded-full overflow-hidden" style={{ direction: 'ltr' }}>
                    <View
                        className="bg-primary h-full rounded-full"
                        style={{
                            width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
                            backgroundColor: Theme.colors.primary
                        }}
                    />
                </View>
            </View>

            {/* Hero Image */}
            <View className="w-full aspect-video bg-gray-200 rounded-2xl mb-6 overflow-hidden shadow-sm">
                {currentQuestion.targetPost.image ? (
                    <Image
                        source={{ uri: currentQuestion.targetPost.image }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                ) : (
                    <View className="flex-1 justify-center items-center">
                        <Text className="text-gray-400">אין תמונה זמינה</Text>
                    </View>
                )}
            </View>

            {/* Question Text */}
            <Text className="text-2xl font-bold text-center text-gray-900 mb-8">
                ?לאיזה טיול שייכת התמונה הזו
            </Text>

            {/* Answers Area */}
            <View>
                {currentQuestion.options.map((option, index) => {
                    // Determine state
                    let btnState: 'idle' | 'correct' | 'wrong' | 'disabled' = 'idle';
                    if (isAnswered) {
                        if (index === currentQuestion.correctAnswerIndex) {
                            btnState = 'correct';
                        } else if (index === selectedOption) {
                            btnState = 'wrong';
                        } else {
                            btnState = 'disabled';
                        }
                    }

                    return (
                        <GameButton
                            key={index}
                            title={option}
                            onPress={() => handleAnswer(index)}
                            state={btnState}
                            showCorrect={isAnswered && index === currentQuestion.correctAnswerIndex}
                        />
                    );
                })}
            </View>
        </ScrollView>
    );
};
