import React,{useState} from 'react';
import{Paper, Step, Stepper,StepLabel, Typography, CircularProgress, Divider, Button} from '@material-ui/core';

import useStyle from './style';
import AddresForm from '../AddresForm';
import PaymentForm from '../PaymentForm';

const steps=['Shipping addres','Payment details']

const Checkout =()=> {
    const classes=useStyle();
    const [activeStep,setActiveStep]=useState(0);

    const Confirmation=()=>(
        
        <div>Confirmation</div>
    );

    const Form=()=>(
        activeStep===0
        ?<AddresForm/>
        :<PaymentForm/>
    )
    return(
        <>
            <div className={classes.toolbar}/>
            <main className={classes.layout} >
                <Paper className={classes.paper} >
                    <Typography variant='h4' align='center'></Typography>
                    <Stepper activeStep={activeStep}className={classes.stepper}>
                        {steps.map((step)=>(
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep===steps.length?<Confirmation/>:<Form/>}
                </Paper>
            </main>
        </>
    )
}
export default Checkout;