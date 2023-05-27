import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ActionType, defaultState } from '../../../state/ContextTypes'
import { ContextApp } from '../../../state/task-reduser'

type ThemeOpenModeType = {
    openThemeMode: boolean
    themeMode: number
    setOpenThemeMode: Dispatch<SetStateAction<boolean>>
    setThemeMode: Dispatch<SetStateAction<number>>
}

const ThemeSettings = ({ themeMode, setOpenThemeMode, openThemeMode, setThemeMode }: ThemeOpenModeType) => {
    const { state = defaultState, changeState = () => { } } = useContext(ContextApp)
    const [activeTheme, setActiveTheme] = useState(themeMode)

    const storeData = async (value: number) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('theme', jsonValue)
        } catch (e) {
            console.log('Error soring data', e);
        }
    }

    useEffect(() => {
        storeData(themeMode)
    }, [themeMode, storeData])

    const handlePressClassicThemeMode = () => {
        setOpenThemeMode(!openThemeMode)
        setThemeMode(1)
        storeData(1)
        changeState({ type: ActionType.SELECTED_THEME, payload: 1 })
    }
    const handlePressDarkThemeMode = () => {
        setOpenThemeMode(!openThemeMode)
        setThemeMode(2)
        storeData(2)
        changeState({ type: ActionType.SELECTED_THEME, payload: 2 })
    }
    const handlePressColourfulThemeMode = () => {
        setOpenThemeMode(!openThemeMode)
        setThemeMode(3)
        storeData(3)
        changeState({ type: ActionType.SELECTED_THEME, payload: 3 })
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.wrapperThemeBtn}>
                <View style={styles.classic}>
                    <TouchableOpacity style={themeMode === 1 ? styles.activeThemeBtnClassic : styles.ThemeClassicBtn}
                        onPress={handlePressClassicThemeMode}>
                        <Image style={styles.gradientImg} source={require('../../../assets/classic_square.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePressClassicThemeMode}>
                        <Text style={themeMode === 1 ? styles.activeThemeTxtClassic : styles.classicTxt}>Classic</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.dark}>
                    <TouchableOpacity style={themeMode === 2 ? styles.activeThemeBtnDark : styles.ThemeDarkBtn}
                        onPress={handlePressDarkThemeMode}>
                        <Image style={styles.gradientImg} source={require('../../../assets/dark_square.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePressDarkThemeMode}>
                        <Text style={themeMode === 2 ? styles.activeThemeTxtDark : styles.darkTxt}>Dark</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.colourful}>
                    <TouchableOpacity style={themeMode === 3 ? styles.activeThemeBtnColourful : styles.ThemeColourfulBtn}
                        onPress={handlePressColourfulThemeMode}>
                        <Image style={styles.gradientImg} source={require('../../../assets/colourful_square.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePressColourfulThemeMode}>
                        <Text style={themeMode === 3 ? styles.activeThemeTxtColourful : styles.colourfulTxt}>Colourful</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        width: 96,
        height: 95,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        padding: 4
    },
    wrapperThemeBtn: {

    },
    activeThemeTxtClassic: {
        marginLeft: 3,
        color: '#1e90ff',
    },
    activeThemeTxtDark: {
        marginLeft: 3,
        color: '#ededed',
        letterSpacing: 0.3,
        fontWeight: '300'
    },
    activeThemeTxtColourful: {
        marginLeft: 3,
        color: '#e6e8e8',
        letterSpacing: 0.3,
        fontWeight: '300'
    },
    activeThemeBtnClassic: {
        borderColor: '#1e90ff',
        marginBottom: 10,
        width: 22,
        height: 22,
        borderWidth: 1,
        borderRadius: 4,
    },
    activeThemeBtnDark: {
        borderColor: '#e6e8e8',
        marginBottom: 10,
        width: 22,
        height: 22,
        borderWidth: 0.5,
        borderRadius: 4,
    },
    activeThemeBtnColourful: {
        borderColor: '#e6e8e8',
        marginBottom: 10,
        width: 22,
        height: 22,
        borderWidth: 0.5,
        borderRadius: 4,
    },
    ThemeClassicBtn: {
        borderColor: '#959696',
        marginBottom: 10,
        width: 22,
        height: 22,
        borderWidth: 1,
        borderRadius: 4,
    },
    ThemeDarkBtn: {
        borderColor: '#525252',
        marginBottom: 10,
        width: 22,
        height: 22,
        borderWidth: 1,
        borderRadius: 4,
    },
    ThemeColourfulBtn: {
        width: 22,
        height: 22,
        borderColor: '#085240',
        borderWidth: 1,
        borderRadius: 4
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