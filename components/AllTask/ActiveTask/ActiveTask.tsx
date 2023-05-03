import { ListItem } from '@rneui/base';
import React, { useCallback, useContext } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
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
                                <ListItem.CheckBox
                                    onPress={() => toggleTask(task)}
                                    checked={task.isDone} />
                                <View style={styles.wrapperText}>
                                    <Text style={styles.taskText}>{task.taskText}</Text>
                                </View>
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
        marginTop: '25%',
    },
    tasksEmptyText: {
        color: `#a9a9a9`
    },
    wrapperText: {

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

export default ActiveTask