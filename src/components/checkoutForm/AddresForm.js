import React,{useState, useEffect} from 'react';
import {InputLabel,Select,Grid,Typography,MenuItem,Button}from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './CustomTextField';
import {commerce} from '../../lib/commerce';

const AddresForm=({checkoutToken})=>{
    const [shippingCountries,setShippingCountries]=useState([]);
    const [shippingCountry,setShippingCountry]=useState('');
    const [shippingSubdivisions,setShippingSubdivisions]=useState([]);
    const [shippingSubdivision,setShippingSubdivision]=useState('');
    const [shippingOptions,setShippingOptions]=useState([]);
    const [shippingOption,setShippingOption]=useState('');

    const countries=Object.entries(shippingCountries).map(([code,name])=>({id:code,label:name}));
    
    
    const fetchShippingCountries=async (checkoutTokenId)=>{
        const {countries}= await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    } 
    useEffect(()=>{
        fetchShippingCountries(checkoutToken.id);
    },[])


    const methods=useForm();

    return(
        <>
            <Typography variant='h6' gutterBottom >Shipping Addres</Typography>
            <FormProvider {...methods}>
                <form onSubmit={'/'}>
                    <Grid container spacing={3}>
                        <FormInput required name='firstName' label='First Name'/>
                        <FormInput required name='lastName' label='Last Name'/>
                        <FormInput required name='addres1' label='Addres'/>
                        <FormInput required name='email' label='E-Mail'/>
                        <FormInput required name='city' label='City'/>
                        <FormInput required name='zip' label='ZIP/ Postal code'/>
                    
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e)=>setShippingCountry(e.target.value)}>
                               {countries.map((country)=>(
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                    </MenuItem>
                               ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={''} fullWidth onChange={''}>
                                <MenuItem key={''}>
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={''} fullWidth onChange={''}>
                                <MenuItem key={''}>
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                </form>
            </FormProvider>
        </>
    )
}

export default AddresForm;