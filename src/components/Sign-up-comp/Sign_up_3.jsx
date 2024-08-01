import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { IoIosArrowRoundBack } from 'react-icons/io';
import Field from '@/components/inputFIeld/Field';
import Button from '@/components/button/Button';

const Sign_up_three = ({ setSteps }) => {

    const router = useRouter();

    const handleChange = async (e) => {
        await e.preventDefault()
    }

    return (
        <form className='authForm bg-primary-color text-white w-fit xl:h-4/6 h-auto flex flex-col items-center gap-12 py-8 px-8 rounded-3xl justify-center relative' onSubmit={handleChange} >
            <div className='bg-auth-form-bg flex flex-col gap-6 items-center xl:py-10 py-0 bg-contain h-full justify-center bg-no-repeat bg-center w-full'>


                {/* Back To Login */}

                <div className='flex items-start w-full absolute top-4 left-4'>
                    <span className='flex items-center p-1 pr-3 cursor-pointer rounded-xl' style={{ background: "#06060642" }} onClick={() => setSteps(1)} >
                        <IoIosArrowRoundBack size={32} />
                        <p >Back</p>
                    </span>
                </div>

                <div className='flex items-center flex-col'>
                    <h1 className='text-3xl font-semibold mb-4'>Sign Up</h1>
                    <p className='text-center'>Begin your journey through a quick three-step sign-up process!</p>
                </div>
                <div className='flex flex-col gap-4 w-full'>

                    <Field type='password' placeHolder="Password" />

                    <Field type='password' placeHolder="Password" />

                </div>

                <div className='flex flex-col gap-4  w-full px-6'>
                    <Button name={"Create Account"} onClick={() => router.push("/login")} />
                </div>
                
                <div className='flex gap-4 items-center justify-center'>
                    <span className='py-1 px-8 rounded-xl bg-transparent text-white border border-white'>1</span>
                    <span className='py-1 px-8 rounded-xl bg-transparent text-white border border-white'>2</span>
                    {/* <span className='py-1 px-8 rounded-xl bg-white text-primary-color'>3</span> */}
                </div>
            </div>
        </form>
    )
}

export default Sign_up_three
