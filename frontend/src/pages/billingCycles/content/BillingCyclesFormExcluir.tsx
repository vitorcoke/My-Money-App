import React, { useContext, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Box, Button, Divider, Paper, Typography } from '@material-ui/core';
import api from '../../dashboard/Axios'
import ContextProvider from '../../../data/Context';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
        },
        button: {
            marginTop: '30px',
        },
        inputForm: {
            display: 'flex'
        },
        alerta: {
            marginTop: '80px'
        },
        titulo: {
            marginTop: '50px',
        },
        credtDebts: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        boxCredtis: {
            width: '700px',
            maxHeight:'30vh',
            overflow: 'auto'
        },
        boxDebts: {
            width: '700px',
            maxHeight:'30vh',
            overflow: 'auto'
            
        }
    }),
);

const BillingCyclesFormExcluir: React.FC = () => {
    const classes = useStyles();

    const [Id, setId] = useState('');
    const [name, setName] = useState('');
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);
    const { editValues, setValue, setOpenSucesso, credits, setCredits, debts } = useContext(ContextProvider)

    useEffect(() => {
        if (editValues) {
            setId(editValues.id)
            setName(editValues.name);
            setMonth(editValues.month);
            setYear(editValues.year);
            setCredits(editValues.credits)
        }
    }, [editValues, setCredits]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await api.delete(`/api/billingCycles/${Id}`, {

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
                        <TextField style={{ marginRight: "20px" }} fullWidth label="Nome" value={name} />
                        <TextField style={{ marginRight: "20px" }} fullWidth label="Mês" value={month} />
                        <TextField style={{ marginRight: "20px" }} fullWidth label="Ano" value={year} />
                        <Divider />
                    </div>
                    <div className={classes.credtDebts}>
                        <div className={classes.boxCredtis} >
                            <Typography variant={'h4'} className={classes.titulo}>Creditos</Typography>
                            {credits.map((credit, index) => (
                                <div key={credit._id} className={classes.inputForm} style={{ marginTop: '25px' }}>
                                    <TextField style={{ marginRight: "20px" }} fullWidth label="Nome" value={credit.name} />
                                    <TextField style={{ marginRight: "20px" }} fullWidth label="Valor" value={credit.value} />
                                    <Divider />
                                </div>
                            ))}
                        </div>
                        <div className= {classes.boxDebts}>
                            <Typography variant={'h4'} className={classes.titulo}>Debitos</Typography>
                            {debts.map((debts, index) => (
                                <div key={debts._id} className={classes.inputForm} style={{ marginTop: '25px' }}>
                                    <TextField style={{ marginRight: "20px" }} fullWidth label="Nome" value={debts.name} />
                                    <TextField style={{ marginRight: "20px" }} fullWidth label="Valor" value={debts.value} />
                                    <Divider />
                                </div>
                            ))}
                        </div>

                    </div>
                    <div>
                        <Button className={classes.button} style={{ backgroundColor: 'red' }} variant="contained" type="submit" >
                            Apagar
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

export default BillingCyclesFormExcluir