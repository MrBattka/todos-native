import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ThemeSettings from './ThemeSettings/ThemeSettings';

const ModalWindow = () => {
    const [openThemeMode, setOpenThemeMode] = useState(true)

    return (
        <View style={styles.wrapper}>
            <Text style={styles.headerTitle}>Settings:</Text>
            <View style={styles.wrapperTheme}>
                <Text>Theme:</Text>
                {openThemeMode ? <TouchableOpacity style={styles.wrapperThemeBtn} onPress={() => setOpenThemeMode(!openThemeMode)}>
                </TouchableOpacity> :
                    <View style={styles.modalTheme}>
                        <ThemeSettings setOpenThemeMode={setOpenThemeMode} openThemeMode={openThemeMode} />
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
    wrapperThemeBtn: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 4,
        marginLeft: 'auto'
    },
    modalTheme: {
        marginLeft: 'auto'
    }
})

export default ModalWindow