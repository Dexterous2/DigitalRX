import React, { useState } from 'react'
import styles from "./payment.module.css";
import { AddressElement, CardCvcElement, CardElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Button from '../button/Button';
import { MdOutlineCancel } from "react-icons/md";
import { getCookie } from 'cookies-next';
import ResponseToast from '../toast/Toast';
import { useCreateDetailsQuery } from '@/Redux/PaymentSlice/PaymentSlice';

const PaymentElement = () => {
    // Styles
    const buttonStyle = {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        borderRadius: "50rem",
        backgroundColor: "white",
        color: "var(--primary-color)"
    }

    let style = {
        base: {
            color: 'black',
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
        }

    };

    const stripe = useStripe()
    const element = useElements()

    const userData = getCookie('digitalrx') ? JSON?.parse(getCookie('digitalrx')) : getCookie('digitalrx');

    console.log(userData)

    const userID = userData?._id



    const getCards = useCreateDetailsQuery(userID, {
        skip: !userID
    })


    console.log(getCards?.data?.card?.cardID, "========");

    const cardData = {
        number: getCards?.data?.card?.number,
        cvc: getCards?.data?.card?.cvc,
        exp_month: getCards?.data?.card?.exp_month,
        exp_year: getCards?.data?.card?.exp_year,
    }

    const savePaymentMethod = async () => {
        try {
            if (!stripe || !element) {
                return null
            }

            // const payment_method = await stripe.createPaymentMethod({
            //     type: 'card',
            //     card: getCards?.data?.card?.cardID
            // });

            // console.log(payment_method, "payment_method")
            
            const token = await stripe.createToken(getCards?.data?.card?.cardID)
            
            console.log(token, " token")


            // ResponseToast({ res });
            // setIsAddCard(false);
        } catch (error) {
            console.log(error)
            ResponseToast({ message: "Error While Saving Payment Method" })
        }
    }

    return (
        <div className={styles.paymentWrapper}>
            <div className={styles.cardWrapper}>
                <div>
                    <div className="flex items-center justify-center text-light mb-4">
                        <h2> Add your card </h2>
                    </div>
                    <p className='w-fit absolute top-4 right-4 cursor-pointer' onClick={() => setIsAddCard(false)}><MdOutlineCancel size={32} /></p>
                </div>
                <div className='flex flex-col gap-3'>
                    <div>
                        <label style={{ color: "white", paddingLeft: "0.5rem" }}>Card Number</label>
                        <div className={styles.stripe_fields}>
                            <CardNumberElement options={{ style: style }} />
                        </div>
                    </div>

                    <div className={` flex flex-col gap-2`}>
                        <div style={{ width: "100%" }}>
                            <label style={{ color: "white", paddingLeft: "0.5rem" }}>CVC</label>
                            <div className={styles.stripe_fields}>
                                <CardCvcElement options={{ style: style }} />
                            </div>
                        </div>
                        <div style={{ width: "100%" }}>
                            <label style={{ color: "white", paddingLeft: "0.5rem" }}>Expiry Date</label>
                            <div className={styles.stripe_fields}>
                                <CardExpiryElement options={{ style: style }} />

                            </div>
                        </div>
                    </div>

                    <div className={`flex justify-center ${styles.stripe_btn}`} >
                        <Button onClick={savePaymentMethod} isLoadingName={"Adding Card"} name={'Add Card'} style={buttonStyle} bgcolor={"bg-white"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentElement