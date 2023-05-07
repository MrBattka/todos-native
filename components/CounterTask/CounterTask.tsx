import React, { Dispatch, SetStateAction, useContext } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { defaultState } from '../../state/ContextTypes';
import { ContextApp } from '../../state/task-reduser';

type OpenModeType = {
    openSettingMode: boolean
    setOpenSettingMode: Dispatch<SetStateAction<boolean>>
}

const CounterTask = ({ openSettingMode, setOpenSettingMode }: OpenModeType) => {
    const { state = defaultState } = useContext(ContextApp);
    const taskActiveCounter = state.tasks.map(t => t.isDone).filter(t => t === false)
    
    return (
        <View style={styles.counterItem}>
            <Text style={styles.txt}><Text style={styles.number}>{taskActiveCounter.length}</Text> items left </Text>
                                            {/* Setting Modal window */}
            <TouchableOpacity style={styles.wrapperSettingImg} onPress={() => setOpenSettingMode(!openSettingMode)}>
                <Image style={styles.settingImg} source={require('../../assets/setting.png')} />
                <Text style={styles.settingTxt}>Setting</Text>
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
    txt: {
        letterSpacing: 0.4,
        color: 'gray'
    },
    number: {
        color: `#1e90ff`,
    },
    wrapperSettingImg: {
        flexDirection: 'row'
    },
    settingImg: {
        width: 20,
        height: 20,
        marginRight: 5
    },
    settingTxt: {
        color: '#696969'
    }
})

export default CounterTask