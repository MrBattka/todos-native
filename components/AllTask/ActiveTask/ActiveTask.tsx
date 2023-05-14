import { ListItem } from '@rneui/base';
import React, { useCallback, useContext } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { ActionType, Task, defaultState } from '../../../state/ContextTypes';
import { ContextApp } from '../../../state/task-reduser';

const ActiveTask = () => {

    const { state = defaultState, changeState = () => { } } = useContext(ContextApp);

    const taskActiveCounter = state.tasks.map(t => t.isDone).filter(t => t === false)

    const toggleTask = useCallback(
        (taskForChange: Task) => {
            changeState({ type: ActionType.TOGGLE, payload: taskForChange })
        }, [changeState]
    )

    return (
        <View style={styles.wrapper}>
            <ScrollView>
                {taskActiveCounter.indexOf(true) && taskActiveCounter.length < 1 ?

                    <View style={styles.tasksEmpty}>
                        <Text style={styles.tasksEmptyText}>The list of active tasks is empty</Text>
                    </View> :

                    state.tasks.map((task, i) => (
                        task.isDone ? null :
                            <View key={i} style={styles.task}>
                                <TouchableOpacity style={task.isDone ? styles.cmpltdTask : styles.activeTask}
                                    onPress={() => toggleTask(task)}>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => toggleTask(task)}>
                                        <Text style={state.selectedTheme === 1 && styles.taskTextClassic ||
                                        state.selectedTheme === 2 && styles.taskTextDark ||
                                        state.selectedTheme === 3 && styles.taskTextColourful}>{task.taskText}</Text>
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
        marginTop: '15%',
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
    taskTextClassic: {
        marginLeft: 15,
        letterSpacing: 0.4
    },
    taskTextDark: {
        marginLeft: 15,
        letterSpacing: 0.4,
        color: '#ededed'
    },
    taskTextColourful: {
        marginLeft: 15,
        letterSpacing: 0.4,
        color: '#e6e8e8'
    },
    task: {
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 20,
        alignItems: 'center'
    }
})

export default ActiveTask