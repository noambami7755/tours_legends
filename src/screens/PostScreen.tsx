import React from 'react';
import { View, ScrollView, Text, ActivityIndicator, Image, useWindowDimensions } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
import { usePost } from '../hooks/usePost';
import { useAds } from '../hooks/useAds';
import { AdCarousel } from '../components/AdCarousel';
import { Theme } from '../config';

type PostScreenRouteProp = RouteProp<{ params: { postId: number; title: string } }, 'params'>;

export const PostScreen = () => {
    const route = useRoute<PostScreenRouteProp>();
    const { postId } = route.params;
    const { post, loading, error } = usePost(postId);
    const { ads } = useAds();
    const { width } = useWindowDimensions();


    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-50">
                <ActivityIndicator size="large" color={Theme.colors.primary} />
            </View>
        );
    }

    if (error || !post) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-50">
                <Text className="text-red-500">Error loading post</Text>
            </View>
        )
    }

    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

    return (
        <ScrollView className="flex-1 bg-gray-50" contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
            {/* Hero Image */}
            {featuredImage ? (
                <Image
                    source={{ uri: featuredImage }}
                    className="w-full h-72"
                    resizeMode="cover"
                />
            ) : (
                <View className="w-full h-72 bg-gray-300" />
            )}

            {/* Content Sheet */}
            <View className="bg-white -mt-6 rounded-t-3xl pt-6 flex-1 min-h-screen">
                <View className="px-5">
                    <Text className="text-2xl font-extrabold text-gray-900 text-right mb-4 writing-direction-rtl">
                        {post.title.rendered}
                    </Text>

                    <RenderHtml
                        contentWidth={width - 40} // px-5 = 20px each side
                        source={{ html: post.content.rendered }}
                        baseStyle={{
                            textAlign: 'right',
                            writingDirection: 'rtl',
                            fontSize: 18,
                            lineHeight: 28,
                            color: '#374151',
                        }}
                        tagsStyles={{
                            p: { marginBottom: 16, textAlign: 'right' },
                            img: { width: '100%', height: 'auto', borderRadius: 12, marginVertical: 10 },
                            h1: { fontSize: 24, fontWeight: '800', marginBottom: 16, textAlign: 'right', color: '#111827' },
                            h2: { fontSize: 22, fontWeight: '700', marginBottom: 12, textAlign: 'right', color: '#1f2937' },
                            h3: { fontSize: 20, fontWeight: '600', marginBottom: 10, textAlign: 'right', color: '#1f2937' },
                            a: { color: Theme.colors.primary, textDecorationLine: 'none', fontWeight: 'bold' },
                            ul: {
                                direction: 'rtl',
                                textAlign: 'right',
                                writingDirection: 'rtl',
                                paddingLeft: 0,
                                paddingRight: 20,
                            },
                            ol: {
                                direction: 'rtl',
                                textAlign: 'right',
                                writingDirection: 'rtl',
                                paddingLeft: 0,
                                paddingRight: 20,
                            },
                            li: {
                                backgroundColor: 'red',
                                flexDirection: 'row-reverse',
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                                textAlign: 'right',
                                writingDirection: 'rtl',
                            }
                        }}
                    />

                </View>
                <View className="mt-8 mb-8 border-t border-gray-100 pt-6">
                    <AdCarousel ads={ads} />
                </View>
            </View>
        </ScrollView>
    );
};
