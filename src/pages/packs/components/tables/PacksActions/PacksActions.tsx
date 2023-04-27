import React, {ButtonHTMLAttributes, DetailedHTMLProps, MouseEventHandler} from 'react';
import editImg from 'common/assets/pictures/edit.svg'
import deleteImg from 'common/assets/pictures/delete.svg'
import teachImg from 'common/assets/pictures/teacher.svg'
import {deletePackTC, updatePackTC} from "store/packsReducer";
import {useAppDispatch} from "hooks/hooks";

type PropsType = {
    packId: string
}

export const PacksActions = ({packId}: PropsType) => {

    const dispatch = useAppDispatch()

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

    return (
        <>
            <button>
                <img src={teachImg} alt={"teach"}/>
            </button>
            <button onClick={updatePack}>
                <img src={editImg} alt={"edit"}/>
            </button>
            <button onClick={deletePack}>
                <img src={deleteImg} alt={"delete"} />
            </button>
        </>
    );
};