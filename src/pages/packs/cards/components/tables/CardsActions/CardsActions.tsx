import React, {ButtonHTMLAttributes, DetailedHTMLProps, MouseEventHandler} from 'react';
import editImg from 'common/assets/pictures/edit.svg'
import deleteImg from 'common/assets/pictures/delete.svg'
import teachImg from 'common/assets/pictures/teacher.svg'
import {deletePackTC, updatePackTC} from "store/packsReducer";
import {useAppDispatch} from "hooks/hooks";
import {deleteCardTC, updateCardTC} from "store/cardsReducer";
import {useParams} from "react-router-dom";

type PropsType = {
    cardId: string
}

export const CardsActions = ({cardId}: PropsType) => {

    const dispatch = useAppDispatch()

    const packId = useParams().packId

    const deleteCard = () => {
        dispatch(deleteCardTC(cardId))
    }

    const updateCard = () => {
        let data = {
            //TODO: убрать заглущку, дописать функцию
            card: {
                _id: cardId,
                question: "UPDATED blablabla",
                answer: "UPDATED hehehe",
            }
        }

        dispatch(updateCardTC(data))
    }

    return (
        <>
            <button onClick={updateCard}>
                <img src={editImg} alt={"edit"}/>
            </button>
            <button onClick={deleteCard}>
                <img src={deleteImg} alt={"delete"} />
            </button>
        </>
    );
};