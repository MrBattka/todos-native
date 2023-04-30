import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { defaultState } from '../../state/ContextTypes';
import { ContextApp } from '../../state/task-reduser';

const CounterTask = () => {
    const { state = defaultState } = useContext(ContextApp);
    const taskActiveCounter = state.tasks.map(t => t.isDone).filter(t => t === false)

  return (
    <View style={styles.counterItem}>
        <Text style={styles.txt}><Text style={styles.number}>{taskActiveCounter.length}</Text> items left</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    counterItem: {
        width: '100%',
        alignItems: 'center'
    },
    txt: {
        letterSpacing: 0.4,
        color: 'gray'
    },
    number: {
        color: `#1e90ff`
    }
})

export default CounterTask