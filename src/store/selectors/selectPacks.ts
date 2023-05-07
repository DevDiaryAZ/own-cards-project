import {AppRootStateType} from "../store";
import {TCardPack} from "types/types";

export const selectCardPacks = (state: AppRootStateType): TCardPack[] => state.packs.cardPacks
export const selectPacksPage = (state: AppRootStateType): number => state.packs.page
export const selectPacksPageCount = (state: AppRootStateType): number => state.packs.pageCount
export const selectCardPacksTotalCount = (state: AppRootStateType): number => state.packs.cardPacksTotalCount
export const selectMaxCardsCount = (state: AppRootStateType): number => state.packs.maxCardsCount
export const selectMinCardsCount = (state: AppRootStateType): number => state.packs.minCardsCount
export const selectIsShowMyPacks = (state: AppRootStateType): boolean => state.packs.isShowMyPacks
export const selectSortPacks = (state: AppRootStateType): string => state.packs.sortPacks
export const selectRerenderPacksFlag = (state: AppRootStateType): Array<string> => state.packs.rerenderPacksFlag
