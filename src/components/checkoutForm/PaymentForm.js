import React from 'react';
import {Typography,Divider,Button} from '@material-ui/core';
import {Elements,CardElement,ElementsConsumer}from '@stripe/react-stripe-js';
import {loadStripe}from '@stripe/stripe-js';
import Review from './Checkout/Review';

const PaymentForm=({shippingData,checkoutToken})=>{
    return(
        <>
            <Review checkoutToken={checkoutToken}/>
        </>
    )
}
export default PaymentForm;