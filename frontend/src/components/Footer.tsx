import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
    footer:{
        width: '100%',
        height: '9vh',
        display: 'flex',
        alignItems: 'center',
        position: "static",
        bottom: 0,
        paddingLeft: 15,
        borderTop: '1px solid #000'
    },
    textFooter:{
        font: 'small-caps bold 15px  Arial, Helvetica, sans-serif',
       
    }
    
}))
const Footer: React.FC = ()=>{
    const classes = useStyles();
    return(
        <div className={classes.footer}>
            <Typography className={classes.textFooter} >Copyright &copy; 2021</Typography>
        </div>
    )
}

export default Footer