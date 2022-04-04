import React,{useState,useEffect} from 'react';
import{Paper, Step, Stepper,StepLabel, Typography, CircularProgress, Divider, Button} from '@material-ui/core';

import useStyle from './style';
import AddresForm from '../AddresForm';
import PaymentForm from '../PaymentForm';
import {commerce} from '../../../lib/commerce';

const steps=['Shipping addres','Payment details'];

const Checkout =({cart})=> {
    const classes=useStyle();
    const [activeStep,setActiveStep]=useState(0);
    const [token,setToken]=useState(null);

    useEffect(()=>{
        const generateToken=async()=>{
            try {
                const token=await commerce.checkout.generateToken(cart.id, {type:'cart'})
                setToken(token);
            } catch (error) {
                
            }
        }
        generateToken();
    },[cart]);

    const Confirmation=()=>(
        
        <div>Confirmation</div>
    );

    const Form=()=>(
        activeStep===0
        ?<AddresForm checkoutToken={token}/>
        :<PaymentForm/>
    )
    return(
        <>
          
          <div className={classes.toolbar}/>
            <main className={classes.layout} >
                <Paper className={classes.paper} >
                    <Typography variant='h4' align='center'></Typography>
                        <Stepper activeStep={activeStep} className={classes.stepper}>
                            {steps.map((step)=>(
                                <Step key={step}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    {activeStep===steps.length?<Confirmation/>:token&&<Form/>}
                </Paper>
            </main>
        </>
    )
}
export default Checkout;