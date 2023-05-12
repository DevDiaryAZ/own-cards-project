import editImg from 'common/assets/pictures/edit.svg'
import deleteImg from 'common/assets/pictures/delete.svg'
import { useAppDispatch } from 'hooks/hooks'
import { deleteCardTC, updateCardTC } from 'store/cardsReducer'

type PropsType = {
  cardId: string
  cardUserId: string
}

export const CardsActions = ({ cardId, cardUserId }: PropsType) => {
  const dispatch = useAppDispatch()

  const deleteCard = () => {
    dispatch(deleteCardTC(cardId))
  }

  const updateCard = () => {
    let data = {
      //TODO: убрать заглущку, дописать функцию
      card: {
        _id: cardId,
        question: 'UPDATED blablabla',
        answer: 'UPDATED hehehe',
      },
    }

    dispatch(updateCardTC(data))
  }

  return (
    <>
      <button onClick={updateCard}>
        <img src={editImg} alt={'edit'} />
      </button>
      <button onClick={deleteCard}>
        <img src={deleteImg} alt={'delete'} />
      </button>
    </>
  )
}
