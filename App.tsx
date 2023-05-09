
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from "expo-status-bar";
import { useEffect, useReducer, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";
import ActiveTask from "./components/AllTask/ActiveTask/ActiveTask";
import AllTask from "./components/AllTask/AllTask";
import CompletedTask from './components/AllTask/CompletedTask/CompletedTask';
import CounterTask from './components/CounterTask/CounterTask';
import ModalWindow from './components/ModalWindow/ModalWindow';
import NewTask from "./components/NewTask/NewTask";
import { Action, ActionType, ContextState, State } from "./state/ContextTypes";
import todoReducer, { ContextApp, initialState } from "./state/task-reduser";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SELECT_THEME = 'SELECT_THEME'

export default function App() {
  const [state, changeState] = useReducer<React.Reducer<State, Action>>(todoReducer, initialState)
  const [saveTasks, setSaveTask] = useState(null)
  const [openSettingMode, setOpenSettingMode] = useState(false)
  const [themeMode, setThemeMode] = useState(1)

  const ContextState: ContextState = {
    state,
    changeState
  }

  const Stack = createBottomTabNavigator()
  const allTasksIcon = <Image style={styles.img} source={require('./assets/all-task-stick.png')} />
  const activeTasksIcon = <Image style={styles.imgActive} source={require('./assets/active.png')} />
  const completedTasksIcon = <Image style={styles.img} source={require('./assets/completed-list.png')} />

  const getTasks = async () => {
    try {
        const value = await AsyncStorage.getItem('tasks')
        if (value !== null) {
          setSaveTask(value)
          changeState({ type: ActionType.SAVE, payload: value })
        }
        console.log(value);
    } catch (e) {
        console.log('Error getting data', e);
    }
}
useEffect(() => {
    getTasks()
}, [])

  const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('theme')
        const numValue = Number(value)
        if (numValue !== null) {
            setThemeMode(numValue)
        }

    } catch (e) {
        console.log('Error getting data', e);
    }
}

