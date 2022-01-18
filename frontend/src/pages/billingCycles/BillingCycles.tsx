import { AppBar, Box, makeStyles, Snackbar, Tab, Tabs, Typography } from "@material-ui/core";
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useContext } from "react";
import BillingCyclesTabList from "./content/BillingCyclesTabList";
import BillingCyclesForm from "./content/BillingCyclesFormIncluir";
import ContextProvider from "../../data/Context";
import { Alert } from "@material-ui/lab";
import BillingCyclesFormAlterar from "./content/BillingCyclesFormAlterar";
import BillingCyclesFormExcluir from "./content/BillingCyclesFormExcluir";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
    },
    content: {
        width: '100%',
        position: 'relative'
    },
    pageHeader: {
        display: 'flex',
        width: '100%'
    },
    valueBox: {
        width: '100%',
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '10vh',
    },
    textVersion: {
        display: 'flex',
        alignItems: 'end',
        paddingLeft: '15px',
        paddingBottom: '1px',
        fontSize: '20px',
        opacity: '0.7'
    },
    appBar: {
        width: '80vw',
    },
    list: {
        width: '80vw',
        height: '60vh',
        padding: 0
    },
    itemTabs: {
        display: 'flex',
        justifyContent: 'space-around',
        visibility: "hidden"
    },
    alerta: {
        marginTop: '80px'
    }
}));

function TabPanel(props: TabPanelProps) {
    const { children, value, index } = props;
    return (
        <div
            hidden={value !== index}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}



const BillingCycles: React.FC = () => {

    const { value, openSucesso, setOpenSucesso, handleChange } = useContext(ContextProvider)

    const handleCloseSucesso = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        setOpenSucesso(false);
    };



    const classes = useStyles()

    const disabledExc = () => {
        if ((value === 0) || (value === 1)) {
            return true
        } else {
            return false
        }

    }
    const disabledList = () => {
        if ((value === 2) || (value === 3)) {
            return true
        } else {
            return false
        }

    }
    return (
        <div className={classes.content}>
            <div className={classes.pageHeader}>
                <Typography variant='h4'>
                    Ciclos de Pagamentos
                </Typography>
                <span className={classes.textVersion}>Cadastro</span>
            </div>
            <div className={classes.valueBox}>
                <AppBar position="static" className={classes.appBar} color={'primary'}>
                    <Tabs value={value} onChange={handleChange} variant="fullWidth">
                        <Tab label={<div style={{ display: 'flex', alignItems: 'center', visibility: (value === 2) || (value === 3) ? "hidden" : "visible" }}><ListIcon />Listar</div>} disabled={disabledList()} />
                        <Tab label={<div style={{ display: 'flex', alignItems: 'center', visibility: (value === 2) || (value === 3) ? "hidden" : "visible" }}><AddIcon />Incluir</div>} disabled={disabledList()} />
                        <Tab label={<div style={{ display: 'flex', alignItems: 'center', visibility: (value === 0) || (value === 1) ? "hidden" : "visible" }}><CreateIcon />Alterar</div>} disabled={disabledExc()} />
                        <Tab label={<div style={{ display: 'flex', alignItems: 'center', visibility: (value === 0) || (value === 1) ? "hidden" : "visible", }}><DeleteIcon />Excluir</div>} disabled={disabledExc()} />
                    </Tabs>
                </AppBar>
                <div className={classes.list}>
                    <TabPanel value={value} index={0}>
                        <BillingCyclesTabList />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <BillingCyclesForm />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <BillingCyclesFormAlterar/>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <BillingCyclesFormExcluir/>
                    </TabPanel>
                </div>

                <Snackbar className={classes.alerta} open={openSucesso} autoHideDuration={2500} onClose={handleCloseSucesso} anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}>
                    <Alert variant="filled" onClose={handleCloseSucesso} severity="success">
                        Enviado com sucesso!
                    </Alert>
                </Snackbar>
            </div>
        </div >
    )
}

export default BillingCycles