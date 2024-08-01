"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import AuthLayout from '../../layout/AuthLayout'
import { useRouter } from 'next/navigation'
import { IoIosArrowRoundBack } from 'react-icons/io'
import Button from '@/components/button/Button'
import Field from '@/components/inputFIeld/Field'
import { useForgetpassPharmacyMutation } from '@/Redux/PharmacyAuthSlice/PharmacyAuthSlice'
import { setCookie } from 'cookies-next'
import ResponseToast from '@/components/toast/Toast'

const page = () => {

    const router = useRouter();

    const [email, setEmail] = useState("");

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    const [forget_data,{isLoading}] = useForgetpassPharmacyMutation();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await forget_data({ email: email });
            ResponseToast({ res: res })
            if (!res.error) {
                history.pushState({ userEmail: email }, "", "/verify-otp");
                router.push('/verify-otp');
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AuthLayout>
            <div className='container sm:mx-auto px-4 flex items-center justify-around h-screen'>
                <img src="/image/main/auth_vector_1.png" className='h-auto xl:w-auto w-96 lg:ml-20 xl:ml-0 lg:flex hidden' alt='Otp Img' />
                <form onSubmit={handleSubmit} className='authForm bg-primary-color text-white w-fit xl:h-4/6 h-auto flex flex-col items-center gap-12 py-8 px-8 rounded-3xl justify-center relative'  >
                    <div className='bg-auth-form-bg flex flex-col gap-12 items-center py-10 bg-contain h-full justify-center bg-no-repeat bg-center w-full '>


                        {/* Back To Login */}

                        <div className='flex items-start w-full absolute top-4 left-4'>
                            <span className='flex items-center p-1 pr-3 cursor-pointer rounded-xl' style={{ background: "#06060642" }} onClick={() => router.back()} >
                                <IoIosArrowRoundBack size={32} />
                                <p >Back to Login</p>
                            </span>
                        </div>


                        <div className='flex flex-col gap-3'>

                            <h2 className='md:text-3xl text-2xl font-semibold text-center'>Forgot your password?</h2>

                            <p className='text-center p-0 m-0'>
                                Enter your email address and we will send you instructions to reset your password.
                            </p>
                        </div>

                        <div className='flex flex-col gap-4 w-full items-center'>
                            <Field type='email' xl placeHolder="Email Address" name={'email'} value={email} onChange={handleChange} />
                        </div>

                        <div className='flex flex-col gap-4'>
                            <Button name={"Forget Password"} isLoading={isLoading}/>
                        </div>

                    </div>
                </form>
            </div>
        </AuthLayout>
    )
}

export default page
