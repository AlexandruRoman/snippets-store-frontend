import { action } from "typesafe-actions"
import { api } from "../../_helpers/api"
import { takeLatest, call, put } from "redux-saga/effects"
import { getTokenData, authPopulateStateStartAction } from "../auth"
import { authGuestStartAction } from "./guest"

/*
 *         ___       ______ .___________. __    ______   .__   __.      _______.
 *        /   \     /      ||           ||  |  /  __  \  |  \ |  |     /       |
 *       /  ^  \   |  ,----'`---|  |----`|  | |  |  |  | |   \|  |    |   (----`
 *      /  /_\  \  |  |         |  |     |  | |  |  |  | |  . `  |     \   \
 *     /  _____  \ |  `----.    |  |     |  | |  `--'  | |  |\   | .----)   |
 *    /__/     \__\ \______|    |__|     |__|  \______/  |__| \__| |_______/
 */

export interface IAuthInitStartAction {
    type: string
    payload: IAuthInitStartActionPayload
}
interface IAuthInitStartActionPayload {}
export type IAuthInitStartActionData = IAuthInitStartActionPayload
export const authInitStartAction = (data: IAuthInitStartActionData) =>
    action<string, IAuthInitStartActionPayload>(AUTH_INIT_ACTION_TYPES.START, data)

export interface IAuthInitSuccessAction {
    type: string
    payload: IAuthInitSuccessActionPayload
}
interface IAuthInitSuccessActionPayload {}
export type IAuthInitSuccessActionData = IAuthInitSuccessActionPayload
export const authInitSuccessAction = (data: IAuthInitSuccessActionData) =>
    action<string, IAuthInitSuccessActionPayload>(AUTH_INIT_ACTION_TYPES.SUCCESS, data)

/*
 *         _______.     ___       _______      ___           _______.
 *        /       |    /   \     /  _____|    /   \         /       |
 *       |   (----`   /  ^  \   |  |  __     /  ^  \       |   (----`
 *        \   \      /  /_\  \  |  | |_ |   /  /_\  \       \   \
 *    .----)   |    /  _____  \ |  |__| |  /  _____  \  .----)   |
 *    |_______/    /__/     \__\ \______| /__/     \__\ |_______/
 */

export function* authInitFlow() {
    try {
        yield put(authInitStartAction({}))
        const tokenData = getTokenData()
        if (!tokenData) yield put(authGuestStartAction({}))
        else yield put(authPopulateStateStartAction({}))
        yield put(authInitSuccessAction({}))
    } catch (error) {
        console.log(error)
        yield put({ type: AUTH_INIT_ACTION_TYPES.ERROR, payload: error })
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

export const AUTH_INIT_ACTION_TYPES = {
    START: "INIT.START",
    SUCCESS: "INIT.SUCCESS",
    ERROR: "INIT.ERROR"
}
