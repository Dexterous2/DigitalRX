"use client"
import React, { useEffect, useState } from 'react'
import AuthLayout from '../../layout/AuthLayout'
import { useRouter } from 'next/navigation'
import Sign_up_one from '../../components/Sign-up-comp/Sign_up_1'
import Sign_up_two from '../../components/Sign-up-comp/Sign_up_2'
// import Sign_up_three from '../../components/Sign-up-comp/Sign_up_3'
import { useRegisterPharmacyMutation } from '@/Redux/PharmacyAuthSlice/PharmacyAuthSlice'
import ResponseToast from '@/components/toast/Toast'
import { setCookie } from 'cookies-next'


const page = () => {
    const [steps, setSteps] = useState(0);
    const [signup, setSignup] = useState({
        name: "",
        designation: "",
        phone_number: "",
        Buisness_email: "",
        location: "",
        address: "",
        password: "",
        role: "pharmacy"
    })
    const handleChangeSignup = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value })
    }

    const splitName = signup?.name?.split(" ")

    const router = useRouter();
    const [Signup_data, { isLoading }] = useRegisterPharmacyMutation();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (splitName?.length < 2 || splitName?.length > 2) {
                return ResponseToast({ message: "Please enter your full name. It should contain at least two, such as your first and last name." })
            }
            const res = await Signup_data(signup)
            if (!res.error) {
                setCookie('digitalrx', res?.data?.cookie)
                router.push("/login")
                setSignup({
                    name: "",
                    designation: "",
                    phone_number: "",
                    Buisness_email: "",
                    location: "",
                    address: "",
                    password: "",
                })
            }
            ResponseToast({ res })
        } catch (error) {
            console.log(error)
            ResponseToast({ message: "Error occured while loggin in" })
        }

    }

    return (
        <AuthLayout> 
            <div className='container sm:mx-auto px-4 flex items-center justify-around h-screen'>
                <img src="/image/main/auth_vector_2.png" className='h-auto xl:w-auto w-96 lg:ml-20 xl:ml-0 lg:flex hidden' />
                {
                    steps === 0 ?
                        <Sign_up_one title="Step 1" setSteps={setSteps} signup={signup} handleChangeSignup={handleChangeSignup} />
                        : steps === 1 ?
                            <Sign_up_two title="Step 2" setSteps={setSteps} signup={signup} handleChangeSignup={handleChangeSignup} handleSubmit={handleSubmit} isLoading={isLoading} />
                            :
                            // steps === 2 ?
                            //     <Sign_up_three title="Step 3" setSteps={setSteps} />
                            //     : 
                            null
                }
            </div>
        </AuthLayout>
    )
}

export default page;