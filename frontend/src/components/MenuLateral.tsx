import React from "react";
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import LocalAtmfrom from '@material-ui/icons/LocalAtm'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Drawer, IconButton, ListItem, makeStyles, Typography, useTheme } from "@material-ui/core";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { Link } from "react-router-dom";
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Collapse, Divider, List, ListItemIcon, ListItemText, } from "@material-ui/core";
import clsx from 'clsx';

type StatesProps = {
    openDrawer: boolean
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
    openList: boolean
    setOpenList: React.Dispatch<React.SetStateAction<boolean>>
    handleClick: () => void
    handleDrawerClose: () => void
    handleDrawerOpen: () => void

}


const drawerWidth = 260
const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',

    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbarDrawer: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        background: "#0594B0",
        height: 64,
    },
    toolbarDrawerPaper: {
        borderRight: 'none',
        backgroundColor: '#2D5361'
    },
    iconMoney: {
        marginRight: theme.spacing(1),
    },

    font: {
        fontFamily: 'Oswald',
        fontSize: 20,
    },
    text: {
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'Oswald',
        fontSize: 15,
        color: '#fff',
        padding: 4,

    },
    moneyText: {
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'Oswald',
        fontSize: 5,
        color: '#fff',
        padding: 4,
    },
    icon: {
        color: '#fff',


    },
    moneyIcon: {
        color: '#fff',
        display: 'flex',
        justifyContent: 'center'
    },
    link: {
        textDecoration: 'none',
    }
}))


const MenuLateral: React.FC<StatesProps> = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <div>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: props.openDrawer,
                    [classes.drawerClose]: !props.openDrawer,
                })}
                classes={{
                    paper: clsx(classes.toolbarDrawerPaper, {
                        [classes.drawerOpen]: props.openDrawer,
                        [classes.drawerClose]: !props.openDrawer,
                    }),
                }}
            >
                <div className={classes.toolbarDrawer}>
                    <LocalAtmfrom className={classes.iconMoney}></LocalAtmfrom>
                    <Typography className={classes.font}>
                        <b>My</b> Money
                    </Typography>
                    <IconButton onClick={props.handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <List >
                    {props.openDrawer ? (
                        <>
                            <ListItem button component={Link} to="/" >
                                <ListItemIcon className={classes.icon}>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText className={classes.text} >
                                    Dashboard
                                </ListItemText>
                            </ListItem>
                        </>
                    ) : (
                        <ListItem button onClick={props.handleDrawerOpen}>
                            <ListItemIcon className={classes.icon}>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText className={classes.text} >
                                Dashboard
                            </ListItemText>
                        </ListItem>
                    )}


                    <Divider />
                    {props.openDrawer ? (
                        <>
                            <ListItem button onClick={props.handleClick} className={classes.icon}>
                                <ListItemIcon className={classes.icon}>
                                    <VpnKeyIcon></VpnKeyIcon>
                                </ListItemIcon>
                                <ListItemText className={classes.text} >
                                    Cadastro
                                </ListItemText>
                                {!props.openList ? <ExpandLess className={classes.icon} /> : <ExpandMore className={classes.icon} />}
                            </ListItem >
                        </>

                    ) : (
                        <ListItem button onClick={props.handleDrawerOpen}>
                            <ListItemIcon className={classes.icon}>
                                <VpnKeyIcon></VpnKeyIcon>
                            </ListItemIcon>
                            <ListItemText className={classes.text} >
                                Cadastro
                            </ListItemText>
                        </ListItem>
                    )}
                    <Collapse in={!props.openList} timeout="auto" unmountOnExit >
                        <ListItem button component={Link} to="/billingCycles">
                            <ListItemIcon className={classes.moneyIcon}  >
                                <AttachMoneyIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText className={classes.moneyText} >
                                <Typography variant="subtitle2">Ciclos de Pagamentos</Typography>
                            </ListItemText>
                        </ListItem>
                    </Collapse>
                </List>
            </Drawer>

        </div>
    )
}
export default MenuLateral
