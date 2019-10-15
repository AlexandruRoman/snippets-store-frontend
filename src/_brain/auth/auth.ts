import { combineReducers, Reducer } from 'redux'
import { fork, takeLatest, call, put } from 'redux-saga/effects'
import { authLoginFlow } from './_ducks/login'
import { getString } from '../_helpers/storage'
import { IJwt } from '../jwt/types'
import jwtDecode from 'jwt-decode'
import { authInitFlow } from './_ducks/init'
import { authGuestFlow } from './_ducks/guest'
import { authSignupFlow } from './_ducks/signup'
import { authLogoutFlow } from './_ducks/logout'
import { action } from 'typesafe-actions'
import { ApplicationState } from '../redux'
import { authRedirectFlow, authRedirectStartAction } from './_ducks/redirect'
import { authBecomeSellerFlow } from './_ducks/become-seller'

/*
 *         ___       ______ .___________. __    ______   .__   __.      _______.
 *        /   \     /      ||           ||  |  /  __  \  |  \ |  |     /       |
 *       /  ^  \   |  ,----'`---|  |----`|  | |  |  |  | |   \|  |    |   (----`
 *      /  /_\  \  |  |         |  |     |  | |  |  |  | |  . `  |     \   \
 *     /  _____  \ |  `----.    |  |     |  | |  `--'  | |  |\   | .----)   |
 *    /__/     \__\ \______|    |__|     |__|  \______/  |__| \__| |_______/
 */
export interface IAuthPopulateStateStartAction {
    type: string
    payload: IAuthPopulateStateStartActionPayload
}
interface IAuthPopulateStateStartActionPayload {}
export type IAuthPopulateStateStartActionData = IAuthPopulateStateStartActionPayload
export const authPopulateStateStartAction = (data: IAuthPopulateStateStartActionData) =>
    action<string, IAuthPopulateStateStartActionPayload>(AUTH_POPULATESTATE_ACTION_TYPES.START, data)

export interface IAuthPopulateStateSuccessAction {
    type: string
    payload: IAuthPopulateStateSuccessActionPayload
}
type IAuthPopulateStateSuccessActionPayload = IJwt
export type IAuthPopulateStateSuccessActionData = IAuthPopulateStateSuccessActionPayload
export const authPopulateStateSuccessAction = (data: IAuthPopulateStateSuccessActionData) =>
    action<string, IAuthPopulateStateSuccessActionPayload>(AUTH_POPULATESTATE_ACTION_TYPES.SUCCESS, data)

export interface IAuthSetUserNameAction {
    type: string
    payload: IAuthSetUserNameActionPayload
}
interface IAuthSetUserNameActionPayload {
    userName: string
}
export type IAuthSetUserNameActionData = IAuthSetUserNameActionPayload
export const authSetUserNameAction = (data: IAuthSetUserNameActionData) =>
    action<string, IAuthSetUserNameActionPayload>(AUTH_PRIVATE_ACTION_TYPES.SET_USER_NAME, data)

export interface IAuthSetPermissionsAction {
    type: string
    payload: IAuthSetPermissionsActionPayload
}
interface IAuthSetPermissionsActionPayload {
    permissions: string[]
}
export type IAuthSetPermissionsActionData = IAuthSetPermissionsActionPayload
export const authSetPermissionsAction = (data: IAuthSetPermissionsActionData) =>
    action<string, IAuthSetPermissionsActionPayload>(AUTH_PRIVATE_ACTION_TYPES.SET_PERMISSIONS, data)

export interface IAuthSetRoleAction {
    type: string
    payload: IAuthSetRoleActionPayload
}
interface IAuthSetRoleActionPayload {
    role: string
}
export type IAuthSetRoleActionData = IAuthSetRoleActionPayload
export const authSetRoleAction = (data: IAuthSetRoleActionData) =>
    action<string, IAuthSetRoleActionPayload>(AUTH_PRIVATE_ACTION_TYPES.SET_ROLE, data)

/*
 *         _______.     ___       _______      ___           _______.
 *        /       |    /   \     /  _____|    /   \         /       |
 *       |   (----`   /  ^  \   |  |  __     /  ^  \       |   (----`
 *        \   \      /  /_\  \  |  | |_ |   /  /_\  \       \   \
 *    .----)   |    /  _____  \ |  |__| |  /  _____  \  .----)   |
 *    |_______/    /__/     \__\ \______| /__/     \__\ |_______/
 */

export default function* authFlow() {
    yield fork(authInitFlow)
    yield fork(authLoginFlow)
    yield fork(authGuestFlow)
    yield fork(authSignupFlow)
    yield fork(authLogoutFlow)
    yield fork(authBecomeSellerFlow)
    yield fork(authRedirectFlow)
    yield fork(authPopulateStateFlow)
}

export function* authPopulateStateFlow() {
    try {
        yield takeLatest(AUTH_POPULATESTATE_ACTION_TYPES.START, authPopulateStateSaga)
    } catch (error) {
        console.log(error)
    }
}

