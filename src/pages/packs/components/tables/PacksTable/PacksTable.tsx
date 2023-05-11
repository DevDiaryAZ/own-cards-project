import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableSortLabel from '@mui/material/TableSortLabel';
import {useAppSelector} from "hooks/hooks";
import {selectCardPacks, selectSortPacks} from "store/selectors/selectPacks";
import {PacksActions} from "pages/packs/components/tables/PacksActions/PacksActions";
import s from "pages/packs/Packs.module.css";
import {NavLink} from "react-router-dom";
import {NotFoundPacks} from "pages/packs/components/tables/NotFoundPacks/NotFoundPacks";
import SortIcon from '@mui/icons-material/Sort';

import {rerenderPacksAC, setSortPacksAC} from "store/packsReducer";
import {useSort} from "hooks/useSort";
import {selectUserId} from "store/selectors/selectUser";
import {
    STable,
    STableContainer,
    STableHead,
} from "pages/packs/components/tables/PacksTable/styles";

const TABLE_HEAD_DATA = [
    {
        name: 'Name',
        sortType: 'name',
    },
    {
        name: 'Cards',
        sortType: 'cardsCount',
    },
    {
        name: 'Last Updated',
        sortType: 'updated',
    },
    {
        name: 'Created by',
        sortType: 'user_name',
    },
];

export const PacksTable = () => {

    const cardPacks = useAppSelector(selectCardPacks)
    const sortPacks = useAppSelector(selectSortPacks)
    const userId = useAppSelector(selectUserId)

    const onSortPacksClick = useSort(setSortPacksAC, rerenderPacksAC, selectSortPacks);

    return (
        <div className={s.tableContainer}>
            {!cardPacks.length ? <NotFoundPacks
                messageError={'Packs with the entered name were not found. Change the query parameters'}/> : (
                <STableContainer>
                    <STable size="small" aria-label="a dense table">
                        <STableHead>
                            <TableRow>
                                {TABLE_HEAD_DATA.map(
                                    ({name, sortType}) => <TableCell key={'TableHead-' + name}><TableSortLabel
                                        active={sortPacks.slice(1, sortPacks.length) === sortType}
                                        direction={sortPacks === `0${sortType}` ? 'desc' : 'asc'}
                                        onClick={() => onSortPacksClick(sortType)} IconComponent={SortIcon}>{name}</TableSortLabel></TableCell>
                                )}
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </STableHead>
                        <TableBody>
                            {cardPacks.map((pack) => (
                                <TableRow key={pack._id}>
                                    <TableCell component="td" scope="row" sx={{
                                        maxWidth: '300px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}>
                                        <NavLink
                                            className={s.allPacks_link}
                                            to={`/cards/${pack.user_id === userId ? 'my-pack' : 'friends-pack' }/${pack._id}/${pack.name}`}
                                        >
                                            {pack.name}
                                        </NavLink>
                                    </TableCell>
                                    <TableCell>{pack.cardsCount}</TableCell>
                                    <TableCell>{pack.updated ? new Date(pack.updated).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    }) : ''}</TableCell>
                                    <TableCell>{pack.user_name}</TableCell>
                                    {/* pack actions */}
                                    <TableCell><PacksActions packId={pack._id} packUserId={pack.user_id}
                                                             cardsCount={pack.cardsCount}/></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </STable>
                </STableContainer>)
            }
        </div>
    );
};