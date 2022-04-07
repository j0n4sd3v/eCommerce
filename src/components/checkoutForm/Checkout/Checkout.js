import React,{useState,useEffect} from 'react';
import{Paper, Step, Stepper,StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline} from '@material-ui/core';

import useStyle from './style';
import AddresForm from '../AddresForm';
import PaymentForm from '../PaymentForm';
import {commerce} from '../../../lib/commerce';
import { Link, useHistory } from 'react-router-dom';

const steps=['Shipping addres','Payment details'];

const Checkout =({cart,order,onCaptureCheckout,error})=> {
    const classes=useStyle();
    const [activeStep,setActiveStep]=useState(0);
    const [token,setToken]=useState(null);
    const [shippingData,setShippingData]=useState({});
    const history=useHistory();

    useEffect(()=>{
        const generateToken=async()=>{
            try {
                const token=await commerce.checkout.generateToken(cart.id, {type:'cart'})
                setToken(token);
            } catch (error) {
                history.pushState('/');
            }
        }
        generateToken();
    },[cart]);

    const nextStep=()=>setActiveStep((prevActiveStep)=>prevActiveStep+1);
    
    const backStep=()=>setActiveStep((prevActiveStep)=>prevActiveStep-1);
    
    const next=(data)=>{
        setShippingData(data);
        nextStep();
    }

    let Confirmation=()=>order.customer?(
        <>
            <div>
                <Typography variant='h5'>Thanks for your purchase {order.customer.firstname} {order.customer.lastname}  </Typography>
                <Divider className={classes.divider}/>
                <Typography variant='subtitle2'>Order Ref: {order.customer_reference}</Typography>
                <br/>
                <Button component={Link} to={'/'} variant='outlined' type='button'>Back to Home</Button>
            </div>
        </>
    ):(
        <div className={classes.spinner}>
            <CircularProgress/>
        </div>
    )

    if(error){
        <>
            <Typography variant='h5'>Error: {error}</Typography>
            <br/>
            <Button component={Link} to={'/'} variant='outlined' type='button'>Back to Home</Button>
        </>
    }

    const Form=()=>(
        activeStep===0
        ?<AddresForm checkoutToken={token} next={next}/>
        :<PaymentForm shippingData={shippingData} checkoutToken={token} backStep={backStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep}/>
    )
    return(
        <>
          <CssBaseline/>
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