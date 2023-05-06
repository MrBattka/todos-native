import React, { Dispatch, SetStateAction } from 'react'
import { Image } from 'react-native'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type ThemeOpenModeType = {
    openThemeMode: boolean
    setOpenThemeMode: Dispatch<SetStateAction<boolean>>
}

const ThemeSettings = ({ setOpenThemeMode, openThemeMode }: ThemeOpenModeType) => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.wrapperThemeBtn}>
                <View style={styles.classic}>
                    <TouchableOpacity style={styles.ThemeClassicBtn} onPress={() => setOpenThemeMode(!openThemeMode)}>
                    </TouchableOpacity>
                    <Text style={styles.classicTxt}>Classic</Text>
                </View>
                <View style={styles.dark}>
                    <TouchableOpacity style={styles.ThemeDarkBtn} onPress={() => setOpenThemeMode(!openThemeMode)}>
                    </TouchableOpacity>
                    <Text style={styles.darkTxt}>Dark</Text>
                </View>
                <View style={styles.colourful}>
                    <TouchableOpacity style={styles.ThemeColourfulBtn} onPress={() => setOpenThemeMode(!openThemeMode)}>
                    <Image style={styles.gradientImg} source={require('../../../assets/colourful-theme-gradient.jpg')} />
                    </TouchableOpacity>
                    <Text style={styles.colourfulTxt}>colourful</Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        width: 90,
        height: 76,
        borderWidth: 1,
        borderRadius: 4,
        padding: 4
    },
    wrapperThemeBtn: {

    },
    ThemeClassicBtn: {
        marginBottom: 2,
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 4,
    },
    ThemeDarkBtn: {
        backgroundColor: '#2f4f4f',
        marginBottom: 2,
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 4,
    },
    ThemeColourfulBtn: {
        marginBottom: 2,
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 4,
    },
    gradientImg: {
        width: 18,
        height: 18
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