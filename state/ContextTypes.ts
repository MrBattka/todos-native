import { Dispatch } from "react";

export type Task = {
    taskText: string
    isDone: boolean
}

export type Tasks = Task[];

export type State = {
    newTask: string
    tasks: Tasks
    selectedTheme: number
}

export const defaultState: State = {
    newTask: '',
    tasks: [],
    selectedTheme: 1
}

export enum ActionType {
    ADD = 'ADD',
    REMOVE = 'REMOVE',
    TOGGLE = 'TOGGLE',
    SAVE = 'SAVE',
    SELECTED_THEME = 'SELECTED_THEME'
}

export type ActionStringPayload = {
    type: ActionType.ADD
    payload: string 
}

export type ActionSavePayload = {
    type: ActionType.SAVE
    payload: any
}

export type ActionSelectedThemePayload = {
    type: ActionType.SELECTED_THEME
    payload: any
}

export type ActionObjectPayload = {
    type: ActionType.TOGGLE | ActionType.REMOVE
    payload: Task | string | boolean
}
export type Action = ActionStringPayload | ActionObjectPayload | ActionSavePayload | ActionSelectedThemePayload;

export type ContextState = {
    state: State;
    changeState: Dispatch<Action>
}