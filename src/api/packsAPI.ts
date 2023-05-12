import { instance } from './instance'
import { AxiosResponse } from 'axios'
import {
  TAddNewCardData,
  TAddNewPackData,
  TGetCardsData,
  TGetPacksData,
  TResponseCardsData,
  TResponsePacksData,
  TUpdatePackData,
} from 'types/types'

// PACKS API
export const packsAPI = {
  // packs
  getPacks(data: TGetPacksData = {}) {
    return instance
      .get<{}, AxiosResponse<TResponsePacksData>>('/cards/pack', {
        params: data,
      })
      .then(res => res.data)
  },
  addNewPack(data?: TAddNewPackData) {
    return instance.post<{}, AxiosResponse<TResponsePacksData>>('/cards/pack', data)
  },
  deletePack(packId: string) {
    return instance.delete<{}, AxiosResponse<TResponsePacksData>>(`/cards/pack?id=${packId}`)
  },
  updatePack(data: TUpdatePackData) {
    return instance.put<{}, AxiosResponse<TResponsePacksData>>(`/cards/pack`, data)
  },

  // cards
  getCards(data: TGetCardsData) {
    return instance
      .get<{}, AxiosResponse<TResponseCardsData>>('/cards/card', { params: data })
      .then(res => res.data)
  },
  addNewCard(data: TAddNewCardData) {
    return instance.post<{}, AxiosResponse<TResponseCardsData>>('/cards/card', data)
  },
  deleteCard(cardId: string) {
    return instance.delete<{}, AxiosResponse<TResponseCardsData>>(`/cards/card?id=${cardId}`)
  },
  updateCard(data: TAddNewCardData) {
    return instance.put<{}, AxiosResponse<TResponseCardsData>>('/cards/card', data)
  },
}
