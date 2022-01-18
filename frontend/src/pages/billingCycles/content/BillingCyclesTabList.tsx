import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import api from '../../dashboard/Axios'
import { IconButton } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import ContextProvider from '../../../data/Context';
import DeleteIcon from '@material-ui/icons/Delete'

interface IBillingCyclesProps {
    _id: string,
    name: string,
    month: number,
    year: number,
    credits: [
        {
            name: string,
            value: number,
            _id: string
        }
    ],
    debts: [
        {
            name: string,
            value: number,
            status: string,
            _id: string
        },
    ],

}

interface Column {
    id: 'Nome' | 'Mês' | 'Ano' | any
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
    paddingRight?: '30px' | '5px';

    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'Nome', label: 'Nome', minWidth: 170 },
    { id: 'Mês', label: 'Mês', minWidth: 100, align: 'center' },
    {
        id: 'Ano',
        label: 'Ano',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString(''),
    },
    { id: 'Ação', label: 'Ação', minWidth: 100, align: 'center', paddingRight: '30px' },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 450,
    },
});

export default function StickyHeadTable() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { setValue, setEditValues } = useContext(ContextProvider)


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [values, setValues] = useState<IBillingCyclesProps[]>([])

    useEffect(() => {
        api.get('/api/billingCycles/')
            .then((response) => setValues(response.data))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, []);


    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, fontWeight: 'bold', paddingRight: column.paddingRight }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {values.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                    <TableCell >{row.name}</TableCell>
                                    <TableCell align={'center'}>{row.month}</TableCell>
                                    <TableCell align={'right'}>{row.year}</TableCell>
                                    <TableCell align={'center'} style={{display: 'flex', justifyContent: 'center'}}>
                                        <Paper style={{ backgroundColor: 'orangered'}}>
                                            <IconButton onClick={() => {
                                                setEditValues({ id: row._id, name: row.name, month: row.month, year: row.year, credits: row.credits, debts: row.debts });
                                                setValue(2);
                                            }} >
                                                <CreateIcon style={{ color: 'white' }} fontSize='small' />
                                            </IconButton>
                                        </Paper>
                                        <Paper style={{ marginLeft: '5px', backgroundColor: 'red' }}>

                                            <IconButton  onClick={() => {
                                                setEditValues({ id: row._id, name: row.name, month: row.month, year: row.year, credits: row.credits, debts: row.debts  });
                                                setValue(3);
                                            }} >
                                                <DeleteIcon style={{ color: 'white' }} fontSize='small' />
                                            </IconButton>
                                        </Paper>

                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer >
            <TablePagination
                rowsPerPageOptions={[5, 25, 100]}
                component="div"
                count={values.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper >
    );
}