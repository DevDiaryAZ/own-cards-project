import {
  TAddNewCardData,
  TAddNewPackData,
  TCard,
  TCardPack,
  TGetCardsData,
  TResponseCardsData,
  TResponsePacksData,
  TUpdatePackData,
} from 'types/types'
import { AppThunk } from './store'
import { handleError } from 'common/utils/error-utils'
import { setLoaderAC } from './appReducer'
import { packsAPI } from 'api/packsAPI'
import { setPacksAC } from 'store/packsReducer'

//TYPES
type InitialStateType = typeof initialState
export type CardsActionType =
  | ResetCardsACACType
  | SetIsUsedCardsFilterACType
  | SetCardsACType
  | SetSortCardsACType
  | RerenderCardsACType
type SetCardsACType = ReturnType<typeof setCardsAC>
type SetSortCardsACType = ReturnType<typeof setSortCardsAC>
type SetIsUsedCardsFilterACType = ReturnType<typeof setIsUsedCardsFilterAC>
type ResetCardsACACType = ReturnType<typeof resetCardsAC>
type RerenderCardsACType = ReturnType<typeof rerenderCardsAC>

//INITIAL STATE
const initialState = {
  cards: [] as TCard[],
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  page: 0,
  pageCount: 8,
  packUserId: '',

  sortCards: '0grade',

  isUsedCardsFilter: false,
  rerenderFlag: ['rerender'],
}

//PACKS REDUCER
export const cardsReducer = (
  state: InitialStateType = initialState,
  action: CardsActionType
): InitialStateType => {
  switch (action.type) {
    case 'SET_CARDS':
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
    case 'RESET_CARDS':
      return {
        ...state,
        cards: [],
        cardsTotalCount: 0,
        maxGrade: 0,
        minGrade: 0,
        page: 0,
        pageCount: 8,
        packUserId: '',
        sortCards: '0grade',
        isUsedCardsFilter: false,
      }
    case 'SET_SORT_CARDS':
      return {
        ...state,
        sortCards: action.payload.sortCards,
      }
    case 'SET_IS_USED_CARDS_FILTER':
      return {
        ...state,
        isUsedCardsFilter: action.payload.isUsedCardsFilter,
      }
    case 'RERENDER_CARDS':
      return {
        ...state,
        rerenderFlag: { ...state.rerenderFlag },
      }
    default:
      return state
  }
}

//ACTION CREATORS
export const setCardsAC = (data: TResponseCardsData) => {
  return {
    type: 'SET_CARDS',
    payload: {
      data,
    },
  } as const
}

export const setSortCardsAC = (sortCards: string) => {
  return {
    type: 'SET_SORT_CARDS',
    payload: {
      sortCards,
    },
  } as const
}

export const setIsUsedCardsFilterAC = (isUsedCardsFilter: boolean) => {
  return {
    type: 'SET_IS_USED_CARDS_FILTER',
    payload: {
      isUsedCardsFilter,
    },
  } as const
}

export const resetCardsAC = () => {
  return {
    type: 'RESET_CARDS',
  } as const
}

export const rerenderCardsAC = () => {
  return {
    type: 'RERENDER_CARDS',
  } as const
}

//THUNK CREATORS
export const getCardsTC =
  (params: TGetCardsData): AppThunk =>
  async dispatch => {
    dispatch(setLoaderAC(true))
    try {
      const res = await packsAPI.getCards(params)
      dispatch(setCardsAC(res))
      if (params.cardQuestion) {
        dispatch(setIsUsedCardsFilterAC(true))
      } else {
        dispatch(setIsUsedCardsFilterAC(false))
      }
    } catch (e) {
      handleError(e, dispatch)
    } finally {
      dispatch(setLoaderAC(false))
    }
  }

export const addNewCardTC =
  (data: TAddNewCardData): AppThunk =>
  async dispatch => {
    dispatch(setLoaderAC(true))
    try {
      await packsAPI.addNewCard(data)
      dispatch(rerenderCardsAC())
    } catch (e) {
      handleError(e, dispatch)
    } finally {
      dispatch(setLoaderAC(false))
    }
  }

export const deleteCardTC =
  (cardId: string): AppThunk =>
  async dispatch => {
    dispatch(setLoaderAC(true))
    try {
      await packsAPI.deleteCard(cardId)
      dispatch(rerenderCardsAC())
    } catch (e) {
      handleError(e, dispatch)
    } finally {
      dispatch(setLoaderAC(false))
    }
  }

export const updateCardTC =
  (data: TAddNewCardData): AppThunk =>
  async dispatch => {
    dispatch(setLoaderAC(true))
    try {
      await packsAPI.updateCard(data)
      dispatch(rerenderCardsAC())
    } catch (e) {
      handleError(e, dispatch)
    } finally {
      dispatch(setLoaderAC(false))
    }
  }
