import React, { Dispatch, SetStateAction, useContext } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { defaultState } from '../../state/ContextTypes';
import { ContextApp } from '../../state/task-reduser';

type OpenModeType = {
    openSettingMode: boolean
    setOpenSettingMode: Dispatch<SetStateAction<boolean>>
    themeMode: number
    setThemeMode: Dispatch<SetStateAction<number>>
}

const CounterTask = ({ openSettingMode, setOpenSettingMode, themeMode, setThemeMode }: OpenModeType) => {
    const { state = defaultState } = useContext(ContextApp);
    const taskActiveCounter = state.tasks.map(t => t.isDone).filter(t => t === false)

    return (
        <View style={styles.counterItem}>
            <Text style={themeMode === 1 && styles.txtClassic || themeMode === 2 && styles.txtDark ||
                themeMode === 3 && styles.txtColourful}><Text style={themeMode === 1 && styles.numberClassic || styles.numberOther}>
                    {taskActiveCounter.length}</Text> items left </Text>
            {/* Setting Modal window */}
            <TouchableOpacity style={styles.wrapperSettingImg} onPress={() => setOpenSettingMode(!openSettingMode)}>
                <Image style={styles.settingImg} source={require('../../assets/setting.png')} />
                <Text style={themeMode === 1 && styles.txtClassic || themeMode === 2 && styles.txtDark ||
                    themeMode === 3 && styles.txtColourful}>Setting</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    counterItem: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    txtClassic: {
        letterSpacing: 0.6,
        color: 'gray'
    },
    txtDark: {
        letterSpacing: 0.6,
        color: '#dbdbd9'
    },
    txtColourful: {
        letterSpacing: 0.6,
        color: 'white'
    },
    numberClassic: {
        color: '#1e90ff'
    },
    numberOther: {
        color: `#ffe603`
    },
    wrapperSettingImg: {
        flexDirection: 'row'
    },
    settingImg: {
        width: 20,
        height: 20,
        marginRight: 5
    }
})

export default CounterTask