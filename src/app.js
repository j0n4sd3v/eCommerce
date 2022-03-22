import React,{useState,useEffect} from "react";
import { commerce } from "./lib/commerce";
import {Products, Navbar, Cart} from './components'

const App=()=>{
    const [products,setProducts]=useState([]);
    const [cart,setCart]=useState({});

    const fetchProducts=async()=>{
        try{
            const {data}=await commerce.products.list();
    
            setProducts(data);
        }
        catch(e){}
    }
    const fetchCart=async()=>{
        try{    
            setCart(await commerce.cart.retrieve());
        }
        catch(e){}
    }
    const handleAddToCart= async (productId,quantity)=>{
        const item=await commerce.cart.add(productId,quantity);
        setCart(item.cart);
    }
    useEffect(()=>{
        fetchProducts();
        fetchCart()
    },[]);
    console.log(cart);
    return (
        
        <div>
          <Navbar items={cart.total_items}/>  
          {/*<Products products={products} onAddToCart={handleAddToCart}/>*/}
          <Cart cart={cart}/>
        </div>
    
    )
}
export default App;