"use client"
import PaymentElement from '@/components/SubscribePackageStripe/StripePackage';
import DashboardLayout from '@/layout/DLayout/DashboardLayout';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'

const page = () => { 

    const stripePromis = loadStripe(`pk_test_51MtGgQJ8CQqp3LxfupUw8gK7n3sSJ8F9BbtScGkwvgr9K95hTLHCVVnoBsCzpPhT0NLrohwVgspG5e0P5YP0pw2Q00Z07Nk5OU`);

    const appearance = {
        theme: 'night',
        labels: 'hidden',
        variables: {
            color: 'grey',
            borderRadius: '50px',
            fontFamily: '--body-font-family: -apple-system, BlinkMacSystemFont, sans-serif',
            colorBackground: '#464646',
        },

    };

    return (
        <DashboardLayout>

            <div className='w-full flex justify-center items-center'>
                <div className='relative w-[600px] bg-primary-color text-white rounded-xl p-4 flex flex-col gap-8 h-fit overflow-auto'>
                    <Elements stripe={stripePromis} options={{ appearance }} >
                        <PaymentElement />
                    </Elements>
                </div>
            </div>
        </DashboardLayout>

    )
}

export default page