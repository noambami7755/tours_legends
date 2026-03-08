import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { CleanPost } from '../types';

interface PostCardProps {
    post: CleanPost;
    onPress: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-3 mx-4 flex-row-reverse"
        >
            <Image
                source={post.image ? { uri: post.image } : require('../../assets/hikers_defualt.png')}
                className="w-28 aspect-square rounded-xl bg-gray-200"
                resizeMode="cover"
            />


            {/* Text Container */}
            <View className="flex-1 justify-center mr-3">
                <Text
                    className="text-gray-900 font-bold text-lg text-right writing-direction-rtl leading-tight"
                    numberOfLines={3}
                >
                    {post.title}
                </Text>
            </View>
        </TouchableOpacity>
    );
};
