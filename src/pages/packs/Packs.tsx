import React, { useEffect } from 'react'
import s from './Packs.module.css'
import { Button } from 'common/components/Button/Button'
import { getPacksTC, rerenderPacksAC, setPageAC, setPageCountAC } from 'store/packsReducer'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { PacksTable } from './components/tables/PacksTable/PacksTable'
import { PackFilters } from './components/filters/PacksFilters/PackFilters'
import { addNewPackTC } from 'store/packsReducer'
import {
  selectCardPacksTotalCount,
  selectIsShowMyPacks,
  selectMaxCardsCount,
  selectMinCardsCount,
  selectPacksPage,
  selectPacksPageCount,
  selectRerenderPacksFlag,
  selectSortPacks,
} from 'store/selectors/selectPacks'
import { CustomPagination } from 'common/components/CustomPagination/CustomPagination'
import { selectUserId } from 'store/selectors/selectUser'
import { selectIsAuth } from 'store/selectors/selectAuth'
import { STitle } from 'common/components/Text/STitle'
import { AddIcon } from 'common/assets/pictures/AddIcon'
import { Box } from 'common/components/Box/Box'

export const Packs = () => {
  const dispatch = useAppDispatch()

  const isAuth = useAppSelector(selectIsAuth)
  const userId = useAppSelector(selectUserId)

  const page = useAppSelector(selectPacksPage)
  const pageCount = useAppSelector(selectPacksPageCount)
  const cardPacksTotalCount = useAppSelector(selectCardPacksTotalCount)
  const maxCardsCount = useAppSelector(selectMaxCardsCount)
  const minCardsCount = useAppSelector(selectMinCardsCount)
  const isShowMyPacks = useAppSelector(selectIsShowMyPacks)
  const sortPacks = useAppSelector(selectSortPacks)
  const rerenderPacksFlag = useAppSelector(selectRerenderPacksFlag)

  useEffect(() => {
    if (isAuth) {
      let data = {
        page,
        pageCount,
        min: minCardsCount,
        max: maxCardsCount,
        user_id: isShowMyPacks ? userId : '',
        sortPacks: sortPacks,
      }
      dispatch(getPacksTC(data))
    }
  }, [rerenderPacksFlag])

  const addNewPack = () => {
    let data = {
      //TODO: убрать заглущку, дописать функцию
      cardsPack: {},
    }
    dispatch(addNewPackTC(data))
  }

  const onChangePage = (page: number, count: number) => {
    dispatch(setPageAC(page))
    dispatch(setPageCountAC(count))
    dispatch(rerenderPacksAC())
  }

  return (
    <div className={s.wrapper}>
      <div className={s.titleContainer}>
        <STitle>Packs list</STitle>
        <Button onClick={addNewPack} label={'Add pack'} icon={<AddIcon />} withShadow />
      </div>

      <PackFilters />

      <PacksTable />

      <Box margin={'35px 0'}>
        <CustomPagination
          page={page}
          itemsCountForPage={pageCount}
          totalCount={cardPacksTotalCount}
          onChange={onChangePage}
        />
      </Box>
    </div>
  )
}
