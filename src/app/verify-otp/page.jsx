"use client"
import React, { useEffect, useRef, useState } from 'react'
import AuthLayout from '../../layout/AuthLayout'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from 'next/navigation'
import style from './otp.module.css'
import Button from '@/components/button/Button';
import { useOtpVerifyMutation, useResendOtpMutation } from '@/Redux/PharmacyAuthSlice/PharmacyAuthSlice';

const page = () => {

    const [email, setEmail] = useState("")

    const inputRefs = useRef([]);

    const { userEmail } = history?.state;

    useEffect(() => {
        if (userEmail === '' || userEmail === undefined || userEmail === null) {
            return router.push('/forgot-password')
        } else {
            setEmail(userEmail)
        }
    }, [])

    const [otp, setOtp] = useState("");

    const router = useRouter()

    const handleOtpChange = (event, index) => {
        const { value } = event.target;

        if (isNaN(value) || value.length > 1) {
            return;
        }

        const otpArray = [...otp];
        otpArray[index] = value;
        const newOtp = otpArray.join("").slice(0, 6);
        setOtp(newOtp);

        if (value !== "") {
            const nextIndex = index + 1;
            if (inputRefs.current[nextIndex]) {
                inputRefs.current[nextIndex].focus();
            }
        }
    };

    const [otpVerify_data, { isLoading }] = useOtpVerifyMutation();
    const [resendOtp_data] = useResendOtpMutation();

    const handleNavigate = async (e) => {
        try {
            const res = await otpVerify_data({ Buisness_email: email, OtpCode: Number(otp) });
            ResponseToast({ res: res })
            if (!res.error) {
                history.pushState({ userEmail: email }, "", "/reset-password")
                router.push("/reset-password")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleResend = async (a) => {
        try {
            const res = await resendOtp_data({ Buisness_email: email });
            ResponseToast({ res: res })
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <AuthLayout>
            <div className='container sm:mx-auto px-4 flex items-center justify-around h-screen'>
                <img src="/image/main/auth_vector_1.png" className='h-auto xl:w-auto w-96 lg:ml-20 xl:ml-0 lg:flex hidden' alt='Otp Img' />
                <div className='bg-primary-color text-white w-fit xl:h-4/6 h-auto flex flex-col items-center gap-12 py-8 px-8 rounded-3xl justify-center relative' >

                    <div className='bg-auth-form-bg flex flex-col xl:gap-16 lg:gap-8 gap-4 items-center md:py-10 py-11 bg-cover h-full justify-center '>

                        {/* Back To Login */}

                        <div className='flex items-start w-full absolute top-4 left-4'>
                            <span className='flex items-center p-1 pr-3 cursor-pointer rounded-xl' style={{ background: "#06060642" }} onClick={() => router.push("/login")} >
                                <IoIosArrowRoundBack size={32} />
                                <p >Back to Login</p>
                            </span>
                        </div>

                        <div className='flex flex-col items-center'>
                            <h1 className='text-3xl font-semibold mb-4'>Enter OTP</h1>
                            <p className='text-center'>We have sent the 6-Digit OTP code your e-mail.</p>
                        </div>

                        <div className={`text-center pb-5 gap-2 flex w-full justify-between ${style.otp_Fields}`}>
                            {[...Array(6)].map((_, index) => (
                                <input
                                    className="w-16 h-14 rounded-lg text-black text-center outline-none"
                                    ref={(ref) => (inputRefs.current[index] = ref)}
                                    key={index + 1}
                                    type="number"
                                    value={otp[index] || ""}
                                    onChange={(event) => handleOtpChange(event, index)}
                                    maxLength={6}
                                />
                            ))}
                        </div>

                        <div className='flex flex-col gap-4 w-2/3'>
                            <Button name={"Verify"} isLoading={isLoading} onClick={handleNavigate} />
                            <Button name={"Resend Otp"} className={"text-white border-2 border-white"} bgcolor={'transparent'} isLoading={isLoading} onClick={handleResend} />
                        </div>

                    </div>
                </div>

            </div>
        </AuthLayout>
    )
}

export default page
