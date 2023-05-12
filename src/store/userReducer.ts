import { TResponseAuthData } from 'types/types'
import { AppThunk } from './store'
import { authAPI } from '../api/authAPI'
import { handleError } from '../common/utils/error-utils'

//TYPES
type InitialStateType = typeof initialState
export type UserActionType = UpdateUserInfoACType | ChangeNameACType
type UpdateUserInfoACType = ReturnType<typeof updateUserInfoAC>
type ChangeNameACType = ReturnType<typeof changeNameAC>

//INITIAL STATE
const initialState = {
  _id: '',
  email: '',
  name: '',

  avatar: '' as string | undefined,

  publicCardPacksCount: 0,

  created: null as Date | null,
  updated: null as Date | null,
  isAdmin: false,
  verified: false,
  rememberMe: false,
}

//USER REDUCER
export const userReducer = (
  state: InitialStateType = initialState,
  action: UserActionType
): InitialStateType => {
  switch (action.type) {
    case 'UPDATE_USER_INFO':
      return {
        ...state,
        _id: action.payload.data._id,
        email: action.payload.data.email,
        name: action.payload.data.name,
        avatar: action.payload.data.avatar,
      }
    case 'CHANGE_NAME':
      return { ...state, name: action.payload.newName }
    default:
      return state
  }
}

//ACTION CREATORS
export const updateUserInfoAC = (data: TResponseAuthData) => {
  return {
    type: 'UPDATE_USER_INFO',
    payload: {
      data,
    },
  } as const
}

const changeNameAC = (newName: string) => {
  return {
    type: 'CHANGE_NAME',
    payload: {
      newName,
    },
  } as const
}

export const changeNameTC =
  (newName: string): AppThunk =>
  async dispatch => {
    try {
      const res = await authAPI.changeName(newName)
      dispatch(changeNameAC(newName))
    } catch (e) {
      handleError(e, dispatch)
    }
  }
