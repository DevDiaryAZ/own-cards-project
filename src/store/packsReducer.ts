import {
    TAddNewPackData,
    TCardPack,
    TGetCardsData,
    TGetPacksData,
    TResponsePacksData,
    TUpdatePackData
} from "types/types";
import {AppThunk} from "./store";
import {handleError} from "common/utils/error-utils";
import {setLoaderAC} from "./appReducer";
import {packsAPI} from "api/packsAPI";
import {authAPI} from "api/authAPI";
import {selectIsShowMyPacks} from "store/selectors/selectPacks";

//TYPES
type InitialStateType = typeof initialState
export type PacksActionType =
    SetPacksACType
    | SetIsShowMyPacksACType
    | RerenderPacksACType
    | SetPageACType
    | SetPageCountACType
    | SetSortPacksACType
type SetPacksACType = ReturnType<typeof setPacksAC>
type SetIsShowMyPacksACType = ReturnType<typeof setIsShowMyPacksAC>
type RerenderPacksACType = ReturnType<typeof rerenderPacksAC>
type SetPageACType = ReturnType<typeof setPageAC>
type SetPageCountACType = ReturnType<typeof setPageCountAC>
type SetSortPacksACType = ReturnType<typeof setSortPacksAC>


//INITIAL STATE
const initialState = {
    cardPacks: [] as TCardPack[],

    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 8,

    isShowMyPacks: false,
    sortPacks: '0updated',

    rerenderPacksFlag: ['rerender'],
}

//PACKS REDUCER
export const packsReducer = (state: InitialStateType = initialState, action: PacksActionType): InitialStateType => {
    switch (action.type) {
        case "SET_PACKS":
            return {
                ...state,
                cardPacks: action.payload.data.cardPacks,
                cardPacksTotalCount: action.payload.data.cardPacksTotalCount,
                maxCardsCount: action.payload.data.maxCardsCount,
                minCardsCount: action.payload.data.minCardsCount,
                page: action.payload.data.page,
                pageCount: action.payload.data.pageCount,
            }
        case "SET_IS_SHOW_MY_PACKS":
            return {
                ...state,
                isShowMyPacks: action.payload.isShowMyPacks,
            }
        case "SET_PAGE":
            return {
                ...state,
                page: action.payload.page
            }
        case "SET_PAGE_COUNT":
            return {
                ...state,
                pageCount: action.payload.pageCount
            }
        case "SET_SORT_PACKS":
            return {
                ...state,
                sortPacks: action.payload.sortPacks
            }
        case "RERENDER_PACKS":
            return {
                ...state,
                rerenderPacksFlag: {...state.rerenderPacksFlag}
            }
        default:
            return state
    }
}

//ACTION CREATORS
export const setPacksAC = (data: TResponsePacksData) => {
    return {
        type: "SET_PACKS",
        payload: {
            data
        }
    } as const
}

export const setIsShowMyPacksAC = (isShowMyPacks: boolean) => {
    return {
        type: "SET_IS_SHOW_MY_PACKS",
        payload: {
            isShowMyPacks
        }
    } as const
}

export const setPageAC = (page: number) => {
    return {
        type: "SET_PAGE",
        payload: {
            page
        }
    } as const
}

export const setPageCountAC = (pageCount: number) => {
    return {
        type: "SET_PAGE_COUNT",
        payload: {
            pageCount
        }
    } as const
}

export const setSortPacksAC = (sortPacks: string = '0updated') => {
    return {
        type: "SET_SORT_PACKS",
        payload: {
            sortPacks
        }
    } as const
}

export const rerenderPacksAC = () => {
    return {
        type: "RERENDER_PACKS",
    } as const
}

//THUNK CREATORS

//PACKS
export const getPacksTC = (data: TGetPacksData): AppThunk => async dispatch => {
    dispatch(setLoaderAC(true))
    try {
        const res = await packsAPI.getPacks(data)
        dispatch(setPacksAC(res))
    } catch (e) {
        handleError(e, dispatch)
    } finally {
        dispatch(setLoaderAC(false))
    }
}

export const addNewPackTC = (data: TAddNewPackData): AppThunk => async dispatch => {
    dispatch(setLoaderAC(true))
    try {
        await packsAPI.addNewPack(data)
        dispatch(rerenderPacksAC())
    } catch (e) {
        handleError(e, dispatch)
    } finally {
        dispatch(setLoaderAC(false))
    }
}

export const deletePackTC = (packId: string): AppThunk => async dispatch => {
    dispatch(setLoaderAC(true))
    try {
        await packsAPI.deletePack(packId)
        dispatch(rerenderPacksAC())
    } catch (e) {
        handleError(e, dispatch)
    } finally {
        dispatch(setLoaderAC(false))
    }
}

export const updatePackTC = (data: TUpdatePackData): AppThunk => async dispatch => {
    dispatch(setLoaderAC(true))
    try {
        await packsAPI.updatePack(data)
        dispatch(rerenderPacksAC())
    } catch (e) {
        handleError(e, dispatch)
    } finally {
        dispatch(setLoaderAC(false))
    }
}



