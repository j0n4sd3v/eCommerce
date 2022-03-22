import React from "react";
import{ Grid }from '@material-ui/core';
import Product from './product/Product';

const products=[
    {id:1,name:"Shoes",description:"shoes for run",price:'€12',image:"https://rukminim2.flixcart.com/image/714/857/shoe/a/z/j/buwch-58-39-buwch-blue-original-imaergp5ezmcbj3d.jpeg?q=5"},
    {id:2,name:"macBook",description:"portatil",price:'€30',image:"https://m.media-amazon.com/images/I/71TPda7cwUL._AC_SX569_.jpg"},
    {id:3,name:"mate",description:"mate clasico",price:'€5',image:"https://okdiario.com/img/2021/02/25/mate-bebida-655x368.jpg"}
]
const Products=()=>{
    return(
        <main>
            <Grid container justify="center" spacing={4}>
                {products.map((product)=>(
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product}/>
                    </Grid>
                 ))}
            </Grid>
        </main>
    )
}
export default Products;