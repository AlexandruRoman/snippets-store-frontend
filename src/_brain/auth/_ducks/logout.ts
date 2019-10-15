import { action } from 'typesafe-actions'
import { takeLatest, put, call } from 'redux-saga/effects'
import { AUTH_PRIVATE_ACTION_TYPES, authSetUserNameAction, authSetRoleAction, authSetPermissionsAction } from '../auth'
import { clearObject } from '../../_helpers/storage'
import { gotoHomeAction } from '../../router'
import { authGuestStartAction } from './guest'

/*
 *         ___       ______ .___________. __    ______   .__   __.      _______.
 *        /   \     /      ||           ||  |  /  __  \  |  \ |  |     /       |
 *       /  ^  \   |  ,----'`---|  |----`|  | |  |  |  | |   \|  |    |   (----`
 *      /  /_\  \  |  |         |  |     |  | |  |  |  | |  . `  |     \   \
 *     /  _____  \ |  `----.    |  |     |  | |  `--'  | |  |\   | .----)   |
 *    /__/     \__\ \______|    |__|     |__|  \______/  |__| \__| |_______/
 */

export interface IAuthLogoutStartAction {
    type: string
    payload: IAuthLogoutStartActionPayload
}
interface IAuthLogoutStartActionPayload {}
export type IAuthLogoutStartActionData = IAuthLogoutStartActionPayload
export const authLogoutStartAction = (data: IAuthLogoutStartActionData) =>
    action<string, IAuthLogoutStartActionPayload>(AUTH_LOGOUT_ACTION_TYPES.START, data)

export interface IAuthLogoutSuccessAction {
    type: string
    payload: IAuthLogoutSuccessActionPayload
}
interface IAuthLogoutSuccessActionPayload {}
export type IAuthLogoutSuccessActionData = IAuthLogoutSuccessActionPayload
export const authLogoutSuccessAction = (data: IAuthLogoutSuccessActionData) =>
    action<string, IAuthLogoutSuccessActionPayload>(AUTH_LOGOUT_ACTION_TYPES.SUCCESS, data)

/*
 *         _______.     ___       _______      ___           _______.
 *        /       |    /   \     /  _____|    /   \         /       |
 *       |   (----`   /  ^  \   |  |  __     /  ^  \       |   (----`
 *        \   \      /  /_\  \  |  | |_ |   /  /_\  \       \   \
 *    .----)   |    /  _____  \ |  |__| |  /  _____  \  .----)   |
 *    |_______/    /__/     \__\ \______| /__/     \__\ |_______/
 */

export function* authLogoutFlow() {
    try {
        yield takeLatest(AUTH_LOGOUT_ACTION_TYPES.START, authLogoutSaga)
    } catch (error) {
        console.log(error)
    }
}

function* authLogoutSaga(action: IAuthLogoutStartAction) {
    try {
        yield call(clearObject, 'token')
        yield put(authSetUserNameAction({ userName: '' }))
        yield put(authSetRoleAction({ role: '' }))
        yield put(authSetPermissionsAction({ permissions: [] }))
        yield put(gotoHomeAction())
        yield put(authGuestStartAction({}))
        yield put(authLogoutSuccessAction({}))
    } catch (error) {
        console.log(error)
        yield put({ type: AUTH_LOGOUT_ACTION_TYPES.ERROR, payload: error })
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

export const AUTH_LOGOUT_ACTION_TYPES = {
    START: 'LOGOUT.START',
    SUCCESS: 'LOGOUT.SUCCESS',
    ERROR: 'LOGOUT.ERROR'
}
