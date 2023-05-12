import { useEffect, useState } from 'react'
import { Button } from 'common/components/Button/Button'
import { CardRange } from 'pages/packs/components/filters/CardRange/CardRange'
import { SearchInput } from 'common/components/SearchInput/SearchInput'
import { getPacksTC, setIsShowMyPacksAC, setSortPacksAC } from 'store/packsReducer'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import {
  selectIsShowMyPacks,
  selectMaxCardsCount,
  selectMinCardsCount,
  selectPacksPage,
  selectPacksPageCount,
} from 'store/selectors/selectPacks'
import { selectUserId } from 'store/selectors/selectUser'
import useDebouncedEffect from 'use-debounced-effect'
import SearchIcon from 'common/assets/pictures/SearchIcon'
import { Box } from 'common/components/Box/Box'
import FilterIcon from 'common/assets/pictures/FilterIcon'
import IconButton from 'common/components/IconButton/IconButton'

export const PackFilters = () => {
  const [currentMinMaxCount, setCurrentMinMaxCount] = useState<number[]>([0, 0])
  const [currentInputText, setCurrentInputText] = useState('')
  const [isInputOnchange, setIsInputOnchange] = useState<Array<string>>(['input changed'])

  const dispatch = useAppDispatch()

  const page = useAppSelector(selectPacksPage)
  const pageCount = useAppSelector(selectPacksPageCount)
  const userId = useAppSelector(selectUserId)
  const maxCardsCount = useAppSelector(selectMaxCardsCount)
  const minCardsCount = useAppSelector(selectMinCardsCount)
  const isShowMyPacks = useAppSelector(selectIsShowMyPacks)

  useEffect(() => {
    setCurrentMinMaxCount([minCardsCount, maxCardsCount])
  }, [minCardsCount, maxCardsCount])

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

  const handlerGetAllOrMyPacks = (allOrMyValue?: string) => {
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
      dispatch(setSortPacksAC())
    } else {
      dispatch(setIsShowMyPacksAC(false))
    }

    dispatch(getPacksTC(data))
  }

  const handlerOnchangeCardRange = (event: Event, newValue: number | number[]) => {
    setCurrentMinMaxCount(newValue as number[])
    setIsInputOnchange(['input changed'])
  }

  const handlerRemoveFilters = () => {
    let data = {
      page,
      pageCount,
    }
    dispatch(getPacksTC(data))
    setCurrentMinMaxCount([minCardsCount, maxCardsCount])
    dispatch(setIsShowMyPacksAC(false))
    setCurrentInputText('')
  }

  useDebouncedEffect(
    () => {
      let data = {
        min: currentMinMaxCount[0],
        max: currentMinMaxCount[1],
        pageCount: pageCount,
      }

      dispatch(getPacksTC(data))
    },
    {
      timeout: 1000,
      ignoreInitialCall: true,
    },
    [isInputOnchange]
  )

  return (
    // <div className={s.filtersContainer}>
    <Box alignItems={'flex-end'} justifyContent={'space-between'} gap={'20px'} margin={'40px 0'}>
      <Box alignItems={'center'} width={'100%'} maxWidth={'40%'}>
        <SearchInput
          onDebouncedChange={onDebouncedSearchInput}
          value={currentInputText}
          onChangeText={setCurrentInputText}
          leftIcon={<SearchIcon />}
          placeholder={'Search by name'}
        />
      </Box>

      <Box alignItems={'center'} gap={'10px'}>
        <Button
          label={'My packs'}
          onClick={() => handlerGetAllOrMyPacks('my')}
          isNoActive={!isShowMyPacks}
          padding={'11px 10px'}
        />
        <Button
          label={'All packs'}
          onClick={() => handlerGetAllOrMyPacks()}
          isNoActive={isShowMyPacks}
          padding={'11px 10px'}
        />
      </Box>

      <Box alignItems={'center'} flexDirection={'column'} gap={'10px 20px'}>
        <CardRange
          onChange={handlerOnchangeCardRange}
          value={currentMinMaxCount}
          max={maxCardsCount}
          min={minCardsCount}
        />
      </Box>

      <IconButton
        onClick={handlerRemoveFilters}
        icon={<FilterIcon />}
        title={'Filter'}
        isLightest
      />
    </Box>
    // </div>
  )
}
