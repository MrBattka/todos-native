import React, { SetStateAction, Dispatch, useCallback, useContext, useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { getValueFor, save } from '../../helpers/storageHelper';
import { ActionType, Task, defaultState } from '../../state/ContextTypes';
import { ContextApp } from '../../state/task-reduser';
import ClearCompletedTask from '../ClearCompletedTask/ClearCompletedTask';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SAVE_TODOS = 'SAVE_TODOS'

type NewTaskType = {
    saveTasks: [],
    setSaveTask: Dispatch<SetStateAction<[]>>
    themeMode: number
    setThemeMode: Dispatch<SetStateAction<number>>
}

const NewTask = ({ saveTasks, setSaveTask, themeMode, setThemeMode }: NewTaskType) => {
    const { state = defaultState, changeState = () => { } } = useContext(ContextApp);
    const [text, setText] = useState('')

    // const storeTasks = async (arr: any) => {
    //     try {
    //         const jsonValue = JSON.stringify(arr)
    //         await AsyncStorage.setItem('tasks', jsonValue)
    //         console.log(jsonValue);

    //     } catch (e) {
    //         console.log('Error soring data', e);
    //     }
    // }

    const createTask = useCallback(
        () => {
            let entryBan = text.replace(/[^a-zа-яё0-9]/gi, '')

            if (text && changeState && entryBan) {
                changeState({ type: ActionType.ADD, payload: text })
                setText('')
                const newTodos = { text: text, isDone: false }
                // storeTasks([...state.tasks, newTodos])

            }
        }, [text, changeState]
    )

    return (
        <View style={styles.wrapper}>
            <View style={themeMode === 1 && styles.wrapperInputClassic || themeMode === 2 && styles.wrapperInputDark ||
                    themeMode === 3 && styles.wrapperInputColourful}>
                <TextInput style={themeMode === 1 && styles.inputClassic || themeMode === 2 && styles.inputDark ||
                    themeMode === 3 && styles.inputColourful}
                    onChangeText={event => setText(event)} value={text}
                    placeholder="What needs to be done?" 
                    onSubmitEditing={createTask} />
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
    wrapperInputClassic: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: `#1e90ff`,
        padding: 1
    },
    wrapperInputDark: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: `#696969`,
        padding: 1
    },
    wrapperInputColourful: {
        borderRadius: 6,
        paddingBottom: 2
    },
    inputClassic: {
        height: 35,
        width: 300,
        borderRadius: 6,
        backgroundColor: 'white',
        paddingLeft: 10
    },
    inputDark: {
        height: 35,
        width: 300,
        borderRadius: 6,
        borderWidth: 0,
        backgroundColor: '#adadad',
        paddingLeft: 10
    },
    inputColourful: {
        height: 35,
        width: 300,
        borderRadius: 6,
        backgroundColor: '#f5f5f5',
        paddingLeft: 10
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