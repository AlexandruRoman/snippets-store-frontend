import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { combineReducers } from 'redux'
import { reducer as locationReducer, middleware as routesMiddleware, enhancer as routesEnhancer } from './router'
import { fork, all } from 'redux-saga/effects'
import { LocationState } from 'redux-first-router'
import authFlow, { IAuthState, authReducer } from './auth/auth'
import { modalsReducer, IModalsState } from './modals/modals'

/*
 *    .______    _______  _______   __    __    ______  _______ .______
 *    |   _  \  |   ____||       \ |  |  |  |  /      ||   ____||   _  \
 *    |  |_)  | |  |__   |  .--.  ||  |  |  | |  ,----'|  |__   |  |_)  |
 *    |      /  |   __|  |  |  |  ||  |  |  | |  |     |   __|  |      /
 *    |  |\  \-.|  |____ |  '--'  ||  `--'  | |  `----.|  |____ |  |\  \-.
 *    | _| `.__||_______||_______/  \______/   \______||_______|| _| `.__|
 */

const rootReducer = combineReducers<ApplicationState>({
    location: locationReducer,
    modals: modalsReducer,
    auth: authReducer
})

/*
 *    .___________.____    ____ .______    _______     _______.
 *    |           |\   \  /   / |   _  \  |   ____|   /       |
 *    `---|  |----` \   \/   /  |  |_)  | |  |__     |   (----`
 *        |  |       \_    _/   |   ___/  |   __|     \   \
 *        |  |         |  |     |  |      |  |____.----)   |
 *        |__|         |__|     | _|      |_______|_______/
 */

export interface ApplicationState {
    readonly location: LocationState<string, any>
    readonly modals: IModalsState
    readonly auth: IAuthState
}

/*
 *         _______.     ___       _______      ___           _______.
 *        /       |    /   \     /  _____|    /   \         /       |
 *       |   (----`   /  ^  \   |  |  __     /  ^  \       |   (----`
 *        \   \      /  /_\  \  |  | |_ |   /  /_\  \       \   \
 *    .----)   |    /  _____  \ |  |__| |  /  _____  \  .----)   |
 *    |_______/    /__/     \__\ \______| /__/     \__\ |_______/
 */

export function* sagas(): any {
    yield all([fork(authFlow)])
}

/*
 *    .______     ______     ______   .___________. __    __  .______
 *    |   _  \   /  __  \   /  __  \  |           ||  |  |  | |   _  \
 *    |  |_)  | |  |  |  | |  |  |  | `---|  |----`|  |  |  | |  |_)  |
 *    |   _  <  |  |  |  | |  |  |  |     |  |     |  |  |  | |   ___/
 *    |  |_)  | |  `--'  | |  `--'  |     |  |     |  `--'  | |  |
 *    |______/   \______/   \______/      |__|      \______/  | _|
 */

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware()
    const composeMiddlewares = applyMiddleware(routesMiddleware, sagaMiddleware)
    const store = createStore(
        rootReducer,
        {},
        compose(
            routesEnhancer,
            composeMiddlewares
        )
    )
    sagaMiddleware.run(sagas)
    return store
}

export { configureStore }
