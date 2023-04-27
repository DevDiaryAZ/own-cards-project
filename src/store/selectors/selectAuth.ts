import {AppRootStateType} from "../store";

export const selectAuthError = (state: AppRootStateType): string => state.auth.authError
export const selectIsAuth = (state: AppRootStateType): boolean => state.auth.isAuth
export const selectIsLetterWasSent = (state: AppRootStateType): boolean => state.auth.isLetterWasSent
export const selectIsRegistered = (state: AppRootStateType): boolean =>  state.auth.isRegistered
export const selectIsNewPasswordWasSet = (state: AppRootStateType): boolean => state.auth.isNewPasswordWasSet