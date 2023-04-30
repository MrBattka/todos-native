import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';

type NavTypes = {
    a: undefined,
    All: undefined,
    Completed: undefined
}

type ActiveScreenProp = BottomTabNavigationProp<NavTypes, 'a'>
type AllScreenProp = BottomTabNavigationProp<NavTypes, 'All'>
type CompletedScreenProp = BottomTabNavigationProp<NavTypes, 'Completed'>

const Navbar = () => {
    const navigationToAll = useNavigation<AllScreenProp>()
    const navigationToActive = useNavigation<ActiveScreenProp>()
    const navigationToCompleted = useNavigation<CompletedScreenProp>()

    return (
        <View style={styles.nav}>
            <View style={styles.wrapperNav}>
                <Pressable onPress={() => navigationToAll.navigate('All')}>
                    <Text>All</Text>
                </Pressable>
            </View>
            <View>
                <Pressable onPress={() => navigationToActive.navigate('a')}>
                    <Text>Active</Text>
                </Pressable>
            </View>
            <View>
                <Pressable onPress={() => navigationToCompleted.navigate('Completed')}>
                    <Text>Completed</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    nav: {
        flexDirection: 'row'
    },
    wrapperNav: {

    },
    item: {

    },
    active: {

    }
})

export default Navbar