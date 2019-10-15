import { action } from 'typesafe-actions'
import { api } from '../../_helpers/api'
import { takeLatest, call, put } from 'redux-saga/effects'
import { Reducer } from 'redux'
import { authLoginStartAction } from './login'

/*
 *         ___       ______ .___________. __    ______   .__   __.      _______.
 *        /   \     /      ||           ||  |  /  __  \  |  \ |  |     /       |
 *       /  ^  \   |  ,----'`---|  |----`|  | |  |  |  | |   \|  |    |   (----`
 *      /  /_\  \  |  |         |  |     |  | |  |  |  | |  . `  |     \   \
 *     /  _____  \ |  `----.    |  |     |  | |  `--'  | |  |\   | .----)   |
 *    /__/     \__\ \______|    |__|     |__|  \______/  |__| \__| |_______/
 */

export interface IAuthBecomeSellerStartAction {
    type: string
    payload: IAuthBecomeSellerStartActionPayload
}
interface IAuthBecomeSellerStartActionPayload {
    name: string
    email: string
    password: string
}
export type IAuthBecomeSellerStartActionData = IAuthBecomeSellerStartActionPayload
export const authBecomeSellerStartAction = (data: IAuthBecomeSellerStartActionData) =>
    action<string, IAuthBecomeSellerStartActionPayload>(AUTH_BECOMESELLER_ACTION_TYPES.START, data)

export interface IAuthBecomeSellerSuccessAction {
    type: string
    payload: IAuthBecomeSellerSuccessActionPayload
}
interface IAuthBecomeSellerSuccessActionPayload {
    name: string
    email: string
    password: string
}
export type IAuthBecomeSellerSuccessActionData = IAuthBecomeSellerSuccessActionPayload
export const authBecomeSellerSuccessAction = (data: IAuthBecomeSellerSuccessActionData) =>
    action<string, IAuthBecomeSellerSuccessActionPayload>(AUTH_BECOMESELLER_ACTION_TYPES.SUCCESS, data)

/*
 *         _______.     ___       _______      ___           _______.
 *        /       |    /   \     /  _____|    /   \         /       |
 *       |   (----`   /  ^  \   |  |  __     /  ^  \       |   (----`
 *        \   \      /  /_\  \  |  | |_ |   /  /_\  \       \   \
 *    .----)   |    /  _____  \ |  |__| |  /  _____  \  .----)   |
 *    |_______/    /__/     \__\ \______| /__/     \__\ |_______/
 */

export function* authBecomeSellerFlow() {
    try {
        yield takeLatest(AUTH_BECOMESELLER_ACTION_TYPES.START, authBecomeSellerSaga)
    } catch (error) {
        console.log(error)
    }
}

function* authBecomeSellerSaga(action: IAuthBecomeSellerStartAction) {
    try {
        const response = yield call(authBecomeSellerApi, action.payload)
        yield put(authLoginStartAction({ email: action.payload.email, password: action.payload.password }))
        yield put(authBecomeSellerSuccessAction(action.payload))
    } catch (error) {
        console.log(error)
        yield put({ type: AUTH_BECOMESELLER_ACTION_TYPES.ERROR, payload: error })
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

interface IAuthBecomeSellerApiData {
    name: string
    email: string
    password: string
}
function authBecomeSellerApi(data: IAuthBecomeSellerApiData) {
    return api.post('auth/become-seller', data)
}

/*
 *    .___________.____    ____ .______    _______     _______.
 *    |           |\   \  /   / |   _  \  |   ____|   /       |
 *    `---|  |----` \   \/   /  |  |_)  | |  |__     |   (----`
 *        |  |       \_    _/   |   ___/  |   __|     \   \
 *        |  |         |  |     |  |      |  |____.----)   |
 *        |__|         |__|     | _|      |_______|_______/
 */

export const AUTH_BECOMESELLER_ACTION_TYPES = {
    START: 'BECOMESELLER.START',
    SUCCESS: 'BECOMESELLER.SUCCESS',
    ERROR: 'BECOMESELLER.ERROR'
}
