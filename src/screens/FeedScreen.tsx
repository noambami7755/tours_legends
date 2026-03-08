import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CleanPost } from '../types';
import { RootStackParamList } from '../types/navigation';
import { usePosts } from '../hooks/usePosts';
import { useAds } from '../hooks/useAds';
import { PostCard } from '../components/PostCard';
import { AdCarousel } from '../components/AdCarousel';
import { Footer } from '../components/Footer';
import { Theme } from '../config';

export const FeedScreen = () => {
    const { posts, loading, loadMore, refresh, refreshing } = usePosts();
    const { ads } = useAds();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const renderHeader = () => (
        <View className="mb-4">
            <AdCarousel ads={ads} />
        </View>
    );

    const renderFooter = () => {
        if (!loading) return <Footer />;
        return (
            <View className="py-4">
                <ActivityIndicator size="large" color={Theme.colors.primary} />
            </View>
        );
    };

    const handlePressPost = (post: CleanPost) => {
        navigation.navigate('Post', { postId: post.id, title: post.title });
    };

    return (
        <View className="flex-1 bg-gray-100">
            <FlatList
                data={posts}
                renderItem={({ item }) => (
                    <PostCard post={item} onPress={() => handlePressPost(item)} />
                )}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={renderFooter}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                refreshing={refreshing}
                onRefresh={refresh}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
};
