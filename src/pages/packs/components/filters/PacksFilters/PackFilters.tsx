import React, {useEffect, useState} from "react";
import s from "pages/packs/Packs.module.css";
import {Button} from "common/components/Button/Button";
import {CardRange} from "pages/packs/components/filters/CardRange/CardRange";
import removeFilterImg from "common/assets/pictures/remove-filter.svg";
import {SearchInput} from "common/components/SearchInput/SearchInput";
import {getPacksTC, setIsShowMyPacksAC} from "store/packsReducer";
import {useAppDispatch, useAppSelector} from "hooks/hooks";
import {
    selectIsShowMyPacks,
    selectMaxCardsCount,
    selectMinCardsCount,
    selectPacksPageCount
} from "store/selectors/selectPacks";
import {selectUserId} from "store/selectors/selectUser";

export const PackFilters = () => {

    const dispatch = useAppDispatch()

    const pageCount = useAppSelector(selectPacksPageCount)
    const userId = useAppSelector(selectUserId)
    const maxCardsCount = useAppSelector(selectMaxCardsCount)
    const minCardsCount = useAppSelector(selectMinCardsCount)
    const isShowMyPacks = useAppSelector(selectIsShowMyPacks)

    useEffect(() => {
        // debugger
        setCurrentMinMaxCount([minCardsCount, maxCardsCount])
    }, [minCardsCount, maxCardsCount])

    const [currentMinMaxCount, setCurrentMinMaxCount] = useState<number[]>([0,0])
    const [currentInputText, setCurrentInputText] = useState('')

    const onDebouncedSearchInput = (value: string) => {
        let data = {
            user_id: isShowMyPacks ? userId : '',
            min: currentMinMaxCount[0] ? currentMinMaxCount[0] : minCardsCount,
            max: currentMinMaxCount[1] ? currentMinMaxCount[1] : maxCardsCount,
            packName: value,
            pageCount: pageCount,
        }
        setCurrentInputText(value)
        dispatch(getPacksTC(data))
    }

    const getAllOrMyPacks = (allOrMyValue?: string) => {
        let data = {
            user_id: '',
            min: currentMinMaxCount[0] ? currentMinMaxCount[0] : minCardsCount,
            max: currentMinMaxCount[1] ? currentMinMaxCount[1] : maxCardsCount,
            pageCount: pageCount,
            packName: currentInputText ? currentInputText : '',
        }

        if (allOrMyValue === 'my') {
            data.user_id = userId
            dispatch(setIsShowMyPacksAC(true))
        } else {
            dispatch(setIsShowMyPacksAC(false))
        }

        dispatch(getPacksTC(data))
    }

    const onchangeCardRange = (event: Event, newValue: number | number[]) => {
        console.log(newValue)
        if (Array.isArray(newValue)) {
            setCurrentMinMaxCount(newValue)

            let data = {
                min: newValue[0],
                max: newValue[1],
                pageCount: pageCount
            }

            dispatch(getPacksTC(data))
        }
    }

    return (
        <div className={s.filtersContainer}>
            <div className={s.filtersItem}>
                <div className={s.filtersTitle}>Search</div>
                <SearchInput onDebouncedChange={onDebouncedSearchInput}/>
            </div>

            <div className={s.filtersItem}>
                <div className={s.filtersTitle}>Show packs cards</div>
                <div className={s.filtersBtnContainer}>
                    <Button name={"My packs"} callBack={() => getAllOrMyPacks('my')}/>
                    <Button name={"All packs"} callBack={getAllOrMyPacks}/>
                </div>
            </div>

            <div className={s.filtersItem}>
                <CardRange onChange={onchangeCardRange} value={currentMinMaxCount} max={maxCardsCount} min={minCardsCount}/>
            </div>

            <div className={s.filtersItem}>
                <button><img src={removeFilterImg} alt="remove-filters"/></button>
            </div>
        </div>
    );
};
