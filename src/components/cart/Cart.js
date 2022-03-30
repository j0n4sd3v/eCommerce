import React from "react";
import {Container, Typography, Button, Grid} from '@material-ui/core';
import useStyle from './styles';
import CartItem from "./cartitem/CartItem";
import {Link }from 'react-router-dom'


const Cart=({cart,handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart})=>{
   
    const classes=useStyle();

    const EmptyCart=()=>(
        <>
            <Typography variant="subtitle1">You have no items in your shopping cart, start adding some! </Typography>
            <Typography component={Link} to='/' variant="subtitle1" className={classes.link}>Click to Add </Typography>
        </>

    )

    const FilledCart=()=>(
        <>
            <Grid container spacing={2}>
                {cart.line_items.map((item)=>(
                    <Grid item xs={12} sm={3} key={item.id}>
                        <CartItem 
                        item={item}
                        onUpdateCartQty={handleUpdateCartQty}
                        onRemoveFromCart={handleRemoveFromCart}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    )
    if(typeof cart.line_items==='undefined')return (
        <div>Loading...</div>
    )
    else
    return(
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant='h4' gutterBottom>Your shopping cart </Typography>
            { cart.total_items===0? <EmptyCart/>:<FilledCart/>}
            <div className={classes.cardDetails} >
                <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol} </Typography>
                <div>
                    <Button className={classes.emptyButton}size='large' type='button' variant="contained" color='secondary' onClick={handleEmptyCart}>Empty Cart</Button>
                    <Button className={classes.checkoutButton}size='large' type='button' variant="contained" color='primary'>Checkout</Button>
                </div>
            </div>
        </Container>
    )
}
export default Cart;