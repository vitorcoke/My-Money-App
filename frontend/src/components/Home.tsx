import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'
import React, { useState } from "react";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import MenuLateral from "./MenuLateral";
import Main from "./Main";

type DarkProps = {
    setDarkMode: any,
    darkMode: boolean
}



const drawerWidth = 260
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    toobar: {
        borderLeft: 'none'
    },
    grow: {
        flexGrow: 1
    }
}));

const Home: React.FC<DarkProps> = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openList, setOpenList] = useState(true)

    const handleClick = () => {
        setOpenList(!openList)
    }

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: openDrawer,
                })}
            >
                <Toolbar className={classes.toobar}>
                    <IconButton
                        size='medium'
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: openDrawer,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className={classes.grow} />
                    <IconButton onClick={() => props.setDarkMode(!props.darkMode)}>
                        {theme.palette.type === 'dark' ? <Brightness4Icon /> : <Brightness7Icon />}
                    </IconButton>
                </Toolbar>
            </AppBar>
            <MenuLateral
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                openList={openList}
                setOpenList={setOpenList}
                handleClick={handleClick}
                handleDrawerClose={handleDrawerClose}
                handleDrawerOpen={handleDrawerOpen}
            />
            <Main></Main>

        </div>
    )
}

export default Home