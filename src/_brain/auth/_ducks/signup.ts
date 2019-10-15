import { action } from 'typesafe-actions'
import { api } from '../../_helpers/api'
import { takeLatest, call, put } from 'redux-saga/effects'
import { authLoginStartAction } from './login'

/*
 *         ___       ______ .___________. __    ______   .__   __.      _______.
 *        /   \     /      ||           ||  |  /  __  \  |  \ |  |     /       |
 *       /  ^  \   |  ,----'`---|  |----`|  | |  |  |  | |   \|  |    |   (----`
 *      /  /_\  \  |  |         |  |     |  | |  |  |  | |  . `  |     \   \
 *     /  _____  \ |  `----.    |  |     |  | |  `--'  | |  |\   | .----)   |
 *    /__/     \__\ \______|    |__|     |__|  \______/  |__| \__| |_______/
 */

export interface IAuthSignupStartAction {
    type: string
    payload: IAuthSignupStartActionPayload
}
interface IAuthSignupStartActionPayload {
    name: string
    email: string
    password: string
}
export type IAuthSignupStartActionData = IAuthSignupStartActionPayload
export const authSignupStartAction = (data: IAuthSignupStartActionData) =>
    action<string, IAuthSignupStartActionPayload>(AUTH_SIGNUP_ACTION_TYPES.START, data)

export interface IAuthSignupSuccessAction {
    type: string
    payload: IAuthSignupSuccessActionPayload
}
interface IAuthSignupSuccessActionPayload {
    name: string
    email: string
    password: string
}
export type IAuthSignupSuccessActionData = IAuthSignupSuccessActionPayload
export const authSignupSuccessAction = (data: IAuthSignupSuccessActionData) =>
    action<string, IAuthSignupSuccessActionPayload>(AUTH_SIGNUP_ACTION_TYPES.SUCCESS, data)

/*
 *         _______.     ___       _______      ___           _______.
 *        /       |    /   \     /  _____|    /   \         /       |
 *       |   (----`   /  ^  \   |  |  __     /  ^  \       |   (----`
 *        \   \      /  /_\  \  |  | |_ |   /  /_\  \       \   \
 *    .----)   |    /  _____  \ |  |__| |  /  _____  \  .----)   |
 *    |_______/    /__/     \__\ \______| /__/     \__\ |_______/
 */

export function* authSignupFlow() {
    try {
        yield takeLatest(AUTH_SIGNUP_ACTION_TYPES.START, authSignupSaga)
    } catch (error) {
        console.log(error)
    }
}

function* authSignupSaga(action: IAuthSignupStartAction) {
    try {
        const response = yield call(authSignupApi, action.payload)
        yield put(authLoginStartAction({ email: action.payload.email, password: action.payload.password }))
        yield put(authSignupSuccessAction(action.payload))
    } catch (error) {
        console.log(error)
        yield put({ type: AUTH_SIGNUP_ACTION_TYPES.ERROR, payload: error })
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

interface IAuthSignupApiData {
    name: string
    email: string
    password: string
}
function authSignupApi(data: IAuthSignupApiData) {
    return api.post('auth/signup', data)
}

/*
 *    .___________.____    ____ .______    _______     _______.
 *    |           |\   \  /   / |   _  \  |   ____|   /       |
 *    `---|  |----` \   \/   /  |  |_)  | |  |__     |   (----`
 *        |  |       \_    _/   |   ___/  |   __|     \   \
 *        |  |         |  |     |  |      |  |____.----)   |
 *        |__|         |__|     | _|      |_______|_______/
 */

const AUTH_SIGNUP_ACTION_TYPES = {
    START: 'SIGNUP.START',
    SUCCESS: 'SIGNUP.SUCCESS',
    ERROR: 'SIGNUP.ERROR'
}
