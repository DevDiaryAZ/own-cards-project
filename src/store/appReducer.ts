//TYPES
type InitialStateType = typeof initialState
export type AppActionType = SetIsLoaderAC
type SetIsLoaderAC = ReturnType<typeof setLoaderAC>

//INITIAL STATE
const initialState = {
  isLoader: true,
}

// APP REDUCER
export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionType
): InitialStateType => {
  switch (action.type) {
    case 'SET_LOADER':
      return { ...state, isLoader: action.payload.isLoader }
    default:
      return state
  }
}

// ACTION CREATORS
export const setLoaderAC = (isLoader: boolean) => {
  return {
    type: 'SET_LOADER',
    payload: {
      isLoader,
    } as const,
  }
}
