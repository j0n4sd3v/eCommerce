import React,{useState,useEffect} from "react";
import { commerce } from "./lib/commerce";
import {Products, Navbar, Cart, Checkout} from './components';
import {BrowserRouter as Router,Route,Routes }from 'react-router-dom'

const App=()=>{
    const [products,setProducts]=useState([]);
    const [cart,setCart]=useState({});
    const [order,setOrder]=useState({});
    const [errorMessage,setErrorMessage]=useState('');

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
    const handleUpdateCartQty= async (productId,quantity)=>{
        const response= await commerce.cart.update(productId,{quantity});

        setCart(response.cart);
    }
    const handleRemoveFromCart= async (productId)=>{
        const response= await commerce.cart.remove(productId);

        setCart(response.cart);
    }
    const handleEmptyCart=async ()=>{
        const response= await commerce.cart.empty();

        setCart(response.cart);
    }
    const refreshCart=async()=>{
        const newCart=await commerce.cart.refresh();
        setCart(newCart);
    }

    const handleCaptureCheckout=async(checkoutTokenId,newOrder)=>{
        try {
            const incomingOrder=await commerce.checkout.capture(checkoutTokenId,newOrder);
            
            setOrder(incomingOrder);
            refreshCart();
        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
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
                    <Route exact path="/cart" element={<Cart 
                        cart={cart} 
                        handleUpdateCartQty={handleUpdateCartQty}
                        handleRemoveFromCart={handleRemoveFromCart}
                        handleEmptyCart={handleEmptyCart}
                    />}/>  
                    <Route exact path="/Checkout" element={<Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />}/>      
                </Routes>
            </div>
        </Router>
    )
}
export default App;