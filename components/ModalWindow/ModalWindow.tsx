import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import ThemeSettings from './ThemeSetting/ThemeSettings';

type ThemeSelectModeType = {
    setThemeMode: Dispatch<SetStateAction<number>>
}

const ModalWindow = ({ setThemeMode }: ThemeSelectModeType) => {
    const [openThemeMode, setOpenThemeMode] = useState(false)

    return (
        <View style={styles.wrapper}>
            <Text style={styles.headerTitle}>Settings:</Text>
            <View style={styles.wrapperTheme}>
                <Text>Theme:</Text>
                {openThemeMode ?

                    <View style={styles.modalTheme}>
                        <ThemeSettings setOpenThemeMode={setOpenThemeMode} openThemeMode={openThemeMode}
                            setThemeMode={setThemeMode} />
                    </View> :

                    <View style={styles.wrapperThemeSquare}>
                        <TouchableOpacity style={styles.themeSquare} onPress={() => setOpenThemeMode(!openThemeMode)}>
                        </TouchableOpacity>
                    </View>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        height: '80%',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '5%'
    },
    headerTitle: {
        fontSize: 20,
        color: 'gray'
    },
    wrapperTheme: {
        marginTop: '5%',
        width: '60%',
        flexDirection: 'row',
    },
    wrapperThemeSquare: {
        marginLeft: 'auto'
    },
    themeSquare: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 4,
    },
    modalTheme: {
        marginLeft: 'auto'
    }
})

export default ModalWindow