
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
      // const arrValue = value.replace(/^"(.*)"$/, '$1')
      const arrValue = value?.slice(1, -1)
      const result = JSON.parse('[' + arrValue + ']')
      if (value !== null) {
        changeState({ type: ActionType.SAVE, payload: result })
      }
      console.log(typeof arrValue);
      
    } catch (e) {
      console.log('Error getting data', e);
    }
  }
  state.tasks.map(t => t)
  
  useEffect(() => {
    getTasks()
  }, [])
  console.log(state.tasks);
  

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('theme')
      const numValue = Number(value)

      if (numValue !== 0) {
        setThemeMode(numValue)
        changeState({ type: ActionType.SELECTED_THEME, payload: numValue })
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
              <NewTask themeMode={themeMode} setThemeMode={setThemeMode} saveTasks={saveTasks} setSaveTask={setSaveTask} />
              <View style={themeMode === 2 && styles.wrapperCounterDark || styles.wrapperCounterClassicAndColourful}>
                <CounterTask themeMode={themeMode} setThemeMode={setThemeMode}
                  openSettingMode={openSettingMode} setOpenSettingMode={setOpenSettingMode} />
              </View>

              {openSettingMode ?

                <ModalWindow themeMode={themeMode} setThemeMode={setThemeMode} /> :

                <View style={styles.heightNav}>
                  {themeMode === 1 &&
                    (<Stack.Navigator sceneContainerStyle={themeMode === 1 && styles.wrapperNavClassic}>
                      <Stack.Screen name="All" component={AllTask} options={{
                        headerShown: false,
                        tabBarStyle: {
                          borderTopWidth: 0
                        },
                        tabBarLabelStyle: {
                          fontSize: 11
                        },
                        tabBarInactiveBackgroundColor: 'white',
                        tabBarActiveBackgroundColor: '#d6d6d6',
                        tabBarActiveTintColor: 'blue',
                        tabBarInactiveTintColor: 'gray',
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
                        tabBarInactiveBackgroundColor: 'white',
                        tabBarActiveBackgroundColor: '#d6d6d6',
                        tabBarActiveTintColor: 'blue',
                        tabBarInactiveTintColor: 'gray',
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
                        tabBarInactiveBackgroundColor: 'white',
                        tabBarActiveBackgroundColor: '#d6d6d6',
                        tabBarActiveTintColor: 'blue',
                        tabBarInactiveTintColor: 'gray',
                        tabBarIcon: () => {
                          return (
                            completedTasksIcon
                          )
                        }
                      }} />
                    </Stack.Navigator>)
                    || themeMode === 2 &&
                    (<Stack.Navigator sceneContainerStyle={themeMode === 2 && styles.wrapperNavDark}>
                      <Stack.Screen name="All" component={AllTask} options={{
                        headerShown: false,
                        tabBarStyle: {
                          borderTopWidth: 0
                        },
                        tabBarLabelStyle: {
                          fontSize: 11
                        },
                        tabBarInactiveBackgroundColor: '#696969',
                        tabBarActiveBackgroundColor: '#D3D3D3',
                        tabBarActiveTintColor: '#696969',
                        tabBarInactiveTintColor: 'white',
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
                        tabBarInactiveBackgroundColor: '#696969',
                        tabBarActiveBackgroundColor: '#D3D3D3',
                        tabBarActiveTintColor: '#696969',
                        tabBarInactiveTintColor: 'white',
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
                        tabBarInactiveBackgroundColor: '#696969',
                        tabBarActiveBackgroundColor: '#D3D3D3',
                        tabBarActiveTintColor: '#696969',
                        tabBarInactiveTintColor: 'white',
                        tabBarIcon: () => {
                          return (
                            completedTasksIcon
                          )
                        }
                      }} />
                    </Stack.Navigator>)
                    || themeMode === 3 &&
                    (<Stack.Navigator sceneContainerStyle={themeMode === 3 && styles.wrapperNavColourful}>
                      <Stack.Screen name="All" component={AllTask} options={{
                        headerShown: false,
                        tabBarStyle: {
                          borderTopWidth: 0
                        },
                        tabBarLabelStyle: {
                          fontSize: 11
                        },
                        tabBarInactiveBackgroundColor: '#1E997C',
                        tabBarActiveBackgroundColor: '#14705b',
                        tabBarActiveTintColor: 'yellow',
                        tabBarInactiveTintColor: 'white',
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
                        tabBarInactiveBackgroundColor: '#1E997C',
                        tabBarActiveBackgroundColor: '#14705b',
                        tabBarActiveTintColor: 'yellow',
                        tabBarInactiveTintColor: 'white',
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
                        tabBarInactiveBackgroundColor: '#1E997C',
                        tabBarActiveBackgroundColor: '#14705b',
                        tabBarActiveTintColor: 'yellow',
                        tabBarInactiveTintColor: 'white',
                        tabBarIcon: () => {
                          return (
                            completedTasksIcon
                          )
                        }
                      }} />
                    </Stack.Navigator>)}
                </View>}
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
    backgroundColor: '#f5f5f5',
    alignItems: "flex-end",
    justifyContent: 'flex-end',
    width: '100%'
  },
  containerDark: {
    margin: 0,
    flex: 1,
    backgroundColor: "#212121",
    alignItems: "center",
    justifyContent: 'center',
    width: '100%',
    height: '70%'
  },
  containerColourful: {
    margin: 0,
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: 'center',
    width: '100%',
    height: '70%'
  },
  app: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%'
  },
  wrapperTitle: {
    marginTop: '10%',
    marginBottom: '5%'
  },
  heightNav: {
    flex: 1
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
    overflow: 'scroll',
    flex: 1,
    width: '100%',
    elevation: 5,
    shadowColor: 'rgb(232, 217, 216)',
    borderRadius: 6
  },
  wrapperAppDark: {
    backgroundColor: '#696969',
    overflow: 'scroll',
    flex: 1,
    width: '100%',
    elevation: 5,
    shadowColor: 'white',
    borderRadius: 6
  },
  wrapperAppColourful: {
    backgroundColor: '#14705b',
    flex: 1,
    width: '100%',
    overflow: 'scroll',
    elevation: 5,
    shadowColor: '#14705b',
    borderRadius: 6
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
  wrapperCounterDark: {
    borderColor: '#b8b8b8',
    borderRadius: 20,
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  wrapperCounterClassicAndColourful: {
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