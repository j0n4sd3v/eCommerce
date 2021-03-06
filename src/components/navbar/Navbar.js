import React from 'react';
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Typography} from '@material-ui/core';
import {CallMissedSharp, ShoppingCart} from '@material-ui/icons';
import { mergeClasses } from '@material-ui/styles';
import useStyles from './styles';
import Logo from '../../assets/store.png';
import {Link, useLocation} from 'react-router-dom';

const Navbar=({items})=>{
    const classes=useStyles();
    const location=useLocation();
    return(
        <div>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to='/' variant='h6'className={classes.title} color='inherit'>
                        <img src={Logo} alt='e-commerce' height='25px' className={classes.image}/>
                        E-COMMERCE
                    </Typography>
                    <div className={classes.grow}/>
                    {location.pathname==='/'&&(
                        <div>
                            <IconButton component={Link} to='/cart' aria-label='show cart items' color='inherit'>
                                <Badge badgeContent={items} color='secondary'>
                                    <ShoppingCart/>
                                </Badge>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default Navbar;