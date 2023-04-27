import React, {useEffect} from 'react';
import s from './Packs.module.css';
import {Button} from "common/components/Button/Button";
import {getPacksTC} from "store/packsReducer";
import {useAppDispatch, useAppSelector} from "hooks/hooks";
import {PacksTable} from "./components/tables/PacksTable/PacksTable";
import {PackFilters} from "./components/filters/PacksFilters/PackFilters";
import {addNewPackTC} from "store/packsReducer";
import {
    selectCardPacks,
    selectCardPacksTotalCount,
    selectPacksPage,
    selectPacksPageCount
} from "store/selectors/selectPacks";
import {CustomPagination} from "common/components/CustomPagination/CustomPagination";

export const Packs = () => {

    const dispatch = useAppDispatch()

    const isAuth = useAppSelector(state => state.auth.isAuth)

    const pack = useAppSelector(selectCardPacks)
    const page = useAppSelector(selectPacksPage)
    const pageCount = useAppSelector(selectPacksPageCount)
    const cardPacksTotalCount = useAppSelector(selectCardPacksTotalCount)

    useEffect(() => {
        if (!pack.length && isAuth) {
            let data = {
            page,
            pageCount
            }
            dispatch(getPacksTC(data))
        }
    }, [])

    const addNewPack = () => {
        let data = {
            //TODO: убрать заглущку, дописать функцию
            cardsPack: {}
        }
        dispatch(addNewPackTC(data))
    }

    const onChangePage = (page: number, count: number) => {
        let data = {
            page,
            pageCount: count
        }
        dispatch(getPacksTC(data))
    }

    return (
        <div className={s.wrapper}>

            <div className={s.titleContainer}>
                <h1 className={s.title}>Packs list</h1>
                <Button name={"Add new pack"} callBack={addNewPack}/>
            </div>

            <PackFilters/>

            <PacksTable/>

            <CustomPagination page={page}
                              itemsCountForPage={pageCount}
                              totalCount={cardPacksTotalCount}
                              onChange={onChangePage}/>
        </div>
    );
};