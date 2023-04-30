import { CheckBox, ListItem } from '@rneui/base'
import React, { useCallback, useContext } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { ActionType, Task, defaultState } from '../../state/ContextTypes'
import { ContextApp } from '../../state/task-reduser'

const AllTask = () => {
    const { state = defaultState, changeState = () => { } } = useContext(ContextApp)

    const toggleTask = useCallback(
        (taskForChange: Task) => {
            changeState({ type: ActionType.TOGGLE, payload: taskForChange })
        }, [changeState]
    )

    return (
        <View style={styles.wrapper}>
            <ScrollView>
                {!state.tasks.length ?

                    <View style={styles.tasksEmpty}>
                        <Text style={styles.tasksEmptyText}>The task list is empty</Text>
                    </View> :

                    state.tasks.map((task, i) => (
                        <View key={i} style={styles.task}>
                            <ListItem.CheckBox
                                onPress={() => toggleTask(task)}
                                checked={task.isDone} />
                            <View style={styles.wrapperText}>
                                <Text style={task.isDone ? styles.taskTextCmpltd : styles.taskText}>
                                    {task.taskText}
                                </Text>
                            </View>
                        </View>
                    ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row'
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
    taskTextCmpltd: {
        textDecorationLine: 'line-through',
        color: 'gray',
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

export default AllTask