useEffect(() => {
    getData()
}, [])

  return (
    <NavigationContainer>
      <View style={themeMode === 1 && styles.containerClassic ||
        themeMode === 2 && styles.containerDark ||
        themeMode === 3 && styles.containerColourful}>
        <ContextApp.Provider value={ContextState}>
          <View style={styles.app}>
            <View style={styles.wrapperTitle}>
              <Text style={themeMode === 1 && styles.titleClassic || themeMode === 2 && styles.titleDark || themeMode === 3 &&
                styles.titleColourful}>TODOS</Text>
            </View>
            <View style={themeMode === 1 && styles.wrapperAppClassic ||
              themeMode === 2 && styles.wrapperAppDark ||
              themeMode === 3 && styles.wrapperAppColourful}>
              <NewTask saveTasks={saveTasks} setSaveTask={setSaveTask} />
              <View style={styles.wrapperCounter}>
                <CounterTask openSettingMode={openSettingMode} setOpenSettingMode={setOpenSettingMode} />
              </View>

              {openSettingMode ?

                <ModalWindow themeMode={themeMode} setThemeMode={setThemeMode} /> :

                <Stack.Navigator sceneContainerStyle={themeMode === 1 && styles.wrapperNavClassic ||
                  themeMode === 2 && styles.wrapperNavDark ||
                  themeMode === 3 && styles.wrapperNavColourful}>
                  <Stack.Screen name="All" component={AllTask} options={{
                    headerShown: false,
                    tabBarStyle: {
                      borderTopWidth: 0
                    },
                    tabBarLabelStyle: {
                      fontSize: 11
                    },
                    tabBarInactiveBackgroundColor: themeMode === 1 && 'white' || themeMode === 2 && '#696969' || themeMode === 3 && '#1E997C',
                    tabBarActiveBackgroundColor: themeMode === 1 && 'white' || themeMode === 2 && '#D3D3D3' || themeMode === 3 && '#14705b',
                    tabBarActiveTintColor: themeMode === 1 && 'blue' || themeMode === 2 && '#696969' || themeMode === 3 && 'yellow',
                    tabBarInactiveTintColor: themeMode === 1 && 'gray' || themeMode === 2 && 'white' || themeMode === 3 && 'white',
                    tabBarIcon: () => {
                      return (
                        allTasksIcon
                      )
                    }
                  }} />
                  <Stack.Screen name="Active" component={ActiveTask} options={{
                    headerShown: false,
                    tabBarStyle: {
                      borderTopWidth: 0
                    },
                    tabBarLabelStyle: {
                      fontSize: 11
                    },
                    tabBarInactiveBackgroundColor: themeMode === 1 && 'white' || themeMode === 2 && '#696969' || themeMode === 3 && '#1E997C',
                    tabBarActiveBackgroundColor: themeMode === 1 && 'white' || themeMode === 2 && '#D3D3D3' || themeMode === 3 && '#14705b',
                    tabBarActiveTintColor: themeMode === 1 && 'blue' || themeMode === 2 && '#696969' || themeMode === 3 && 'yellow',
                    tabBarInactiveTintColor: themeMode === 1 && 'gray' || themeMode === 2 && 'white' || themeMode === 3 && 'white',
                    tabBarIcon: () => {
                      return (
                        activeTasksIcon
                      )
                    }
                  }} />
                  <Stack.Screen name='Completed' component={CompletedTask} options={{
                    headerShown: false,
                    tabBarStyle: {
                      borderTopWidth: 0
                    },
                    tabBarLabelStyle: {
                      fontSize: 11
                    },
                    tabBarInactiveBackgroundColor: themeMode === 1 && 'white' || themeMode === 2 && '#696969' || themeMode === 3 && '#1E997C',
                    tabBarActiveBackgroundColor: themeMode === 1 && 'white' || themeMode === 2 && '#D3D3D3' || themeMode === 3 && '#14705b',
                    tabBarActiveTintColor: themeMode === 1 && 'blue' || themeMode === 2 && '#696969' || themeMode === 3 && 'yellow',
                    tabBarInactiveTintColor: themeMode === 1 && 'gray' || themeMode === 2 && 'white' || themeMode === 3 && 'white',
                    tabBarIcon: () => {
                      return (
                        completedTasksIcon
                      )
                    }
                  }} />
                </Stack.Navigator>}

            </View>
          </View>
        </ContextApp.Provider>
        <StatusBar style="light" />
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  containerClassic: {
    margin: 0,
    flex: 1,
    backgroundColor: "rgb(245, 245, 245)",
    alignItems: "center",
    justifyContent: 'center'
  },
  containerDark: {
    margin: 0,
    flex: 1,
    backgroundColor: "#212121",
    alignItems: "center",
    justifyContent: 'center'
  },
  containerColourful: {
    margin: 0,
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: 'center'
  },
  app: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperTitle: {

  },
  titleClassic: {
    fontSize: 50,
    color: 'rgb(232, 217, 216)',
    letterSpacing: 5,
    fontWeight: '300'
  },
  titleDark: {
    fontSize: 50,
    color: 'gray',
    letterSpacing: 5,
    fontWeight: '300'
  },
  titleColourful: {
    fontSize: 50,
    color: '#1E997C',
    letterSpacing: 5,
    fontWeight: '300'
  },
  wrapperAppClassic: {
    backgroundColor: 'white',
    maxHeight: '70%',
    overflow: 'scroll',
    elevation: 5,
    shadowColor: 'rgb(232, 217, 216)',
    borderRadius: 6,
    marginTop: 40
  },
  wrapperAppDark: {
    backgroundColor: '#696969',
    maxHeight: '70%',
    overflow: 'scroll',
    elevation: 5,
    shadowColor: 'white',
    borderRadius: 6,
    marginTop: 40
  },
  wrapperAppColourful: {
    backgroundColor: '#14705b',
    maxHeight: '70%',
    overflow: 'scroll',
    elevation: 5,
    shadowColor: '#14705b',
    borderRadius: 6,
    marginTop: 40
  },
  wrapperNavClassic: {
    backgroundColor: 'white',
    width: '100%'
  },
  wrapperNavDark: {
    backgroundColor: '#696969',
    width: '100%'
  },
  wrapperNavColourful: {
    backgroundColor: '#14705b',
    width: '100%'
  },
  wrapperCounter: {
    borderColor: 'gray',
    borderRadius: 20,
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  img: {
    width: 30,
    height: 30
  },
  imgActive: {
    width: 48,
    height: 48
  }
})