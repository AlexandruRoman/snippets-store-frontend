import { action } from 'typesafe-actions'
import { api } from '../../_helpers/api'
import { takeLatest, call, put, take } from 'redux-saga/effects'
import { setString } from '../../_helpers/storage'
import { authPopulateStateStartAction, AUTH_POPULATESTATE_ACTION_TYPES } from '../auth'
import { authRedirectStartAction } from './redirect'

/*
 *         ___       ______ .___________. __    ______   .__   __.      _______.
 *        /   \     /      ||           ||  |  /  __  \  |  \ |  |     /       |
 *       /  ^  \   |  ,----'`---|  |----`|  | |  |  |  | |   \|  |    |   (----`
 *      /  /_\  \  |  |         |  |     |  | |  |  |  | |  . `  |     \   \
 *     /  _____  \ |  `----.    |  |     |  | |  `--'  | |  |\   | .----)   |
 *    /__/     \__\ \______|    |__|     |__|  \______/  |__| \__| |_______/
 */

export interface IAuthLoginStartAction {
    type: string
    payload: IAuthLoginStartActionPayload
}
interface IAuthLoginStartActionPayload {
    email: string
    password: string
}
export type IAuthLoginStartActionData = IAuthLoginStartActionPayload
export const authLoginStartAction = (data: IAuthLoginStartActionData) =>
    action<string, IAuthLoginStartActionPayload>(AUTH_LOGIN_ACTION_TYPES.START, data)

export interface IAuthLoginSuccessAction {
    type: string
    payload: IAuthLoginSuccessActionPayload
}
interface IAuthLoginSuccessActionPayload {}
export type IAuthLoginSuccessActionData = IAuthLoginSuccessActionPayload
export const authLoginSuccessAction = (data: IAuthLoginSuccessActionData) =>
    action<string, IAuthLoginSuccessActionPayload>(AUTH_LOGIN_ACTION_TYPES.SUCCESS, data)
/*
 *         _______.     ___       _______      ___           _______.
 *        /       |    /   \     /  _____|    /   \         /       |
 *       |   (----`   /  ^  \   |  |  __     /  ^  \       |   (----`
 *        \   \      /  /_\  \  |  | |_ |   /  /_\  \       \   \
 *    .----)   |    /  _____  \ |  |__| |  /  _____  \  .----)   |
 *    |_______/    /__/     \__\ \______| /__/     \__\ |_______/
 */

export function* authLoginFlow() {
    try {
        yield takeLatest(AUTH_LOGIN_ACTION_TYPES.START, authLoginSaga)
    } catch (error) {
        console.log(error)
    }
}

function* authLoginSaga(action: IAuthLoginStartAction) {
    try {
        const response = yield call(authLoginApi, {
            email: action.payload.email,
            password: action.payload.password
        })
        yield call(setString, 'token', response.data)
        yield put(authPopulateStateStartAction({}))
        yield take(AUTH_POPULATESTATE_ACTION_TYPES.SUCCESS)
        yield put(authRedirectStartAction({}))
        yield put(authLoginSuccessAction({}))
    } catch (error) {
        console.log(error)
        yield put({ type: AUTH_LOGIN_ACTION_TYPES.ERROR, payload: error })
    }
}

/*
 *         ___      .______    __
 *        /   \     |   _  \  |  |
 *       /  ^  \    |  |_)  | |  |
 *      /  /_\  \   |   ___/  |  |
 *     /  _____  \  |  |      |  |
 *    /__/     \__\ | _|      |__|
 */

interface IAuthLoginApi {
    email: string
    password: string
}
function authLoginApi(data: IAuthLoginApi) {
    return api.post('auth/login', data)
}

/*
 *    .___________.____    ____ .______    _______     _______.
 *    |           |\   \  /   / |   _  \  |   ____|   /       |
 *    `---|  |----` \   \/   /  |  |_)  | |  |__     |   (----`
 *        |  |       \_    _/   |   ___/  |   __|     \   \
 *        |  |         |  |     |  |      |  |____.----)   |
 *        |__|         |__|     | _|      |_______|_______/
 */

export const AUTH_LOGIN_ACTION_TYPES = {
    START: 'LOGIN.START',
    SUCCESS: 'LOGIN.SUCCESS',
    ERROR: 'LOGIN.ERROR'
}
