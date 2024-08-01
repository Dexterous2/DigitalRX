"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import AuthLayout from '../../layout/AuthLayout'
import Field from '../../components/inputFIeld/Field'
import { useRouter } from 'next/navigation'
import Button from '@/components/button/Button'
import ResponseToast from '@/components/toast/Toast'
// import { useLoginMutation } from '@/Redux/AuthSlice/AuthSlice'
import { useLoginPharmacyMutation } from '@/Redux/PharmacyAuthSlice/PharmacyAuthSlice'
import { setCookie } from 'cookies-next'

const page = () => {

    const [Login, setLogin] = useState({
        Buisness_email: "",
        password: ""
    })
     
    const { Buisness_email, password } = Login

    const handleChangelogin = (e) => {
        setLogin({ ...Login, [e.target.name]: e.target.value })
    }

    const router = useRouter();
    const [Login_data, {isLoading}] = useLoginPharmacyMutation();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await Login_data(Login)
            if(!res.error){
                setCookie('digitalrx', res?.data?.cookie)
                router.push("/dashboard")
            }
            ResponseToast({ res })
        } catch (error) {
            console.log(error)
            ResponseToast({ message: "Error occured while loggin in" })
        }
    }

    return (
        <AuthLayout isIcon={false}>
            <div className='container sm:mx-auto px-4 flex items-center justify-around h-screen'>
                <img src="/image/main/logo.png" className='h-auto xl:w-auto w-40 lg:ml-20 xl:ml-0 lg:flex hidden' />
                <form className='authForm bg-primary-color text-white w-fit xl:h-4/6 h-auto flex flex-col items-center gap-12 py-8 px-8 rounded-3xl justify-center' onSubmit={handleSubmit} >
                    <div className='bg-auth-form-bg flex flex-col gap-6 items-center py-10 bg-contain h-full justify-center bg-no-repeat bg-center w-full'>

                        <h1 className='text-3xl font-semibold mb-4'>Welcome Back</h1>
                        <div className='flex flex-col gap-4'>

                            <Field type='email' xl placeHolder="Email Address"
                                onChange={handleChangelogin}
                                name={"Buisness_email"}
                                value={Buisness_email}

                            />

                            <Field type='password' placeHolder="Password"
                                onChange={handleChangelogin}
                                name={"password"}
                                value={password}
                            />

                            <span className='flex justify-end'>
                                <p role='button' onClick={() => router.push('/forgot-password')} className='w-fit'>
                                    Forgot Password?
                                </p>
                            </span>

                        </div>

                        <div className='flex flex-col gap-4'>
                            <Button name={"Sign In"} isLoading={isLoading} />
                            <span>
                                <p>
                                    Don't have an account? <span className='font-bold cursor-pointer' onClick={() => router.push("/sign-up")}>
                                        Sign up
                                    </span>
                                </p>
                            </span>
                        </div>

                    </div>
                </form>
            </div>
        </AuthLayout>
    )
}

export default page