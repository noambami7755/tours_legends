import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Image, TouchableOpacity, Text, Dimensions, Linking, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { AdObject } from '../types';

interface AdCarouselProps {
    ads: AdObject[];
}

const { width } = Dimensions.get('window');

export const AdCarousel: React.FC<AdCarouselProps> = ({ ads }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);

    // Auto-scroll logic
    useEffect(() => {
        if (ads.length <= 1) return;

        const interval = setInterval(() => {
            let nextIndex = activeIndex + 1;
            if (nextIndex >= ads.length) {
                nextIndex = 0;
            }

            scrollViewRef.current?.scrollTo({
                x: nextIndex * width,
                animated: true,
            });
            setActiveIndex(nextIndex);
        }, 5000);

        return () => clearInterval(interval);
    }, [activeIndex, ads.length]);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index);

        if (roundIndex !== activeIndex) {
            setActiveIndex(roundIndex);
        }
    };

    const handlePress = (url: string) => {
        if (url) {
            Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
        }
    };

    if (!ads.length) return null;

    return (
        <View className="mb-6">
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                className="h-56"
                onMomentumScrollEnd={handleScroll}
                scrollEventThrottle={16}
            >
                {ads.map((ad, index) => (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.95}
                        onPress={() => handlePress(ad.url)}
                        style={{ width: width }}
                        className="h-56 relative justify-end"
                    >
                        <Image
                            source={{ uri: ad.image }}
                            className="absolute w-full h-full"
                            resizeMode="cover"
                        />
                        <View className="w-full h-full absolute bg-black/30" />

                        {ad.title && (
                            <View className="p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <Text className="text-white text-xl font-bold text-center shadow-md">
                                    {ad.title}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Pagination Dots */}
            {ads.length > 1 && (
                <View className="flex-row justify-center mt-2 space-x-2 gap-2 pt-2">
                    {ads.map((_, index) => (
                        <View
                            key={index}
                            className={`h-2.5 w-2.5 rounded ${index === activeIndex ? 'bg-gray-600' : 'bg-gray-300'
                                }`}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};
