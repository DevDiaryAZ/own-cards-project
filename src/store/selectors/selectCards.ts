import {AppRootStateType} from "../store";
import {TCard} from "types/types";

export const selectCards = (state: AppRootStateType): TCard[] => state.cards.cards
export const selectCardsPage = (state: AppRootStateType): number => state.cards.page
export const selectCardsPageCount = (state: AppRootStateType): number => state.cards.pageCount
export const selectCardsTotalCount = (state: AppRootStateType): number => state.cards.cardsTotalCount


