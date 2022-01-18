import React, { useContext, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Box, Button, Divider, IconButton, Paper, Typography } from '@material-ui/core';
import api from '../../dashboard/Axios'
import ContextProvider from '../../../data/Context';
import produce from 'immer';
import AddIcon from '@material-ui/icons/Add';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete'
import Summary from './BillingCyclesSummary';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
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
        titulo: {
            marginTop: '30px',
        },
        incluirCredit: {
            display: 'flex',
        },
        credtDebts:{
            marginTop: '25px', 
            overflow: 'auto', 
            width: '35vw',
            maxHeight:'20vh'
        }
    }),
);

const BillingCyclesFormAlterar: React.FC = () => {
    const classes = useStyles();

    const [Id, setId] = useState('');
    const [name, setName] = useState('');
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);

    const { editValues, setValue, setOpenSucesso, credits, setCredits, setDebts, debts } = useContext(ContextProvider)

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

    useEffect(() => {
        if (editValues) {
            setId(editValues.id)
            setName(editValues.name);
            setMonth(editValues.month);
            setYear(editValues.year);
            setCredits(editValues.credits)
            setDebts(editValues.debts)
        }
    }, [editValues, setCredits, setDebts]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await api.put(`/api/billingCycles/${Id}`, {
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


        } catch (erro) {
            console.log(erro)
        }
    }

    return (
        <>
            <Box component={Paper} p={3}>
                <form className={classes.formContainer} onSubmit={handleSubmit} >
                    <div className={classes.inputForm}>
                        <TextField style={{ marginRight: "20px" }} fullWidth label="Nome" value={name} onChange={e => (setName(e.target.value))} />
                        <TextField style={{ marginRight: "20px" }} fullWidth label="Mês" value={month} onChange={e => setMonth(Number(e.target.value))} />
                        <TextField style={{ marginRight: "20px" }} fullWidth label="Ano" value={year} onChange={e => setYear(Number(e.target.value))} />
                        <Divider />
                    </div> 
                    <Divider />
                    <Summary></Summary>
                    <div style={{ display: 'flex' }}>
                        <div className={classes.credtDebts}>
                            <Typography variant={'h4'} className={classes.titulo}>Crédito</Typography>
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
                        <div className={classes.credtDebts} style={{marginLeft:'5vw'}}>
                            <Typography variant={'h4'} className={classes.titulo}>Debitos</Typography>
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
                                    <Paper style={{ marginLeft: '5px', backgroundColor: '#e99b0a', height: '50px' }}>
                                        <IconButton onClick={() => {

                                            setDebts(prev => [...prev, { name: prev[index].name, value: prev[index].value }])
                                        }} >
                                            <FileCopyIcon style={{ color: 'white' }} fontSize='small' />
                                        </IconButton>
                                    </Paper>
                                    <Paper style={{ backgroundColor: '#0e7001', marginLeft: '8px', height: '50px' }}>
                                        <IconButton onClick={() => {
                                            setDebts(prev => [...prev, { name: '', value: 0 }])
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
                            Enviar
                        </Button>
                        <Button className={classes.button} style={{ marginLeft: '5px' }} variant="contained" color="inherit" onClick={() => setValue(0)} >
                            Cancelar
                        </Button>
                    </div>
                </form>
            </Box>

        </>
    );
}

export default BillingCyclesFormAlterar
