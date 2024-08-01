"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { IoIosArrowRoundBack } from 'react-icons/io';
import Field from '@/components/inputFIeld/Field';
import Button from '@/components/button/Button';

const Sign_up_one = ({ setSteps, signup, handleChangeSignup }) => {

    const router = useRouter();

    const handleChange = async (e) => {
        await e.preventDefault()
    }

    const { name, designation, phone_number, Buisness_email } = signup;

    return (
        <form className='authForm bg-primary-color text-white w-fit xl:h-4/6 h-auto flex flex-col items-center gap-12 py-8 px-8 rounded-3xl justify-center relative' onSubmit={handleChange} >
            <div className='bg-auth-form-bg flex flex-col gap-6 items-center xl:py-10 py-0 bg-contain h-full justify-center bg-no-repeat bg-center w-full'>
                <div className='flex items-center flex-col'>

                    <h1 className='text-3xl font-semibold mb-4'>Sign Up</h1>
                    <p className='text-center'>Begin your journey through a quick three-step sign-up process!</p>
                </div>
                <div className='flex flex-col gap-4'>

                    <div className='flex gap-4'>


                        <Field type='text' placeHolder="Your Name" name={"name"} value={name} onChange={handleChangeSignup} />

                        <Field type='text' placeHolder="Designation" name={'designation'} value={designation} onChange={handleChangeSignup} />

                    </div>

                    <Field type='number' placeHolder="Phone Number" name={'phone_number'} value={phone_number} onChange={handleChangeSignup} />
                    <div className='flex flex-col gap-1'>
                        <Field type='email' placeHolder="Business Email Address" name={'Buisness_email'} value={Buisness_email} onChange={handleChangeSignup} />
                        <p>*This will be your primary email for communication</p>
                    </div>
                </div>

                <div className='flex flex-col gap-4 w-full px-6'>
                    <Button name={"Continue"} onClick={() => setSteps(1)} />
                </div>
                <div className='flex gap-4 items-center justify-center'>
                    <span className='py-1 px-8 rounded-xl bg-white text-primary-color'>1</span>
                    <span className='py-1 px-8 rounded-xl bg-transparent text-white border border-white'>2</span>
                    {/* <span className='py-1 px-8 rounded-xl bg-transparent text-white border border-white'>3</span> */}
                </div>
            </div>
        </form>
    )
}

export default Sign_up_one
