
import React, { useEffect } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withSequence, withTiming } from 'react-native-reanimated';
import { Theme } from '../config';
import { clsx } from 'clsx';

interface GameButtonProps {
    title: string;
    onPress: () => void;
    state: 'idle' | 'correct' | 'wrong' | 'disabled';
    showCorrect?: boolean; // If true, force green style (for revealing correct answer)
}

export const GameButton: React.FC<GameButtonProps> = ({ title, onPress, state, showCorrect }) => {
    // Animation shared values
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);

    useEffect(() => {
        if (state === 'correct' || showCorrect) {
            scale.value = withSequence(
                withSpring(1.05),
                withSpring(1)
            );
        } else if (state === 'wrong') {
            scale.value = withSequence(
                withTiming(0.95, { duration: 50 }),
                withSpring(1)
            );
        }
    }, [state, showCorrect]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
            opacity: opacity.value
        };
    });

    // Determine styles based on state
    let bgClass = "bg-white border-gray-200";
    let textClass = "text-gray-800";

    if (state === 'correct' || showCorrect) {
        bgClass = "bg-green-500 border-green-600";
        textClass = "text-white";
    } else if (state === 'wrong') {
        bgClass = "bg-red-500 border-red-600";
        textClass = "text-white";
    } else if (state === 'disabled') {
        bgClass = "bg-gray-100 border-gray-200";
        textClass = "text-gray-400";
    }

    return (
        <Animated.View style={[animatedStyle, { width: '100%', marginBottom: 12 }]}>
            <TouchableOpacity
                onPress={onPress}
                disabled={state !== 'idle'}
                activeOpacity={0.9}
                className={clsx(
                    "w-full p-4 rounded-xl border shadow-sm items-center justify-center min-h-[60px]",
                    bgClass
                )}
            >
                <Text className={clsx("font-bold text-lg text-center", textClass)}>
                    {title}
                </Text>
            </TouchableOpacity>
        </Animated.View>
    );
};
