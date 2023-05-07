import React, {ButtonHTMLAttributes, DetailedHTMLProps, MouseEventHandler} from 'react';
import editImg from 'common/assets/pictures/edit.svg'
import deleteImg from 'common/assets/pictures/delete.svg'
import teachImg from 'common/assets/pictures/teacher.svg'
import {deletePackTC, updatePackTC} from "store/packsReducer";
import {useAppDispatch, useAppSelector} from "hooks/hooks";
import {selectUserId} from "store/selectors/selectUser";

type PropsType = {
    packId: string
    packUserId: string
    cardsCount: number
}

export const PacksActions = ({packId, packUserId, cardsCount}: PropsType) => {

    const dispatch = useAppDispatch()

    const userId = useAppSelector(selectUserId)

    const deletePack = () => {
        dispatch(deletePackTC(packId))
    }

    const updatePack = () => {
        let data = {
            cardsPack: {
                _id: packId,
                name: 'UPDATED NAME'
            }
        }

        dispatch(updatePackTC(data))
    }

    const handlerTeachPack = () => {
        console.log('teach')
    }

    return (
        <>

            <button disabled={!cardsCount} onClick={handlerTeachPack} style={{opacity: !!cardsCount ? '1' : '0.3'}}>
                <img src={teachImg} alt={"teach"}/>
            </button>

            {(packUserId === userId) && (<>
                <button onClick={updatePack}>
                    <img src={editImg} alt={"edit"}/>
                </button>
                <button onClick={deletePack}>
                    <img src={deleteImg} alt={"delete"}/>
                </button>
            </>)}
        </>
    );
};