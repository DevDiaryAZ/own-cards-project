import { AppRootStateType } from '../store'

export const selectIsLoader = (state: AppRootStateType): boolean => state.app.isLoader
