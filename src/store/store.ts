import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux'
import { AuthActionType, authReducer } from './authReducer'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { UserActionType, userReducer } from './userReducer'
import { AppActionType, appReducer } from './appReducer'
import { PacksActionType, packsReducer } from './packsReducer'
import { CardsActionType, cardsReducer } from 'store/cardsReducer'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  user: userReducer,
  packs: packsReducer,
  cards: cardsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

//@ts-ignore
window.store = store

//TYPES
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppRootActionsType =
  | CardsActionType
  | PacksActionType
  | AuthActionType
  | UserActionType
  | AppActionType

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppRootActionsType
>
