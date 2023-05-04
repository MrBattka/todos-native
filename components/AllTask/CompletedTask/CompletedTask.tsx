import { ListItem } from '@rneui/base';
import React, { useCallback, useContext } from 'react';

import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActionType, Task, defaultState } from '../../../state/ContextTypes';
import { ContextApp } from '../../../state/task-reduser';

const CompletedTask = () => {

    const { state = defaultState, changeState = () => { } } = useContext(ContextApp);

    const taskCompletedCounter = state.tasks.map(t => t.isDone).filter(t => t === true)

    const toggleTask = useCallback(
        (taskToggle: Task) => {
            changeState({ type: ActionType.TOGGLE, payload: taskToggle })
        }, [changeState]
    )

    return (
        <View style={styles.wrapper}>
            <ScrollView>
                {!taskCompletedCounter[0] ?

                    <View style={styles.tasksEmpty}>
                        <Text style={styles.tasksEmptyText}>The list of completed tasks is empty</Text>
                    </View> :

                    state.tasks.map((task, i) => (
                        !task.isDone ? null :
                            <View key={i} style={styles.task}>
                                {/* <ListItem.CheckBox
                                    checked={task.isDone}
                                    onPress={() => toggleTask(task)} /> */}
                                <TouchableOpacity style={task.isDone ? styles.cmpltdTask : styles.activeTask}
                                    onPress={() => toggleTask(task)}>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => toggleTask(task)}>
                                    <Text style={task.isDone ? styles.taskTextCmpltd : styles.taskText}>
                                        {task.taskText}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                    ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {

    },
    tasksEmpty: {
        alignItems: 'center',
        marginTop: '25%'
    },
    tasksEmptyText: {
        color: `#a9a9a9`
    },
    wrapperText: {

    },
    activeTask: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: 'gray'
    },
    cmpltdTask: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#ffd700'
    },
    taskTextCmpltd: {
        textDecorationLine: 'line-through',
        color: '#a9a9a9',
        marginLeft: 15,
        letterSpacing: 0.4
    },
    taskText: {
        marginLeft: 15,
        letterSpacing: 0.4
    },
    task: {
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 10,
        alignItems: 'center'
    }
})

export default CompletedTask