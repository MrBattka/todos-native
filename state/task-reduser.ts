import * as React from 'react';

import { Action, ActionType, ContextState, State } from "./ContextTypes";

export const initialState: State = {
    tasks: [],
    newTask: '',
    selectedTheme: 1
}

export const ContextApp = React.createContext<Partial<ContextState>>({});

export const todoReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.ADD: {
            return {
                ...state, tasks: [...state.tasks, {
                    taskText: action.payload,
                    isDone: false
                }]
            }
        }
        case ActionType.REMOVE: {
            return { ...state, tasks: [...state.tasks.filter(task => task.isDone === false)] }
        }
        case ActionType.SAVE: {
            return {
                ...state, tasks: action.payload
            }
        }
        case ActionType.SELECTED_THEME: {
            return {
                ...state, selectedTheme: action.payload
            }
        }
        case ActionType.TOGGLE: {
            return {
                ...state, tasks: [...state.tasks.map((task) =>
                    (task !== action.payload ? task : { ...task, isDone: !task.isDone }))]
            }
        }
        default: throw new Error('Unexpected action');
    }
}

export default todoReducer