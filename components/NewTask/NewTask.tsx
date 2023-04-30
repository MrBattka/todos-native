import React, { useCallback, useContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { ContextApp } from '../../state/task-reduser';
import { ActionType } from '../../state/ContextTypes';
import { TextInput } from 'react-native';
import { Button } from 'react-native';
import { TouchableOpacity } from 'react-native';
import ClearCompletedTask from '../ClearCompletedTask/ClearCompletedTask';

const NewTask = () => {
    const { changeState } = useContext(ContextApp);
    const [text, setText] = useState('')

    const createTask = useCallback(
        () => {
            let entryBan = text.replace(/[^a-zа-яё0-9]/gi, '')

            if (text && changeState && entryBan) {
                changeState({ type: ActionType.ADD, payload: text })
                setText('')
            }
        }, [text, changeState]
    )

    return (
        <View style={styles.wrapper}>
            <View style={styles.input}>
                <TextInput style={styles.in} onChangeText={(event) => setText(event)} value={text}
                    placeholder="What needs to be done?" onSubmitEditing={createTask} />
            </View>
            <View style={styles.wrapperBtn}>
                <View style={styles.wrapperNewTask}>
                    <Button onPress={() => createTask()} title='New Task' />
                </View>
                <ClearCompletedTask />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        margin: 5,
        justifyContent: 'space-between'
    },
    input: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: `#1e90ff`,
        padding: 1,
        paddingLeft: 10
    },
    in: {
        height: 35,
        width: 300,
        backgroundColor: 'white'
    },
    wrapperNewTask: {
        borderWidth: 1,
        borderColor: `#1e90ff`,
        borderRadius: 6,
        maxHeight: 35,
        flex: 1,
        justifyContent: 'center',
        marginRight: 5 
    },
    wrapperBtn: {
        flexDirection: 'row',
        width: '100%',
        height: 40,
        marginTop: 5
    },
    BtnTitle: {

    }
})

export default NewTask