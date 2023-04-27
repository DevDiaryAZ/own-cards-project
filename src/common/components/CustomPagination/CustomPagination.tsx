import React, {ChangeEvent} from 'react'

import {Pagination} from "@mui/material"

import s from "./CustomPagination.module.css"
import {Select} from "common/components/Select/Select"


export type SuperPaginationPropsType = {
    id?: string
    page: number
    itemsCountForPage: number
    totalCount: number
    onChange: (page: number, count: number) => void
}

export const CustomPagination: React.FC<SuperPaginationPropsType> = ({
                                                                         page,
                                                                         itemsCountForPage,
                                                                         totalCount,
                                                                         onChange,
                                                                         id = 'new',
                                                                     }) => {
    const lastPage = Math.ceil(totalCount / itemsCountForPage) // пишет студент // вычислить количество страниц

    const onChangeCallback = (event: any, page: number) => {
        onChange(page, itemsCountForPage)
    }

    const onChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        onChange(page, +event.currentTarget.value)
    }

    return (
        <div className={s.pagination}>
            <Pagination
                id={id + '-packPagination'}
                sx={{
                    'li button': {
                        fontFamily: 'Montserrat',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: '12px',
                        lineHeight: '15px',
                        color: '#000000',
                        margin: '0 2px',
                    },
                    'li button:hover': {
                        backgroundColor: 'transparent',
                    },
                    'li button.Mui-selected': {
                        backgroundColor: '#366EFF',
                        borderRadius: '2px',
                        color: '#FFFFFF',
                    },
                    'li button.Mui-selected:hover': {
                        backgroundColor: '#366EFF',
                    },
                    'li span.MuiTouchRipple-root': {
                        display: 'none',
                    },
                }}
                page={page}
                count={lastPage}
                onChange={onChangeCallback}
                // hideNextButton
                // hidePrevButton
            />

            <span className={s.text1}>Show</span>

            <Select
                id={id + '-packPagination-basicSelect'}
                value={itemsCountForPage}
                options={[
                    {id: 8, value: '8'},
                    {id: 10, value: '10'},
                    {id: 20, value: '20'},
                ]}
                onChange={onChangeSelect}
            />

            <span className={s.text2}>Cards per Page</span>
        </div>
    )
}