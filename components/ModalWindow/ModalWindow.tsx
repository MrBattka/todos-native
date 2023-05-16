import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import ThemeSettings from './ThemeSetting/ThemeSettings';

type ThemeSelectModeType = {
    themeMode: number
    setThemeMode: Dispatch<SetStateAction<number>>
}

const ModalWindow = ({ themeMode, setThemeMode }: ThemeSelectModeType) => {
    const [openThemeMode, setOpenThemeMode] = useState(false)

    return (
        <View style={styles.wrapper}>
            <Text style={themeMode === 1 && styles.headerClassic ||
                themeMode === 2 && styles.headerTitleDark ||
                themeMode === 3 && styles.headerTitleColourful}>Settings:</Text>
            <View style={styles.wrapperTheme}>
                <Text style={themeMode === 1 && styles.settingThemeTxtClassic ||
                    themeMode === 2 && styles.settingThemeTxtDark ||
                    themeMode === 3 && styles.settingThemeTxtColourful}>Theme:</Text>
                {openThemeMode ?

                    <View style={styles.modalTheme}>
                        <ThemeSettings setOpenThemeMode={setOpenThemeMode} openThemeMode={openThemeMode}
                            themeMode={themeMode} setThemeMode={setThemeMode} />
                    </View> :

                    <View style={styles.wrapperThemeSquare}>
                        <TouchableOpacity style={themeMode === 1 && styles.themeSquareClassic ||
                            themeMode === 2 && styles.themeSquareDark ||
                            themeMode === 3 && styles.themeSquareColourful} onPress={() => setOpenThemeMode(!openThemeMode)}>
                            {themeMode === 1 &&
                                <Image style={styles.gradientImg} source={require('../../assets/classic_square.png')} /> ||
                                themeMode === 2 &&
                                <Image style={styles.gradientImg} source={require('../../assets/dark_square.png')} /> ||
                                themeMode === 3 &&
                                <Image style={styles.gradientImg} source={require('../../assets/colourful_square.png')} />}
                        </TouchableOpacity>
                    </View>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        height: '79%',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '5%'
    },
    headerClassic: {
        fontSize: 20,
        color: 'gray',
        letterSpacing: 0.6
    },
    headerTitleDark: {
        fontSize: 20,
        color: '#ededed',
        letterSpacing: 0.6
    },
    headerTitleColourful: {
        fontSize: 20,
        color: 'white',
        letterSpacing: 0.6
    },
    settingThemeTxtClassic: {
        fontSize: 15,
        fontWeight: '300'
    },
    settingThemeTxtDark: {
        fontSize: 15,
        color: '#dbdbd9',
        fontWeight: '300'
    },
    settingThemeTxtColourful: {
        fontSize: 15,
        color: '#bdbdbd',
        fontWeight: '300'
    },
    wrapperTheme: {
        marginTop: '5%',
        width: '60%',
        flexDirection: 'row',
    },
    wrapperThemeSquare: {
        marginLeft: 'auto'
    },
    themeSquareClassic: {
        borderWidth: 1,
        borderColor: '#959696',
        borderRadius: 4,
        width: 22,
        height: 22,
    },
    themeSquareDark: {
        borderColor: '#525252',
        borderRadius: 4,
        borderWidth: 2,
        width: 22,
        height: 22,
    },
    themeSquareColourful: {
        borderColor: '#085240',
        borderWidth: 2,
        borderRadius: 4,
        width: 22,
        height: 22,
    },
    gradientImg: {
        width: 19,
        height: 19,
        borderRadius: 4
    },
    modalTheme: {
        marginLeft: 'auto'
    }
})

export default ModalWindow