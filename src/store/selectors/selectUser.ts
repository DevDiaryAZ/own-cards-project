import {AppRootStateType} from "../store";

export const selectUserId = (state: AppRootStateType): string => state.user._id