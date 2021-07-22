import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './cart.css'
import { useTranslation } from "react-i18next";
import Photo from '../../photos/1.jpg'
import ClearIcon from '@material-ui/icons/Clear';
import { Button } from '@material-ui/core'
import Products from '../production/Products';
import { AddToCart, AddToWished, RemoveFromCart, RemoveFromWished, ChangeQuantity } from "../../redux/actions"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

function Cart() {
    const { t } = useTranslation()

    const { cartData, wishedData } = useSelector(state => state.CartReducer)
    const { addresses } = useSelector(state => state.AddressReducer)

    const dispatch = useDispatch()

    useEffect(() => {
    }, [])

    const handleCartedRemove = (id) => {
        dispatch(RemoveFromCart(id))
        cartData.find(item => id === item.id).quantity = 1
    }

    const handleWishedRemove = (id) => {
        dispatch(RemoveFromWished(id))
        wishedData.find(item => id === item.id).quantity = 1
    }

    const moveToWished = (id) => {
        dispatch(RemoveFromCart(id))
        dispatch(AddToWished(id))
    }

    const moveToCart = (id) => {
        dispatch(RemoveFromWished(id))
        dispatch(AddToCart(id))
    }

    const handleChange = (id, value) => {
        dispatch(ChangeQuantity(id, value))
        cartData.find(item => id === item.id).quantity = value
    }

    const total = () => {
        let sum = 0
        cartData.forEach(item => {
            let parsedPrice = parseInt(item.price.slice(0, -1))
            sum += item.quantity * parsedPrice
        })
        return sum
    }

    const onSubmit = (data) => {

    }
// დებილობა კომენტარი
    const schema = yup.object().shape({
        address: yup.string()
            .required('You should enter an address*'),
        code: yup.string()
            .matches(/^[0-9]{4}$/, 'A postal code must contain 4 digits*')
            .required('You should enter a postal code*'),
    })

    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    })

    return (
        <div className="shoppingCartPage">
            <div className="CartWishedDiv">
                <div className="cart">
                    <p style={{ fontSize: "30px", color: "#034488" }}>{t('Cart')}</p>
                    {cartData.length !== 0 ? cartData.map(item => {
                        return (
                            <div className="singleCartProduct">
                                <img src={item.photo} alt="" />
                                <div className="singleCartProductTitlePrice">
                                    <p>{item.title} - {item.category}</p>
                                    <p>Price: {item.price}</p>
                                </div>
                                <div className="singleCartProductNumberButton">
                                    <input onChange={(e) => handleChange(item.id, e.target.value)} defaultValue={item.quantity} type="number" min="1" step="number" max="5" placeholder="1" />
                                    <button onClick={() => moveToWished(item.id)} style={{ color: "#ccdde79f" }}>{t('Move to wish list')}</button>
                                </div>
                                <div>
                                    <p>Total amount: {item.quantity * parseInt(item.price.slice(0, -1))}₾</p>
                                </div>
                                <button onClick={() => handleCartedRemove(item.id)} className="clearButoonCart"><ClearIcon /></button>
                            </div>
                        )
                    }) : <p className="noproductsIncart">You don't have any products in your cart</p>}
                </div>
                <div className="wished">
                    <p style={{ fontSize: "30px", color: "#034488" }}>{t('Wish List')}</p>
                    {wishedData.length !== 0 ? wishedData.map(item => {
                        return (
                            <div className="singleCartProduct">
                                <img src={item.photo} alt="" />
                                <div className="singleCartProductTitlePrice">
                                    <p>{item.title} - {item.category}</p>
                                    <p>Price: {item.price}</p>
                                </div>
                                <div className="singleCartProductNumberButton">
                                    <div>quantity: {item.quantity}</div>
                                    <button onClick={() => moveToCart(item.id)} style={{ color: "#ccdde79f" }}>{t('Move to cart')}</button>
                                </div>

                                <div>
                                    <p>Total amount: {item.quantity * parseInt(item.price.slice(0, -1))}₾</p>
                                </div>
                                <button onClick={() => handleWishedRemove(item.id)} className="clearButoonCart"><ClearIcon /></button>
                            </div>
                        )
                    }) : <p className="noproductsIncart">You don't have favorite products yet</p>}
                </div>
            </div>
            <div className="subtotal">
                <p style={{ fontSize: "30px", color: "#034488", marginBottom: "40px" }}>Subtotal</p>
                <div className="subtotalCheckout">
                    <div className="subtotalCheckoutHorisontal">
                        <p>Items({cartData.length}):</p>
                        <p>{total()}₾</p>
                    </div>
                    <div className="subtotalCheckoutHorisontal">
                        <p>Delivery (2-4 working days):</p>
                        <p>5$</p>
                    </div>
                    <div className="subtotalCheckoutHorisontal">
                        <p style={{ fontWeight: "bold", fontSize: "30px" }}>Total:</p>
                        <p style={{ fontWeight: "bold" }}>{total() + 5}₾</p>
                    </div>
                    <div className="addressChooseCheckout">
                    <h4>Choose Address</h4>
                        <div className="subtotalCheckoutHorisontal">
                            {addresses.map(item => {
                                return (
                                    <>
                                        <label htmlFor={item.id}>{item.address}</label>
                                        {item.default == true ?
                                            <input defaultChecked type="radio" id={item.id} /> :
                                            <input type="radio" id={item.id} />}
                                    </>
                                )
                            })}
                        </div>
                        <div className="subtotalCheckoutHorisontal">
                            <label htmlFor="newone">Deliver to new address</label>
                            {addresses.length == 0 ?
                            <input defaultChecked type="radio" id="newone" /> :
                            <input type="radio" id="newone" />}
                        </div>
                    </div>
                    <form className="adressFormCheckout" onSubmit={handleSubmit(onSubmit)}>
                        <div className="addressFormInputs">
                            <p>{t('City')}</p>
                            <select name="city" id="city">
                                <option value="Tbilisi">Tbilisi</option>
                                <option value="Kutaisi">Kutaisi</option>
                                <option value="Rustavi">Rustavi</option>
                                <option value="Chiatura">Chiatura</option>
                            </select>
                        </div>
                        <div className="addressFormInputs" >
                            <p>{t('Address')}</p>
                            <input id="address" type="text" placeholder="Rustaveli ave. 132/a" {...register("address")} />
                            {errors.address && <p className="errorAdressFormInput">{errors.address?.message}</p>}
                        </div>
                        <div className="addressFormInputs">
                            <p>{t('Postal code')}</p>
                            <input id="code" type="text" placeholder="0001" {...register("code")} />
                            {errors.code && <p className="errorAdressFormInput">{errors.code?.message}</p>}
                        </div>
                        <div></div>
                        <Button type="submit" style={cartData.length == 0 ? { "opacity": "0.6", "cursor": " not-allowed", "width": "100%", "height": "50px" } : {}} variant="contained">Checkout</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Cart