
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from "expo-status-bar";
import { useReducer, useState } from "react";
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
import NewTask from "./components/NewTask/NewTask";
import { Action, ContextState, State } from "./state/ContextTypes";
import todoReducer, { ContextApp, initialState } from "./state/task-reduser";
import ModalWindow from './components/ModalWindow/ModalWindow';

export default function App() {
  const [state, changeState] = useReducer<React.Reducer<State, Action>>(todoReducer, initialState)
  const [saveTasks, setSaveTask] = useState(null)
  const [openSettingMode, setOpenSettingMode] = useState(false)
  const [themeMode, setThemeMode] = useState(2)

  const ContextState: ContextState = {
    state,
    changeState
  }

  const Stack = createBottomTabNavigator()
  const allTasksIcon = <Image style={styles.img} source={require('./assets/all-task-stick.png')} />
  const activeTasksIcon = <Image style={styles.imgActive} source={require('./assets/active.png')} />
  const completedTasksIcon = <Image style={styles.img} source={require('./assets/completed-list.png')} />

  return (
    <NavigationContainer>
      <View style={themeMode === 1 && styles.containerClassic ||
        themeMode === 2 && styles.containerDark ||
        themeMode === 3 && styles.containerColourful}>
        <ContextApp.Provider value={ContextState}>
          <View style={styles.app}>
            <View style={styles.wrapperTitle}>
              <Text style={styles.title}>TODOS</Text>
            </View>
            <View style={themeMode === 1 && styles.wrapperAppClassic ||
              themeMode === 2 && styles.wrapperAppDark ||
              themeMode === 3 && styles.wrapperAppColourful}>
              <NewTask saveTasks={saveTasks} setSaveTask={setSaveTask} />
              <View style={styles.wrapperCounter}>
                <CounterTask openSettingMode={openSettingMode} setOpenSettingMode={setOpenSettingMode} />
              </View>

              {openSettingMode ?

                <ModalWindow setThemeMode={setThemeMode} /> :

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
                    tabBarInactiveBackgroundColor: themeMode === 1 && 'white' || themeMode === 2 && '#696969' || themeMode === 3 && '',
                    tabBarActiveBackgroundColor: themeMode === 1 && 'white' || themeMode === 2 && '#D3D3D3' || themeMode === 3 && '',
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
                    tabBarInactiveBackgroundColor: themeMode === 1 && 'white' || themeMode === 2 && '#696969' || themeMode === 3 && '',
                    tabBarActiveBackgroundColor: themeMode === 1 && 'white' || themeMode === 2 && '#D3D3D3' || themeMode === 3 && '',
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
                    tabBarInactiveBackgroundColor: themeMode === 1 && 'white' || themeMode === 2 && '#696969' || themeMode === 3 && '',
                    tabBarActiveBackgroundColor: themeMode === 1 && 'white' || themeMode === 2 && '#D3D3D3' || themeMode === 3 && '',
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
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: 'center'
  },
  containerColourful: {
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
    shadowColor: '',
    borderRadius: 6,
    marginTop: 40
  },
  wrapperAppColourful: {
    backgroundColor: 'white',
    maxHeight: '70%',
    overflow: 'scroll',
    elevation: 5,
    shadowColor: 'rgb(232, 217, 216)',
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