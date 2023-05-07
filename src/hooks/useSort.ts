import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {AppRootActionsType, AppRootStateType} from "store/store";
import {useAppDispatch} from "hooks/hooks";

export const useSort = (
    action: (sort: string) => AppRootActionsType,
    rerenderAction: () => AppRootActionsType,
    select: (state: AppRootStateType) => string,
): ((sortType: string) => void) => {
    const dispatch = useAppDispatch()

    const sortValue = useSelector(select);

    return useCallback(
        (sortType: string): void => {
            if (sortValue === `1${sortType}`) {
                dispatch(action(`0${sortType}`));
                dispatch(rerenderAction());
            } else {
                dispatch(action(`1${sortType}`));
                dispatch(rerenderAction());
            }
        },
        [sortValue],
    );
};
