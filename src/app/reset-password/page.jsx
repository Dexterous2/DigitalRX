"use client"
import React, { useEffect, useState } from 'react'
import AuthLayout from '../../layout/AuthLayout'
import { useRouter } from 'next/navigation'
import { IoIosArrowRoundBack } from 'react-icons/io'
import Field from '@/components/inputFIeld/Field'
import Button from '@/components/button/Button'
import { useResetPassMutation } from '@/Redux/PharmacyAuthSlice/PharmacyAuthSlice'
 
const page = () => {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const { userEmail } = history?.state;
    console.log(userEmail)


    useEffect(() => {
        if (userEmail === '' || userEmail === undefined || userEmail === null) {
            return router.push('/forgot-password')
        } else {
            setEmail(userEmail)
        }
    }, [])

    const [password, setPassword] = useState({
        pass: '',
        cPass: ''
    });

    const { pass, cPass } = password;
    const handleChange = (e) => {
        e.preventDefault()
        setPassword({ ...password, [e.target.name]: e.target.value })
    }

    const [resetPass_data, {isLoading}] = useResetPassMutation();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await resetPass_data({ Buisness_email: email, password: pass, confirmPassword: cPass});
            ResponseToast({ res: res })
            if (!res.error) {
                router.push("/login")
            }
        } catch (error) {
            console.log(error);
        }


    }

    return (
        <AuthLayout>
            <div className='container sm:mx-auto px-4 flex items-center justify-around h-screen'>
                <img src="/image/main/auth_vector_1.png" className='h-auto xl:w-auto w-96 lg:ml-20 xl:ml-0 lg:flex hidden' alt='Otp Img' />
                <form className='bg-primary-color text-white w-fit h-auto flex flex-col items-center sm:gap-12 gap-0 py-8 sm:px-8 px-4 rounded-3xl justify-center authForm relative' onSubmit={handleSubmit}>

                    <div className='bg-auth-form-bg flex flex-col xl:gap-16 gap-4 items-center xl:py-24 py-16 bg-cover h-full justify-center w-full'>
                        <div className='flex items-start w-full absolute top-4 left-4'>
                            <span className='flex items-center p-1 pr-3 cursor-pointer rounded-xl' style={{ background: "#06060642" }} onClick={() => router.push("/login")} >
                                <IoIosArrowRoundBack size={32} />
                                <p >Back to Login</p>
                            </span>
                        </div>
                        <div className='flex flex-col items-center'>
                            <h1 className='text-3xl font-semibold mb-4 capitalize text-center'>reset your password</h1>
                            <p className='text-center'>Enter your new password</p>
                        </div>
                        <div className='flex flex-col gap-4 w-full'>

                            <Field type='password' placeHolder="Enter Your Password" name={"pass"} value={pass} onChange={handleChange} />

                            <Field type='password' placeHolder="Conform Password" name={"cPass"} value={cPass} onChange={handleChange} />

                        </div>

                        <div className='flex flex-col px-10 gap-4 w-full items-center'>
                            <Button name={"Continue"} isLoading={isLoading} />
                        </div>

                    </div>
                </form>
            </div>
        </AuthLayout>
    )
}

export default page
