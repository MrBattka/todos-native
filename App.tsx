
import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from "expo-status-bar";
import { useReducer } from "react";
import {
  StyleSheet,
  Text,
  View
} from "react-native";
import ActiveTask from "./components/AllTask/ActiveTask/ActiveTask";
import AllTask from "./components/AllTask/AllTask";
import CompletedTask from './components/AllTask/CompletedTask/CompletedTask';
import CounterTask from './components/CounterTask/CounterTask';
import NewTask from "./components/NewTask/NewTask";
import { Action, ContextState, State } from "./state/ContextTypes";
import todoReducer, { ContextApp, initialState } from "./state/task-reduser";

export default function App () {
  const [state, changeState] = useReducer<React.Reducer<State, Action>>(todoReducer, initialState)

  const ContextState: ContextState = {
    state,
    changeState
  }

  const Stack = createBottomTabNavigator()
  const allTasksIcon = <AntDesign name="bars" size={25} color="gray" />
  const activeTasksIcon = <AntDesign name='clockcircleo' size={25} color='gray' />
  const completedTasksIcon = <AntDesign name="clockcircleo" size={25} color="gray" />

  return (
    <NavigationContainer>
      <View style={styles.container}>

        <ContextApp.Provider value={ContextState}>
          <View style={styles.app}>
            <View style={styles.wrapperTitle}>
              <Text style={styles.title}>TODOS</Text>
            </View>
            <View style={styles.wrapperApp}>
              <NewTask />
              <View style={styles.wrapperCounter}>
                <CounterTask />
              </View>
              <Stack.Navigator sceneContainerStyle={styles.wrapperNav} >
                <Stack.Screen name="All" component={AllTask} options={{
                  headerShown: false, tabBarIcon: () => {
                    return (
                      allTasksIcon
                    )
                  }
                }} />
                <Stack.Screen name="Active" component={ActiveTask} options={{
                  headerShown: false, tabBarIcon: () => {
                    return (
                      activeTasksIcon
                    )
                  }
                }} />
                <Stack.Screen name='Completed' component={CompletedTask} options={{
                  headerShown: false, tabBarIcon: () => {
                    return (
                      completedTasksIcon
                    )
                  }
                }} />
              </Stack.Navigator>
            </View>
          </View>
        </ContextApp.Provider>
        <StatusBar style="light" />

      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    flex: 1,
    backgroundColor: "rgb(245, 245, 245)",
    alignItems: "center",
    justifyContent: 'center'
  },
  app: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperTitle: {

  },
  title: {
    fontSize: 50,
    color: 'rgb(232, 217, 216)',
    letterSpacing: 5,
    fontWeight: '300'
  },
  wrapperApp: {
    backgroundColor: 'white',
    maxHeight: '70%',
    overflow: 'scroll',
    elevation: 5,
    borderRadius: 6,
    marginTop: 40
  },

  wrapperNav: {
    backgroundColor: 'white',
    width: '100%'
  },
  wrapperCounter: {

  }
})