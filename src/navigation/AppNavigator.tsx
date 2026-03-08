import React from 'react';
import { View, TouchableOpacity, Text, Linking } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerNavigationProp } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DrawerActions, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FeedScreen } from '../screens/FeedScreen';
import { PostScreen } from '../screens/PostScreen';
import { Theme } from '../config';
import { DrawerParamList, RootStackParamList } from '../types/navigation';
import { TriviaIntroScreen } from '../screens/TriviaIntroScreen';
import { TriviaGameScreen } from '../screens/TriviaGameScreen';
import { TriviaSummaryScreen } from '../screens/TriviaSummaryScreen';

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

const CustomHeaderTitle = () => (
    <View className="flex-1 items-center justify-center p-2">
        <Text className="font-bold text-xl tracking-wider" style={{ color: Theme.colors.primary }}>
            טיולים<Text className="text-gray-800"> & </Text>אגדות

        </Text>
        <Text className="font-bold text-xs tracking-wider">
            {process.env.EXPO_PUBLIC_APP_SUBTITLE}
        </Text>
    </View>
);

const CustomHeaderRight = () => {
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
    return (
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} className="mr-4 p-1">
            <Ionicons name="menu" size={28} color="#1f2937" />
        </TouchableOpacity>
    );
};

const MainStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'white',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    elevation: 2, // Android shadow
                    height: 100, // Adjust as needed, usually react-nav handles safe area
                },
                headerTintColor: '#1f2937', // Dark gray for back button
                headerTitleAlign: 'center',
                headerRight: () => <CustomHeaderRight />,
                headerTitle: () => <CustomHeaderTitle />,
                headerLeft: () => null,
            }}
        >
            <Stack.Screen
                name="Feed"
                component={FeedScreen}
                options={{
                    headerLeft: () => null,
                }}
            />
            <Stack.Screen
                name="Post"
                component={PostScreen}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()} className="ml-4">
                            <Ionicons name="arrow-back" size={24} color="#1f2937" />
                        </TouchableOpacity>
                    ),
                    headerRight: () => <CustomHeaderRight />, // Keep hamburger logic
                })}
            />
            <Stack.Screen
                name="TriviaIntro"
                component={TriviaIntroScreen}
                options={{ headerTitle: 'משחק טריוויה' }}
            />
            <Stack.Screen
                name="TriviaGame"
                component={TriviaGameScreen}
                options={{ headerTitle: 'משחק טריוויה' }}
            />
            <Stack.Screen
                name="TriviaSummary"
                component={TriviaSummaryScreen}
                options={{ headerTitle: 'סיכום משחק', headerLeft: () => null }}
            />
        </Stack.Navigator>
    );
};

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    return (
        <DrawerContentScrollView {...props}>
            <View className="p-4 bg-gray-100 mb-4 items-end pr-6">
                <Text className="text-xl font-bold text-gray-800">תפריט</Text>
            </View>
            <DrawerItem
                label="ראשי"
                onPress={() => props.navigation.navigate('Main', { screen: 'Feed' })}
                labelStyle={{ textAlign: 'right', fontSize: 16, fontWeight: '600', color: '#1f2937' }}
            />
            <DrawerItem
                label="אתר"
                onPress={() => Linking.openURL('https://meny.co.il')}
                labelStyle={{ textAlign: 'right', fontSize: 16, fontWeight: '600', color: '#1f2937' }}
            />
            <DrawerItem
                label="טריוויה"
                onPress={() => props.navigation.navigate('Main', { screen: 'TriviaIntro' })}
                labelStyle={{ textAlign: 'right', fontSize: 16, fontWeight: '900', color: Theme.colors.primary }}
            />
            <DrawerItem
                label="פייסבוק"
                onPress={() => Linking.openURL('https://www.facebook.com/groups/agadot')}
                labelStyle={{ textAlign: 'right', fontSize: 16, fontWeight: '600', color: '#1f2937' }}
            />
        </DrawerContentScrollView>
    );
};

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={{ headerShown: false, drawerPosition: 'right' }}
            >
                <Drawer.Screen name="Main" component={MainStack} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};
