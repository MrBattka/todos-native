import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { getValueFor, save } from '../../helpers/storageHelper';
import { ActionType, Task, defaultState } from '../../state/ContextTypes';
import { ContextApp } from '../../state/task-reduser';
import ClearCompletedTask from '../ClearCompletedTask/ClearCompletedTask';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SAVE_TODOS = 'SAVE_TODOS'

const NewTask = ({ saveTasks, setSaveTask }: any) => {
    const { state = defaultState, changeState = () => { } } = useContext(ContextApp);
    const [text, setText] = useState('')

    const storeTasks = async (arr: any) => {
        try {
            const jsonValue = JSON.stringify(arr)
            await AsyncStorage.setItem('tasks', jsonValue)
            console.log(jsonValue);

        } catch (e) {
            console.log('Error soring data', e);
        }
    }

    const createTask = useCallback(
        () => {
            let entryBan = text.replace(/[^a-zа-яё0-9]/gi, '')

            if (text && changeState && entryBan) {
                changeState({ type: ActionType.ADD, payload: text })
                setText('')
                const newTodos = { text: text, isDone: false }
                storeTasks([...state.tasks, newTodos])
                
            }
        }, [text, changeState, storeTasks]
    )


    return (
        <View style={styles.wrapper}>
            <View style={styles.wrapperInput}>
                <TextInput style={styles.inputClassic} onChangeText={event => setText(event)} value={text}
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
    wrapperInput: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: `#1e90ff`,
        padding: 1,
        paddingLeft: 10
    },
    inputClassic: {
        height: 35,
        width: 300,
        backgroundColor: 'white'
    },
    inputDark: {

    },
    inputColourful: {

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