import { makeStyles} from '@material-ui/core/styles';
import React from "react";
import Routers from "../Routes/routes";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        
        height: '91vh',
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    footer:{
        display: 'flex',
        bottom: 1
    },
    principalConteiner:{
        width: '100%'
    }

}))


const Main: React.FC = () =>{
    const classes = useStyles();
    return (
        <div className={classes.principalConteiner}>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Routers></Routers>
            </main>
            <Footer></Footer>
        </div>
    )
}

export default Main