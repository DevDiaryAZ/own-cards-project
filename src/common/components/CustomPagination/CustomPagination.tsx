import {ChangeEvent} from 'react'
import s from "./CustomPagination.module.css"
import {SCustomPagination} from "common/components/CustomPagination/styles";
import {PageCountDropdown} from "common/components/PageCountDropdown/PageCountDropdown";
import {SText} from "common/components/Text/SText";

export type SuperPaginationPropsType = {
    id?: string
    page: number
    itemsCountForPage: number
    totalCount: number
    onChange: (page: number, count: number) => void
}

const pageCounts = [4, 8, 10, 20];

export const CustomPagination: React.FC<SuperPaginationPropsType> =
    ({
         page, itemsCountForPage, totalCount, onChange, id = 'new',
     }) => {
        const lastPage = Math.ceil(totalCount / itemsCountForPage) // пишет студент // вычислить количество страниц

        const onChangeCallback = (event: any, page: number) => {
            onChange(page, itemsCountForPage)
        }

        const onChangePageCountHandler = (count: number) => {
            onChange(page, count)
        };

        return (
            <>
                <SCustomPagination
                    id={id + '-packPagination'}
                    page={page}
                    count={lastPage}
                    onChange={onChangeCallback}
                />

                <SText display={"flex"} alignItems={"center"}>Show</SText>

                <PageCountDropdown
                    pageCounts={pageCounts}
                    onClick={onChangePageCountHandler}
                    activeCount={itemsCountForPage}
                />

                <SText display={"flex"} alignItems={"center"}>cards per page</SText>
            </>
        )
    }