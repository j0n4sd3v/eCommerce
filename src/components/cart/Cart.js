import React from "react";
import {Container, Typography, Button, Grid} from '@material-ui/core';
import useStyle from './styles';
import CartItem from "./cartitem/CartItem";


const Cart=({cart})=>{
   
    const classes=useStyle();

    const EmptyCart=()=>(
        <Typography variant="subtitle1">You have no items in your shopping cart, start adding some! </Typography>
    )

    const FilledCart=()=>(
        <>
            <Grid container spacing={2}>
                {cart.line_items.map((item)=>(
                    <Grid item xs={12} sm={3} key={item.id}>
                        <CartItem item={item}/>
                    </Grid>
                ))}
            </Grid>
        </>
    )
    if(typeof cart.line_items==='undefined')return 'loading..';
    return(
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant='h4' gutterBottom>Your shopping cart </Typography>
            {cart.line_items.legth===0? <EmptyCart/>:<FilledCart/>}
            <div className={classes.cardDetails} >
                <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol} </Typography>
                <div>
                    <Button className={classes.emptyButton}size='large' type='button' variant="contained" color='secondary'>Empty Cart</Button>
                    <Button className={classes.checkoutButton}size='large' type='button' variant="contained" color='primary'>Checkout</Button>
                </div>
            </div>
        </Container>
    )
}
export default Cart;