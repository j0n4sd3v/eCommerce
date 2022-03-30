import React from "react";
import {Typography, Button, Card, CardContent, CardMedia, CardActions}from '@material-ui/core';

import useStyle from './styles';

const CartItem=({item, onUpdateCartQty, onRemoveFromCart})=>{
    const classes=useStyle();
    
    return(
        <Card className={classes.card} >
            <CardMedia  image={item.image.url} alt='item' className={classes.media}/>
            <CardContent className={classes.cardContent}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="h6">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cartActions}>
                <div className={classes.buttons} >
                  <Button type="button" size="small" onClick={()=>onUpdateCartQty(item.id,item.quantity-1)}>-</Button>
                  <Typography variant="body1">{item.quantity}</Typography>
                  <Button type="button" size="small" onClick={()=>onUpdateCartQty(item.id,item.quantity+1)}>+</Button>  
                </div>
                <Button variant="contained" type="button" color="secondary" size="small"onClick={()=>onRemoveFromCart(item.id)}>Remove</Button>  
            </CardActions>
        </Card>
    )
}
export default CartItem;