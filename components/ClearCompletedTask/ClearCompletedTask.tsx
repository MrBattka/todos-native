import React, { useCallback, useContext, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { ContextApp } from '../../state/task-reduser';
import { ActionType } from '../../state/ContextTypes';
import { TouchableOpacity } from 'react-native';

const ClearCompletedTask = () => {
    const { changeState = () => { } } = useContext(ContextApp);
    const [task] = useState('')

    const clearCompletedTask = useCallback(
        () => {
            changeState({ type: ActionType.REMOVE, payload: task })
        }, [task, changeState]
    )

  return (
    <View style={styles.clearCompleted}>
        <View>
            <Button onPress={() => clearCompletedTask()} title='Clear Tasks' />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    clearCompleted: {
        borderWidth: 1,
        borderColor: `#1e90ff`,
        borderRadius: 5,
        height: 35,
        width: '50%'
    }
})

export default ClearCompletedTask