import React,{useState,useEffect} from "react";
import { commerce } from "./lib/commerce";
import {Products, Navbar, Cart} from './components';
import {BrowserRouter as Router,Route,Routes }from 'react-router-dom'

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
        const carData=await commerce.cart.retrieve();
        setCart(carData);
    }
    const handleAddToCart= async (productId,quantity)=>{
        const item=await commerce.cart.add(productId,quantity);
        setCart(item.cart);
    }
   
    useEffect(()=>{
        fetchCart();
        fetchProducts();
    },[]);
    return (
        <Router>
            <div>
            <Navbar items={cart.total_items}/>  
                <Routes>
                    <Route exact path="/" element={<Products products={products} onAddToCart={handleAddToCart}/>}/>
                    <Route exact path="/cart" element={<Cart cart={cart}/>}/>        
                </Routes>
            </div>
        </Router>
    )
}
export default App;