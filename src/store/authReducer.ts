import { AppThunk } from './store'
import { authAPI } from '../api/authAPI'
import { handleError } from '../common/utils/error-utils'
import { updateUserInfoAC } from './userReducer'
import { setLoaderAC } from './appReducer'

//TYPES
type InitialStateType = typeof initialState
export type AuthActionType =
  | IsAuthACType
  | IsRegisteredACACType
  | SetErrorMessageACType
  | IsLetterWasSentACType
  | IsNewPasswordWasSetACType
type IsAuthACType = ReturnType<typeof isAuthAC>
type IsRegisteredACACType = ReturnType<typeof isRegisteredAC>
type SetErrorMessageACType = ReturnType<typeof setAuthErrorAC>
type IsLetterWasSentACType = ReturnType<typeof isLetterWasSentAC>
type IsNewPasswordWasSetACType = ReturnType<typeof isNewPasswordWasSetAC>

//INITIAL STATE
const initialState = {
  isRegistered: false,
  isAuth: false,
  authError: '',
  isLetterWasSent: false,
  isNewPasswordWasSet: false,
}

//AUTH REDUCER
export const authReducer = (
  state: InitialStateType = initialState,
  action: AuthActionType
): InitialStateType => {
  switch (action.type) {
    case 'IS_AUTH':
      return { ...state, isAuth: action.payload.isAuth }
    case 'IS_REGISTERED':
      return { ...state, isRegistered: action.payload.isRegistered }
    case 'SET_AUTH_ERROR':
      return { ...state, authError: action.payload.message }
    case 'IS_LETTER_WAS_SENT':
      return { ...state, isLetterWasSent: action.payload.isLetterWasSent }
    case 'IS_NEW_PASSWORD_WAS_SET':
      return { ...state, isNewPasswordWasSet: action.payload.isNewPasswordWasSet }
    default:
      return state
  }
}

//ACTION CREATORS
const isAuthAC = (isAuth: boolean) => {
  return {
    type: 'IS_AUTH',
    payload: { isAuth },
  } as const
}

export const isRegisteredAC = (isRegistered: boolean) => {
  return {
    type: 'IS_REGISTERED',
    payload: { isRegistered },
  } as const
}

const isLetterWasSentAC = (isLetterWasSent: boolean) => {
  return {
    type: 'IS_LETTER_WAS_SENT',
    payload: {
      isLetterWasSent,
    },
  } as const
}

const isNewPasswordWasSetAC = (isNewPasswordWasSet: boolean) => {
  return {
    type: 'IS_NEW_PASSWORD_WAS_SET',
    payload: {
      isNewPasswordWasSet,
    },
  } as const
}

export const setAuthErrorAC = (message: string) => {
  return {
    type: 'SET_AUTH_ERROR',
    payload: { message },
  } as const
}

//THUNK CREATORS
export const authMeTC = (): AppThunk => async dispatch => {
  try {
    const res = await authAPI.authMe()
    dispatch(updateUserInfoAC(res.data))
    dispatch(isAuthAC(true))
  } catch (e) {
    // handleError(e, dispatch)
  } finally {
    dispatch(setLoaderAC(false))
  }
}

export const registrationTC =
  (email: string, password: string): AppThunk =>
  async dispatch => {
    try {
      const res = await authAPI.registration(email, password)
      dispatch(isRegisteredAC(true))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

export const loginTC =
  (email: string, password: string, rememberMe: boolean): AppThunk =>
  async dispatch => {
    try {
      const res = await authAPI.login(email, password, rememberMe)
      dispatch(isAuthAC(true))
      dispatch(updateUserInfoAC(res.data))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

export const logoutTC = (): AppThunk => async dispatch => {
  try {
    const res = await authAPI.logout()
    dispatch(isAuthAC(false))
  } catch (e) {
    handleError(e, dispatch)
  }
}

export const forgotTC =
  (email: string): AppThunk =>
  async dispatch => {
    try {
      const res = await authAPI.forgot(email)
      dispatch(isLetterWasSentAC(true))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

export const updatePasswordTC =
  (password: string, resetPasswordToken: string): AppThunk =>
  async dispatch => {
    try {
      const res = await authAPI.setNewPassword(password, resetPasswordToken)
      dispatch(isNewPasswordWasSetAC(true))
    } catch (e) {
      handleError(e, dispatch)
    }
  }
