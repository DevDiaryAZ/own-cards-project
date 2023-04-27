import {
    TAddNewCardData,
    TAddNewPackData,
    TCard,
    TCardPack,
    TGetCardsData,
    TResponseCardsData,
    TResponsePacksData,
    TUpdatePackData
} from "types/types";
import {AppThunk} from "./store";
import {handleError} from "common/utils/error-utils";
import {setLoaderAC} from "./appReducer";
import {packsAPI} from "api/packsAPI";
import {setPacksAC} from "store/packsReducer";

//TYPES
type InitialStateType = typeof initialState
export type CardsActionType = SetCardsACType
type SetCardsACType = ReturnType<typeof setCardsAC>

//INITIAL STATE
const initialState = {
    cards: [] as TCard[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 0,
    pageCount: 8,
    packUserId: '',
}

//PACKS REDUCER
export const cardsReducer = (state: InitialStateType = initialState, action: CardsActionType): InitialStateType => {
    switch (action.type) {
        case "SET_CARDS":
            return {
                ...state,
                cards: action.payload.data.cards,
                cardsTotalCount: action.payload.data.cardsTotalCount,
                maxGrade: action.payload.data.maxGrade,
                minGrade: action.payload.data.minGrade,
                page: action.payload.data.page,
                pageCount: action.payload.data.pageCount,
                packUserId: action.payload.data.packUserId,

    }
default:
    return state
}
}

//ACTION CREATORS
export const setCardsAC = (data: TResponseCardsData) => {
    return {
        type: "SET_CARDS",
        payload: {
            data
        }
    } as const
}

//THUNK CREATORS
export const getCardsTC = (params: TGetCardsData): AppThunk => async dispatch => {
    dispatch(setLoaderAC(true))
    try {
        const res = await packsAPI.getCards(params)
        dispatch(setCardsAC(res))
    } catch (e) {
        handleError(e, dispatch)
    } finally {
        dispatch(setLoaderAC(false))
    }
}

export const addNewCardTC = (data: TAddNewCardData): AppThunk => async dispatch => {
    dispatch(setLoaderAC(true))
    try {
        await packsAPI.addNewCard(data)
        const res = await packsAPI.getCards()
        dispatch(setCardsAC(res))
    } catch (e) {
        handleError(e, dispatch)
    } finally {
        dispatch(setLoaderAC(false))
    }
}

export const deleteCardTC = (cardId: string): AppThunk => async dispatch => {
    dispatch(setLoaderAC(true))
    try {
        await packsAPI.deleteCard(cardId)
        const res = await packsAPI.getCards()
        dispatch(setCardsAC(res))
    } catch (e) {
        handleError(e, dispatch)
    } finally {
        dispatch(setLoaderAC(false))
    }
}

export const updateCardTC = (data: TAddNewCardData): AppThunk => async dispatch => {
    dispatch(setLoaderAC(true))
    try {
        await packsAPI.updateCard(data)
        const res = await packsAPI.getCards()
        dispatch(setCardsAC(res))
    } catch (e) {
        handleError(e, dispatch)
    } finally {
        dispatch(setLoaderAC(false))
    }
}



