import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import React, { useEffect, useState } from "react";
import api from '../../dashboard/Axios'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
    },
    content: {
        width: '100%'
    },
    pageHeader: {
        display: 'flex',
        width: '100%'
    },
    valueBox: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        maxWidth: '100vw',
        marginTop: '4vh',
        flexGrow: 1,
    },
    textValue: {
        padding: '15px 0 10px 15px',
        color: '#fff'
    },
    textInfo: {
        padding: '8px 0 0 15px',
        color: '#fff'
    },
    textVersion: {
        display: 'flex',
        alignItems: 'end',
        paddingLeft: '15px',
        paddingBottom: '5px'
    },
    paper1: {
        display: 'flex',
        justifyContent: 'space-between',
        height: 150,
        width: 450,
        backgroundColor: '#21B85D'
    },
    paper2: {
        display: 'flex',
        justifyContent: 'space-between',
        height: 150,
        width: 450,
        backgroundColor: '#F6271A'
    },
    paper3: {
        display: 'flex',
        justifyContent: 'space-between',
        height: 150,
        width: 450,
        backgroundColor: '#0A78EB'
    },
    control: {
        padding: theme.spacing(2),
    },
}));

const Summary: React.FC = () => {

    const [credts, setCredits] = useState({ credit: 0, debt: 0 })

    useEffect(() => {
        api.get('/api/billingCycles/summary')
            .then((response) => setCredits(response.data))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, []);

    const classes = useStyles()
    return (
        <div className={classes.content}>
            <div className={classes.valueBox}>
                <Grid container className={classes.root} spacing={5}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={4}>
                            <Grid item>
                                <Paper className={classes.paper1}>
                                    <div >
                                        <Typography className={classes.textValue} variant={"h3"}>
                                           {credts.credit.toFixed(2)}
                                        </Typography>
                                        <Typography className={classes.textInfo}>
                                            Total de Créditos
                                        </Typography>
                                    </div>
                                    <AccountBalanceIcon style={{ fontSize: 90, margin: '30px 10px auto auto', opacity: 0.3 }}></AccountBalanceIcon>
                                </Paper>
                            </Grid>
                            <Grid item>
                                <Paper className={classes.paper2}>
                                    <div >
                                        <Typography className={classes.textValue} variant={"h3"}>
                                            {credts.debt.toFixed(2)}
                                        </Typography>
                                        <Typography className={classes.textInfo}>
                                            Total de Débitos
                                        </Typography>
                                    </div>
                                    <CreditCardIcon style={{ fontSize: 90, margin: '30px 10px auto auto', opacity: 0.3 }}></CreditCardIcon>
                                </Paper>
                            </Grid>
                            <Grid item>
                                <Paper className={classes.paper3}>
                                    <div >
                                        <Typography className={classes.textValue} variant={"h3"}>
                                            {(credts.credit - credts.debt).toFixed(2)}
                                        </Typography>
                                        <Typography className={classes.textInfo}>
                                            Valor Consolidado
                                        </Typography>
                                    </div>
                                    <LocalAtmIcon style={{ fontSize: 90, margin: '30px 10px auto auto', opacity: 0.3 }}></LocalAtmIcon>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div >
    )
}

export default Summary