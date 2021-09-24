import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNav from './TabNav'
import StoryScreen from '../screens/StoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CommentsScreen from '../screens/CommentsScreen';
import LikesScreen from '../screens/LikesScreen';
import { TouchableOpacity, StyleSheet } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const RootStack = createStackNavigator();

const MainNav = () => {
    return (
        <>
            <RootStack.Navigator>
                <RootStack.Screen
                    name={'Root'}
                    component={TabNav}
                    options={{
                        headerShown: false
                    }} />
                <RootStack.Screen
                    name='Story'
                    component={StoryScreen}
                    options={{
                        headerShown: false
                    }} />
                {/* <RootStack.Screen
                    name='ProfileScreen'
                    component={ProfileScreen}
                    options={{
                        headerShown: false
                    }} /> */}
                {/* <RootStack.Screen
                    name='Like'
                    component={LikesScreen}
                    options={{
                        headerShown: false
                    }} /> */}
                <RootStack.Screen
                    name='Comments'
                    component={CommentsScreen}
                    options={({ navigation }) => ({
                        headerShown: true,
                        title: 'Comments',
                        headerLeft: () => (
                            < TouchableOpacity style={styles.leftHeader} onPress={() => navigation.pop()}>
                                <MaterialIcons name='arrow-back-ios' size={25} />
                            </TouchableOpacity>
                        )
                    })} />
            </RootStack.Navigator>
        </>
    )
}

export default MainNav;

const styles = StyleSheet.create({
    leftHeader: {
        marginLeft: 15
    },
});



