import React from "react";
import {Typography, Button, Card, CardActionArea, CardContent, CardMedia, CardActions}from '@material-ui/core';

import useStyle from './styles';

const CartItem=({item})=>{
    const classes=useStyle();
    return(
        <Card>
            <CardMedia image={item.media.source} alt='item' className={classes.media}/>
            <CardContent className={classes.cardContent}>
                <Typography variant="h4">{item.name}</Typography>
                <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cartActions}>
                <div className={classes.buttons} >
                  <Button type="button" size="small">-</Button>
                  <Typography>{item.quantity}</Typography>
                  <Button type="button" size="small">+</Button>  
                </div>
            </CardActions>
        </Card>
    )
}
export default CartItem;