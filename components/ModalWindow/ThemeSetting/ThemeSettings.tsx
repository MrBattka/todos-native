import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type ThemeOpenModeType = {
    openThemeMode: boolean
    themeMode: number
    setOpenThemeMode: Dispatch<SetStateAction<boolean>>
    setThemeMode: Dispatch<SetStateAction<number>>
}

const ThemeSettings = ({ themeMode, setOpenThemeMode, openThemeMode, setThemeMode }: ThemeOpenModeType) => {

    const storeData = async (value: number) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('theme', jsonValue)
            console.log(jsonValue);
        } catch (e) {
            console.log('Error soring data', e);
        }
    }

    const handlePressClassicThemeMode = () => {
        setOpenThemeMode(!openThemeMode)
        setThemeMode(1)
        storeData(1)
    }
    const handlePressDarkThemeMode = () => {
        setOpenThemeMode(!openThemeMode)
        setThemeMode(2)
        storeData(2)
    }
    const handlePressColourfulThemeMode = () => {
        setOpenThemeMode(!openThemeMode)
        setThemeMode(3)
        storeData(3)
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.wrapperThemeBtn}>
                <View style={styles.classic}>
                    <TouchableOpacity style={styles.ThemeClassicBtn} onPress={handlePressClassicThemeMode}>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePressClassicThemeMode}>
                        <Text style={styles.classicTxt}>Classic</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.dark}>
                    <TouchableOpacity style={styles.ThemeDarkBtn} onPress={handlePressDarkThemeMode}>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePressDarkThemeMode}>
                        <Text style={styles.darkTxt}>Dark</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.colourful}>
                    <TouchableOpacity style={styles.ThemeColourfulBtn} onPress={handlePressColourfulThemeMode}>
                        <Image style={styles.gradientImg} source={require('../../../assets/colourful-theme-gradient.jpg')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePressColourfulThemeMode}>
                        <Text style={styles.colourfulTxt}>Colourful</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        width: 90,
        height: 90,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        padding: 4
    },
    wrapperThemeBtn: {

    },
    ThemeClassicBtn: {
        backgroundColor: 'white',
        marginBottom: 10,
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 4,
    },
    ThemeDarkBtn: {
        backgroundColor: '#2f4f4f',
        marginBottom: 10,
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 4,
    },
    ThemeColourfulBtn: {
        width: 20,
        height: 20
    },
    gradientImg: {
        width: 20,
        height: 20,
        borderRadius: 4
    },
    classic: {
        flexDirection: 'row',
    },
    dark: {
        flexDirection: 'row',
    },
    colourful: {
        flexDirection: 'row',
    },
    classicTxt: {
        marginLeft: 3
    },
    darkTxt: {
        marginLeft: 3
    },
    colourfulTxt: {
        marginLeft: 3
    }
})

export default ThemeSettings