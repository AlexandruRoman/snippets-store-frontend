import { action } from 'typesafe-actions'
import { api } from '../../_helpers/api'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { Reducer } from 'redux'
import { authRoleSelector } from '../auth'
import {
    gotoBrowseTemplatesAction,
    gotoStaffManageIncomingSnippetsAction,
    gotoAdminCreateStaffAccountAction,
    gotoSellerTemplatesAction
} from '../../router'

/*
 *         ___       ______ .___________. __    ______   .__   __.      _______.
 *        /   \     /      ||           ||  |  /  __  \  |  \ |  |     /       |
 *       /  ^  \   |  ,----'`---|  |----`|  | |  |  |  | |   \|  |    |   (----`
 *      /  /_\  \  |  |         |  |     |  | |  |  |  | |  . `  |     \   \
 *     /  _____  \ |  `----.    |  |     |  | |  `--'  | |  |\   | .----)   |
 *    /__/     \__\ \______|    |__|     |__|  \______/  |__| \__| |_______/
 */

export interface IAuthRedirectStartAction {
    type: string
    payload: IAuthRedirectStartActionPayload
}
interface IAuthRedirectStartActionPayload {}
export type IAuthRedirectStartActionData = IAuthRedirectStartActionPayload
export const authRedirectStartAction = (data: IAuthRedirectStartActionData) =>
    action<string, IAuthRedirectStartActionPayload>(AUTH_REDIRECT_ACTION_TYPES.START, data)

export interface IAuthRedirectSuccessAction {
    type: string
    payload: IAuthRedirectSuccessActionPayload
}
interface IAuthRedirectSuccessActionPayload {}
export type IAuthRedirectSuccessActionData = IAuthRedirectSuccessActionPayload
export const authRedirectSuccessAction = (data: IAuthRedirectSuccessActionData) =>
    action<string, IAuthRedirectSuccessActionPayload>(AUTH_REDIRECT_ACTION_TYPES.SUCCESS, data)

/*
 *         _______.     ___       _______      ___           _______.
 *        /       |    /   \     /  _____|    /   \         /       |
 *       |   (----`   /  ^  \   |  |  __     /  ^  \       |   (----`
 *        \   \      /  /_\  \  |  | |_ |   /  /_\  \       \   \
 *    .----)   |    /  _____  \ |  |__| |  /  _____  \  .----)   |
 *    |_______/    /__/     \__\ \______| /__/     \__\ |_______/
 */

export function* authRedirectFlow() {
    try {
        yield takeLatest(AUTH_REDIRECT_ACTION_TYPES.START, authRedirectSaga)
    } catch (error) {
        console.log(error)
    }
}

function* authRedirectSaga(action: IAuthRedirectStartAction) {
    try {
        const role = yield select(authRoleSelector)
        if (!role) return
        switch (role) {
            case 'CLIENT':
                yield put(gotoBrowseTemplatesAction())
                break
            case 'STAFF':
                yield put(gotoStaffManageIncomingSnippetsAction())
                break
            case 'ADMIN':
                yield put(gotoAdminCreateStaffAccountAction())
                break
            case 'SELLER':
                yield put(gotoSellerTemplatesAction())
                break

            default:
                break
        }
        yield put(authRedirectSuccessAction({}))
    } catch (error) {
        console.log(error)
        yield put({ type: AUTH_REDIRECT_ACTION_TYPES.ERROR, payload: error })
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

export const AUTH_REDIRECT_ACTION_TYPES = {
    START: 'REDIRECT.START',
    SUCCESS: 'REDIRECT.SUCCESS',
    ERROR: 'REDIRECT.ERROR'
}
