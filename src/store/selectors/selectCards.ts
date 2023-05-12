import { AppRootStateType } from '../store'
import { TCard } from 'types/types'

export const selectCards = (state: AppRootStateType): TCard[] => state.cards.cards
export const selectCardsPage = (state: AppRootStateType): number => state.cards.page
export const selectCardsPageCount = (state: AppRootStateType): number => state.cards.pageCount
export const selectCardsTotalCount = (state: AppRootStateType): number =>
  state.cards.cardsTotalCount
export const selectCardsPackUserId = (state: AppRootStateType): string => state.cards.packUserId
export const selectSortCards = (state: AppRootStateType): string => state.cards.sortCards
export const selectIsUsedCardsFilter = (state: AppRootStateType): boolean =>
  state.cards.isUsedCardsFilter
export const selectRerenderFlag = (state: AppRootStateType): Array<string> =>
  state.cards.rerenderFlag
