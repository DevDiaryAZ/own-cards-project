import React from 'react';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {useAppSelector} from "hooks/hooks";
import {selectCardPacks} from "store/selectors/selectPacks";
import {Table} from "@mui/material";
import {PacksActions} from "pages/packs/components/tables/PacksActions/PacksActions";
import s from "pages/packs/Packs.module.css";
import {NavLink} from "react-router-dom";
import {NotFoundPacks} from "pages/packs/components/tables/NotFoundPacks/NotFoundPacks";

export const PacksTable = () => {

    const cardPacks = useAppSelector(selectCardPacks)

    return (
        <div className={s.tableContainer}>
            {!cardPacks.length ? <NotFoundPacks/> : (<TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Cards</TableCell>
                                <TableCell>Last Updated</TableCell>
                                <TableCell>Created by</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cardPacks.map((pack) => (
                                <TableRow key={pack._id}>
                                    <TableCell component="th" scope="row" sx={{
                                        maxWidth: '300px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}>
                                        <NavLink
                                            className={s.allPacks_link}
                                            to={`/cards/${pack._id}/`}
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
                                    <TableCell><PacksActions packId={pack._id}/></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>)
            }
        </div>
    );
};