import React, { useContext, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Box, Button, Divider, IconButton, Paper, Snackbar, Typography } from '@material-ui/core';
import api from '../../dashboard/Axios'
import { Alert } from '@material-ui/lab';
import ContextProvider from '../../../data/Context';
import AddIcon from '@material-ui/icons/Add';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete'
import produce from 'immer'
import Summary from './BillingCyclesSummary';

type ICredits = {
    name: string,
    value: number
}
type IDebts = {
    name: string,
    value: number,
    status: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            maxHeight: '60vh'
        },
        button: {
            marginTop: '30px'
        },
        inputForm: {
            display: 'flex'
        },
        alerta: {
            marginTop: '80px'
        },
        incluirCredit: {
            display: 'flex',
        },
        credtDebts: {
            marginTop: '25px',
            overflow: 'auto',
            width: '35vw',
            maxHeight: '20vh'
        }
    }),
);

const BillingCyclesForm: React.FC = () => {
    const classes = useStyles();

    const { setValue, setOpenSucesso } = useContext(ContextProvider)

    const [name, setName] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [credits, setCredits] = useState<ICredits[]>([{
        name: '',
        value: 0
    }])
    const [debts, setDebts] = useState<IDebts[]>([{
        name: '',
        value: 0,
        status: ''
    }])

    const [openError, setOpenError] = React.useState(false);

    const handleCloseError = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        setOpenError(false);
    };

    const removeFormFields = (i: any) => {
        let newFormValues = [...credits];
        console.log(newFormValues.splice(i, 1))
        setCredits(newFormValues)
    }
    const removeFormFieldsDebts = (i: any) => {
        let newFormValues = [...debts];
        console.log(newFormValues.splice(i, 1))
        setDebts(newFormValues)
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await api.post('/api/billingCycles', {
                name,
                month,
                year,
                credits,
                debts
            });

            setTimeout(() => {
                setValue(0)

            }, 500)

            setTimeout(() => {
                setOpenSucesso(true)

            }, 500)

        } catch {
            setOpenError(true);
        }
    }



    return (
        <>
            <Box component={Paper} p={3}>
                <form className={classes.formContainer} onSubmit={handleSubmit} >
                    <div className={classes.inputForm}>
                        <TextField style={{ marginRight: "20px" }} fullWidth label="Nome" value={name} onChange={e => setName(e.target.value)} />
                        <TextField style={{ marginRight: "20px" }} fullWidth label="Mês" value={month} onChange={e => setMonth(e.target.value)} />
                        <TextField style={{ marginRight: "20px" }} fullWidth label="Ano" value={year} onChange={e => setYear(e.target.value)} />
                        <Divider />
                    </div>

                    <Summary/>

                    <div style={{ display: 'flex' }}>
                        <div className={classes.credtDebts}>
                            <Typography variant={'h4'}>Crédito</Typography>
                            {credits.map((credit, index) => (
                                <div className={classes.incluirCredit} key={index}>
                                    <TextField
                                        style={{ marginRight: "20px", width: '350px', marginBottom: '15px' }}
                                        label="Nome"
                                        name='name'
                                        value={credits[index].name}
                                        onChange={(e) => setCredits(prev => produce(prev, draft => {
                                            draft[index].name = e.target.value;
                                        }))}
                                    />
                                    <TextField
                                        style={{ marginRight: "20px", width: '350px', }}
                                        label="Valor"
                                        name='value'
                                        value={credits[index].value}
                                        onChange={(e) => setCredits(prev => produce(prev, draft => {
                                            if (!isNaN(Number(e.target.value))) {
                                                draft[index].value = Number(e.target.value);
                                            }
                                        }))}
                                    />
                                    <Paper style={{ marginLeft: '5px', backgroundColor: '#e99b0a', height: '50px' }}>
                                        <IconButton onClick={() => {

                                            setCredits(prev => [...prev, { name: prev[index].name, value: prev[index].value }])
                                        }} >
                                            <FileCopyIcon style={{ color: 'white' }} fontSize='small' />
                                        </IconButton>
                                    </Paper>
                                    <Paper style={{ backgroundColor: '#0e7001', marginLeft: '8px', height: '50px' }}>
                                        <IconButton onClick={() => {
                                            setCredits(prev => [...prev, { name: '', value: 0 }])
                                        }} >
                                            <AddIcon style={{ color: 'white' }} fontSize='small' />
                                        </IconButton>
                                    </Paper>
                                    <Paper style={{ backgroundColor: '#c20d0d', marginLeft: '8px', height: '50px' }}>
                                        <IconButton onClick={() => {
                                            if (credits.length !== 1) {
                                                removeFormFields(index)
                                            }

                                        }} >
                                            <DeleteIcon style={{ color: 'white' }} fontSize='small' />
                                        </IconButton>
                                    </Paper>
                                </div>
                            ))}


                        </div>
                        <div className={classes.credtDebts} style={{ marginLeft: '5vw' }}>
                            <Typography variant={'h4'}>Debitos</Typography>
                            {debts.map((credit, index) => (
                                <div className={classes.incluirCredit} key={index}>
                                    <TextField
                                        style={{ marginRight: "20px", width: '350px', marginBottom: '15px' }}
                                        label="Nome"
                                        name='name'
                                        value={debts[index].name}
                                        onChange={(e) => setDebts(prev => produce(prev, draft => {
                                            draft[index].name = e.target.value;
                                        }))}
                                    />
                                    <TextField
                                        style={{ marginRight: "20px", width: '350px', }}
                                        label="Valor"
                                        name='value'
                                        value={debts[index].value}
                                        onChange={(e) => setDebts(prev => produce(prev, draft => {
                                            if (!isNaN(Number(e.target.value))) {
                                                draft[index].value = Number(e.target.value);
                                            }
                                        }))}
                                    />
                                    <TextField
                                        style={{ marginRight: "20px", width: '350px', }}
                                        label="Status"
                                        name='status'
                                        value={debts[index].status}
                                        onChange={(e) => setDebts(prev => produce(prev, draft => {
                                            draft[index].status = (e.target.value);

                                        }))}
                                    />
                                    <Paper style={{ marginLeft: '5px', backgroundColor: '#e99b0a', height: '50px' }}>
                                        <IconButton onClick={() => {

                                            setDebts(prev => [...prev, { name: prev[index].name, value: prev[index].value, status: prev[index].status }])
                                        }} >
                                            <FileCopyIcon style={{ color: 'white' }} fontSize='small' />
                                        </IconButton>
                                    </Paper>
                                    <Paper style={{ backgroundColor: '#0e7001', marginLeft: '8px', height: '50px' }}>
                                        <IconButton onClick={() => {
                                            setDebts(prev => [...prev, { name: '', value: 0, status: '' }])
                                        }} >
                                            <AddIcon style={{ color: 'white' }} fontSize='small' />
                                        </IconButton>
                                    </Paper>
                                    <Paper style={{ backgroundColor: '#c20d0d', marginLeft: '8px', height: '50px' }}>
                                        <IconButton onClick={() => {
                                            if (debts.length !== 1) {
                                                removeFormFieldsDebts(index)
                                            }

                                        }} >
                                            <DeleteIcon style={{ color: 'white' }} fontSize='small' />
                                        </IconButton>
                                    </Paper>
                                </div>
                            ))}


                        </div>


                    </div>

                    <div>
                        <Button className={classes.button} variant="contained" color="primary" type="submit" >
                            Submit
                        </Button>
                        <Button className={classes.button} style={{ marginLeft: '5px' }} variant="contained" color="inherit" onClick={() => setValue(0)} >
                            Cancelar
                        </Button>
                    </div>
                </form>
            </Box>

            <Snackbar className={classes.alerta} open={openError} autoHideDuration={2500} onClose={handleCloseError} anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}>
                <Alert variant="filled" onClose={handleCloseError} severity="error">
                    Preencha todos os campos!
                </Alert>
            </Snackbar>

        </>
    );
}

export default BillingCyclesForm