function* authPopulateStateSaga(action: IAuthPopulateStateStartAction) {
    try {
        const tokenData: IJwt = yield call(getTokenData)
        if (!tokenData) throw new Error('No token in local storage!')
        yield put(authSetUserNameAction({ userName: tokenData.user.name }))
        yield put(authSetRoleAction({ role: tokenData.user.role.name }))
        yield put(authSetPermissionsAction({ permissions: tokenData.user.role.permissions.map(x => x.name) }))
        yield put(authPopulateStateSuccessAction(tokenData as IJwt))
    } catch (error) {
        console.log(error)
        yield put({ type: AUTH_POPULATESTATE_ACTION_TYPES.ERROR, payload: error })
    }
}

/*
 *    .___________.____    ____ .______    _______     _______.
 *    |           |\   \  /   / |   _  \  |   ____|   /       |
 *    `---|  |----` \   \/   /  |  |_)  | |  |__     |   (----`
 *        |  |       \_    _/   |   ___/  |   __|     \   \
 *        |  |         |  |     |  |      |  |____.----)   |
 *        |__|         |__|     | _|      |_______|_______/
 */

export const AUTH_PRIVATE_ACTION_TYPES = {
    SET_USER_NAME: 'SET_USER_NAME',
    SET_ROLE: 'SET_ROLE',
    SET_PERMISSIONS: 'SET_PERMISSIONS'
}

export const AUTH_POPULATESTATE_ACTION_TYPES = {
    START: 'POPULATESTATE.START',
    SUCCESS: 'POPULATESTATE.SUCCESS',
    ERROR: 'POPULATESTATE.ERROR'
}

interface IAuthPublicState {}
interface IAuthPrivateState {
    readonly userName: string
    readonly role: string
    readonly permissions: string[]
}
export interface IAuthState {
    // readonly public: IAuthPublicState
    readonly private: IAuthPrivateState
}

/*
 *    .______    _______  _______   __    __    ______  _______ .______
 *    |   _  \  |   ____||       \ |  |  |  |  /      ||   ____||   _  \
 *    |  |_)  | |  |__   |  .--.  ||  |  |  | |  ,----'|  |__   |  |_)  |
 *    |      /  |   __|  |  |  |  ||  |  |  | |  |     |   __|  |      /
 *    |  |\  \-.|  |____ |  '--'  ||  `--'  | |  `----.|  |____ |  |\  \-.
 *    | _| `.__||_______||_______/  \______/   \______||_______|| _| `.__|
 */

const initialState: IAuthPrivateState = {
    permissions: [],
    role: '',
    userName: ''
}

const privateReducer: Reducer<IAuthPrivateState> = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_PRIVATE_ACTION_TYPES.SET_USER_NAME: {
            return { ...state, userName: (action.payload as IAuthSetUserNameActionPayload).userName }
        }
        case AUTH_PRIVATE_ACTION_TYPES.SET_PERMISSIONS: {
            return { ...state, permissions: (action.payload as IAuthSetPermissionsActionPayload).permissions }
        }
        case AUTH_PRIVATE_ACTION_TYPES.SET_ROLE: {
            return { ...state, role: (action.payload as IAuthSetRoleActionPayload).role }
        }
        default: {
            return state
        }
    }
}
// const publicReducer: Reducer<IAuthPublicState> = combineReducers<IAuthPublicState>({})

export const authReducer = combineReducers<IAuthState>({ private: privateReducer })

/*
 *        ______. _______  __       _______   ______ .___________.  ______   .______      ______.
 *       /      ||   ____||  |     |   ____| /      ||           | /  __  \  |   _  \    /      |
 *      |   (---`|  |__   |  |     |  |__   |  ,----'`---|  |----`|  |  |  | |  |_)  |  |   (---`
 *       \   \   |   __|  |  |     |   __|  |  |         |  |     |  |  |  | |      /    \   \
 *    .---)   |  |  |____ |  `----.|  |____ |  `----.    |  |     |  `--'  | |  |\  \-.---)   |
 *    |______/   |_______||_______||_______| \______|    |__|      \______/  | _| `.__|______/
 */

export const authUserNameSelector = (state: ApplicationState) => state.auth.private.userName
export const authRoleSelector = (state: ApplicationState) => state.auth.private.role
export const authPermissionsSelector = (state: ApplicationState) => state.auth.private.permissions

/*
 *     __    __   _______  __      .______    _______ .______      ______.
 *    |  |  |  | |   ____||  |     |   _  \  |   ____||   _  \    /      |
 *    |  |__|  | |  |__   |  |     |  |_)  | |  |__   |  |_)  |  |   (---`
 *    |   __   | |   __|  |  |     |   ___/  |   __|  |      /    \   \
 *    |  |  |  | |  |____ |  `----.|  |      |  |____ |  |\  \-.---)   |
 *    |__|  |__| |_______||_______|| _|      |_______|| _| `.__|______/
 */

export function getTokenData() {
    const token = getString('token')
    if (!token) return null
    const tokenData: IJwt = jwtDecode(token)
    if (!tokenData.user) return null
    return tokenData
}
