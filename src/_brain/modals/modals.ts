import { combineReducers, Reducer } from 'redux'
import { action } from 'typesafe-actions'
import { ApplicationState } from '../redux'

/*
 *         ___       ______ .___________. __    ______   .__   __.      _______.
 *        /   \     /      ||           ||  |  /  __  \  |  \ |  |     /       |
 *       /  ^  \   |  ,----'`---|  |----`|  | |  |  |  | |   \|  |    |   (----`
 *      /  /_\  \  |  |         |  |     |  | |  |  |  | |  . `  |     \   \
 *     /  _____  \ |  `----.    |  |     |  | |  `--'  | |  |\   | .----)   |
 *    /__/     \__\ \______|    |__|     |__|  \______/  |__| \__| |_______/
 */

export interface IModalsSetAction {
    type: string
    payload: IModalsSetActionPayload
}
interface IModalsSetActionPayload {
    id: string
}
export type IModalsSetActionData = IModalsSetActionPayload
export const modalsSetAction = (data: IModalsSetActionData) =>
    action<string, IModalsSetActionPayload>(MODALS_PRIVATE_ACTION_TYPES.SET, data)

export interface IModalsCloseAction {
    type: string
    payload: IModalsCloseActionPayload
}
interface IModalsCloseActionPayload {
    id: string
}
export const modalsCloseAction = () =>
    action<string, IModalsCloseActionPayload>(MODALS_PRIVATE_ACTION_TYPES.SET, { id: '' })

/*
 *    .___________.____    ____ .______    _______     _______.
 *    |           |\   \  /   / |   _  \  |   ____|   /       |
 *    `---|  |----` \   \/   /  |  |_)  | |  |__     |   (----`
 *        |  |       \_    _/   |   ___/  |   __|     \   \
 *        |  |         |  |     |  |      |  |____.----)   |
 *        |__|         |__|     | _|      |_______|_______/
 */

export const MODALS_PRIVATE_ACTION_TYPES = {
    SET: 'SET'
}
export const MODALS_IDS = {
    ADD_SNIPPET: 'ADD_SNIPPET',
    ADD_TEMPLATE: 'ADD_TEMPLATE'
}
interface IModalsPublicState {}
interface IModalsPrivateState {
    readonly id: string
}
export interface IModalsState {
    // readonly public: IModalsPublicState
    readonly private: IModalsPrivateState
}

/*
 *    .______    _______  _______   __    __    ______  _______ .______
 *    |   _  \  |   ____||       \ |  |  |  |  /      ||   ____||   _  \
 *    |  |_)  | |  |__   |  .--.  ||  |  |  | |  ,----'|  |__   |  |_)  |
 *    |      /  |   __|  |  |  |  ||  |  |  | |  |     |   __|  |      /
 *    |  |\  \-.|  |____ |  '--'  ||  `--'  | |  `----.|  |____ |  |\  \-.
 *    | _| `.__||_______||_______/  \______/   \______||_______|| _| `.__|
 */

const initialState: IModalsPrivateState = {
    id: ''
}

const privateReducer: Reducer<IModalsPrivateState> = (state = initialState, action) => {
    switch (action.type) {
        case MODALS_PRIVATE_ACTION_TYPES.SET: {
            return { ...state, id: (action.payload as IModalsSetActionPayload).id }
        }
        default: {
            return state
        }
    }
}
// const publicReducer: Reducer<IModalsPublicState> = combineReducers<IModalsPublicState>({})

export const modalsReducer = combineReducers<IModalsState>({ private: privateReducer })

/*
 *        ______. _______  __       _______   ______ .___________.  ______   .______      ______.
 *       /      ||   ____||  |     |   ____| /      ||           | /  __  \  |   _  \    /      |
 *      |   (---`|  |__   |  |     |  |__   |  ,----'`---|  |----`|  |  |  | |  |_)  |  |   (---`
 *       \   \   |   __|  |  |     |   __|  |  |         |  |     |  |  |  | |      /    \   \
 *    .---)   |  |  |____ |  `----.|  |____ |  `----.    |  |     |  `--'  | |  |\  \-.---)   |
 *    |______/   |_______||_______||_______| \______|    |__|      \______/  | _| `.__|______/
 */

export const modalsIdSelector = (state: ApplicationState) => state.modals.private.id
