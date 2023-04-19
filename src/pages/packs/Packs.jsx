import React from 'react';
import s from './Packs.module.css';
import {Button} from "../../common/components/Button/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {makeStyles} from "@mui/styles";
import removeFilterImg from "../../common/assets/pictures/remove-filter.svg"


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export const Packs = () => {
    const classes = useStyles();

    function createData(name, calories, fat, carbs, protein) {
        return {name, calories, fat, carbs, protein};
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

    return (
        <div className={s.wrapper}>
            <div className={s.titleContainer}>
                <h1 className={s.title}>Packs list</h1>
                <Button name={"Add new pack"}/>
            </div>

            <div className={s.filtersContainer}>
                <div className={s.filtersItem}>
                    <div className={s.filtersTitle}>Search</div>
                    <input type="text" placeholder={"Provide your text"}/>
                </div>

                <div className={s.filtersItem}>
                    <div className={s.filtersTitle}>Show packs cards</div>
                    <div className={s.filtersBtnContainer}>
                        <Button name={"My packs"}/>
                        <Button name={"All packs"}/>
                    </div>
                </div>

                <div className={s.filtersItem}>
                    <div className={s.filtersTitle}>Number of cards</div>
                    <div className={s.filtersBtnContainer}>
                        <input type="range" min="1" max="100" value="50" className="slider" id="myRange"/>
                    </div>
                </div>

                <div className={s.filtersItem}>
                    <button><img src={removeFilterImg} alt="remove-filters"/></button>
                </div>
            </div>

            <div className={s.tableContainer}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Dessert (100g serving)</TableCell>
                                <TableCell align="right">Calories</TableCell>
                                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                    <TableCell align="right">{row.protein}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};