import { action } from "typesafe-actions"
import { api } from "../../_helpers/api"
import { takeLatest, call, put, take } from "redux-saga/effects"
import { setObject } from "../../_helpers/storage"
import { AUTH_POPULATESTATE_ACTION_TYPES, authPopulateStateStartAction } from "../auth"

/*
 *         ___       ______ .___________. __    ______   .__   __.      _______.
 *        /   \     /      ||           ||  |  /  __  \  |  \ |  |     /       |
 *       /  ^  \   |  ,----'`---|  |----`|  | |  |  |  | |   \|  |    |   (----`
 *      /  /_\  \  |  |         |  |     |  | |  |  |  | |  . `  |     \   \
 *     /  _____  \ |  `----.    |  |     |  | |  `--'  | |  |\   | .----)   |
 *    /__/     \__\ \______|    |__|     |__|  \______/  |__| \__| |_______/
 */

export interface IAuthGuestStartAction {
    type: string
    payload: IAuthGuestStartActionPayload
}
interface IAuthGuestStartActionPayload {}
export type IAuthGuestStartActionData = IAuthGuestStartActionPayload
export const authGuestStartAction = (data: IAuthGuestStartActionData) =>
    action<string, IAuthGuestStartActionPayload>(AUTH_GUEST_ACTION_TYPES.START, data)

export interface IAuthGuestSuccessAction {
    type: string
    payload: IAuthGuestSuccessActionPayload
}
interface IAuthGuestSuccessActionPayload {}
export type IAuthGuestSuccessActionData = IAuthGuestSuccessActionPayload
export const authGuestSuccessAction = (data: IAuthGuestSuccessActionData) =>
    action<string, IAuthGuestSuccessActionPayload>(AUTH_GUEST_ACTION_TYPES.SUCCESS, data)

/*
 *         _______.     ___       _______      ___           _______.
 *        /       |    /   \     /  _____|    /   \         /       |
 *       |   (----`   /  ^  \   |  |  __     /  ^  \       |   (----`
 *        \   \      /  /_\  \  |  | |_ |   /  /_\  \       \   \
 *    .----)   |    /  _____  \ |  |__| |  /  _____  \  .----)   |
 *    |_______/    /__/     \__\ \______| /__/     \__\ |_______/
 */

export function* authGuestFlow() {
    try {
        yield takeLatest(AUTH_GUEST_ACTION_TYPES.START, authGuestSaga)
    } catch (error) {
        console.log(error)
    }
}

function* authGuestSaga(action: IAuthGuestStartAction) {
    try {
        const tokenResponse = yield call(authGuestApi)
        yield call(setObject, "token", tokenResponse.data)
        yield put(authPopulateStateStartAction({}))
        yield take(AUTH_POPULATESTATE_ACTION_TYPES.SUCCESS)
        yield put(authGuestSuccessAction({}))
    } catch (error) {
        console.log(error)
        yield put({ type: AUTH_GUEST_ACTION_TYPES.ERROR, payload: error })
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

function authGuestApi() {
    return api.get("auth/guest")
}

/*
 *    .___________.____    ____ .______    _______     _______.
 *    |           |\   \  /   / |   _  \  |   ____|   /       |
 *    `---|  |----` \   \/   /  |  |_)  | |  |__     |   (----`
 *        |  |       \_    _/   |   ___/  |   __|     \   \
 *        |  |         |  |     |  |      |  |____.----)   |
 *        |__|         |__|     | _|      |_______|_______/
 */

const AUTH_GUEST_ACTION_TYPES = {
    START: "GUEST.START",
    SUCCESS: "GUEST.SUCCESS",
    ERROR: "GUEST.ERROR"
}
