import React from 'react';
import{Paper, Step, Stepper,StepLabel, Typography, CircularProgress, Divider, Button} from '@material-ui/core';

import useStyle from './style';

const Checkout =()=> {
    const classes=useStyle();
    return(
        <>
            <div className={classes.toolbar}/>
            <main className={classes.layout} >
                <Paper className={classes.paper} >
                    <Typography variant='h4' ></Typography>
                </Paper>
            </main>
        </>
    )
}
export default Checkout;