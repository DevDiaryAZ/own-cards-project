import {AppRootStateType} from "../store";

export const selectUserId = (state: AppRootStateType): string => state.user._id
export const selectUserEmail = (state: AppRootStateType): string => state.user.email
export const selectUserName = (state: AppRootStateType): string => state.user.name
export const selectUserAvatar = (state: AppRootStateType): string | undefined=> state.user.avatar