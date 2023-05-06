import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { getValueFor, save } from '../../helpers/storageHelper';
import { ActionType, Task } from '../../state/ContextTypes';
import { ContextApp } from '../../state/task-reduser';
import ClearCompletedTask from '../ClearCompletedTask/ClearCompletedTask';

const SAVE_TODOS = 'SAVE_TODOS'

const NewTask = ({ saveTasks, setSaveTask }: any) => {
    const { state, changeState } = useContext(ContextApp);
    const [text, setText] = useState('')

    // useEffect(() => {
    //     save(SAVE_TODOS, state.tasks)

    // }, [state.tasks])

    // useEffect(() => {
    //     let saveStore = getValueFor(SAVE_TODOS)

    //     setSaveTask(saveStore)
    // }, [])

    const createTask = useCallback(
        () => {
            let entryBan = text.replace(/[^a-zа-яё0-9]/gi, '')

            if (text && changeState && entryBan) {
                changeState({ type: ActionType.ADD, payload: text })
                setText('')
                const newTodos = [{ text: text, isDone: false }]
                // setSaveTask([...state?.tasks, newTodos])
            }
        }, [text, changeState]
    )


    return (
        <View style={styles.wrapper}>
            <View style={styles.wrapperInput}>
                <TextInput style={styles.input} onChangeText={event => setText(event)} value={text}
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
    input: {
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