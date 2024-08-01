'use client'
import { useGetProfileDataQuery, useUpdateProfileMutation } from '@/Redux/PharmacyAuthSlice/PharmacyAuthSlice'
import Button from '@/components/button/Button'
import Field from '@/components/inputFIeld/Field'
import ResponseToast from '@/components/toast/Toast'
import DashboardLayout from '@/layout/DLayout/DashboardLayout'
import { getCookie } from 'cookies-next'
import React, { useEffect, useState } from 'react'
import { FaFileUpload } from "react-icons/fa";
import { useSelector } from 'react-redux'

const page = () => {
    const userData = getCookie('digitalrx') ? JSON?.parse(getCookie('digitalrx')) : getCookie('digitalrx')
    const userID = userData?._id
    // console.log(userID);

    const text_color = useSelector((state) => state.theme.text_color);
    const bg_color = useSelector((state) => state.theme.bg_color);

    const { data } = useGetProfileDataQuery(userID, { skip: !userID })
    // console.log(data)
    const [lock, setLock] = useState(true)
    const [adminData, setAdminData] = useState({
        img: '',
        name: '',
        designation: '',
        phone_number: '',
        Buisness_email: '',
        address: '',
        location: '',
        password: '',
    })
    const { img, name, designation, phone_number, Buisness_email, address, location, password } = adminData
    useEffect(() => {
        setAdminData({
            img: "",
            name: data?.findUser?.name,
            designation: data?.findUser?.designation,
            phone_number: data?.findUser?.phone_number,
            Buisness_email: data?.findUser?.Buisness_email,
            address: data?.findUser?.address,
            location: data?.findUser?.location,
            password: data?.findUser?.password,
        })
    }, [data])

    const handleChange = (e) => {
        setAdminData({ ...adminData, [e.target.name]: e.target.value })
    }

    // Img Picker
    const handleImgPicker = (e) => {
        const imgFile = e.target.files[0]
        setAdminData({ ...adminData, img: imgFile })
    }

    const [updateProfile_data, { isLoading }] = useUpdateProfileMutation()
    const handleSubmit = async () => {
        // e.preventDefault();
        // if (img === "")

        try {
            const formData = new FormData();
            formData.append("name", name)
            formData.append("designation", designation)
            formData.append("phone_number", phone_number)
            formData.append("Buisness_email", Buisness_email)
            formData.append("location", location)
            formData.append("address", address)
            formData.append("password", password)
            formData.append("imageURL", img)
            formData.append("role", "Admin")

            const res = await updateProfile_data({
                userID: userID,
                data: formData,
            })
            // console.log(res);
            ResponseToast({ res: res })
            setLock(true)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <DashboardLayout>
            <div className='bg-white rounded-xl box_shadow_sec w-full h-fit p-4 '>
                <h1 className='p-4 text-4xl font-medium text-[#de8127] pt-14'> Profile </h1>

                <div className={`row_1 border--2 border-red-900 grid grid-cols-1 md:grid-cols-8 h--[10rem] pl-4`}>
                    <div className='border--2 border-purple-900 max-[400px]:w-[unset] w-[20rem] md:w-[unset] md:col-span-4 lg:col-span-3 flex flex-wrap items-center gap-4'>
                        <img src={data?.findUser?.profileImg} alt='img.png' className='w-[15rem] h-[10rem]' />
                        <div className='min-w-fit mt-2 lg:mt-0'>
                            <h2 className='text-lg text-[#de8127] font-normal'> Alfred Potts </h2>
                            <small className='text-base text-[#de8127] text-center md:text-left'> Super Admin </small>
                        </div>
                    </div>

                    <div className='border--2 border-purple-900 md:col-span-4 lg:col-span-5 flex items-center justify-center md:justify-end'>
                        <Button name={'Edit'} textColor={'text-white-color'} bgcolor={'bg-primary-color'} pClass={'w-fit justify-center'} mainClass={`mt-4 w-[90%] md:mt-0 md:w-[5rem] rounded-lg p-2 active:scale-95 ${lock === false ? 'hidden' : ''}`} onClick={() => setLock(false)} />
                    </div>
                </div>

                <div className='rw_2 border--2 border-red-600 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mb-5 p-4'>
                    <div className='md:col-span-2 lg:col-span-3'>
                        <h4 className='text-[#de8127] text-xl md:text-2xl font-semibold'> Personal Details </h4>
                    </div>

                    <div>
                        <label htmlFor='' className={text_color}>
                            Name
                        </label>
                        <Field placeHolder='First name' name={'name'} value={name || ""} disabled={lock === true ? true : false} onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor='' className={text_color}>
                            {' '}
                            Designation{' '}
                        </label>
                        <Field placeHolder='Designation' name={'designation'} value={designation || ""} disabled={lock === true ? true : false} onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor='' className={text_color}>
                            Contact number
                        </label>
                        <Field placeHolder='Contact number' name={'phone_number'} value={phone_number || ""} disabled={lock === true ? true : false} onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor='' className={text_color}>
                            Email
                        </label>
                        <Field placeHolder='Email' name={'Buisness_email'} value={Buisness_email || ""} disabled={lock === true ? true : false} onChange={handleChange} />
                    </div>

                    <div className='lg:col-span-2'>
                        <label htmlFor='' className={text_color}>
                            {' '}
                            Address{' '}
                        </label>
                        <Field placeHolder='Address' name={'address'} value={address || ""} disabled={lock === true ? true : false} onChange={handleChange} />
                    </div>
                    <div className=''>
                        <label htmlFor='' className={text_color}>
                            {' '}
                            Location{' '}
                        </label>
                        <Field placeHolder='Location' name={'location'} value={location || ""} disabled={lock === true ? true : false} onChange={handleChange} />
                    </div>

                    <div className='xl:col-span-1 lg:col-span-2 col-span-1'>
                        <label htmlFor='' className={text_color}>
                            {' '}
                            Password{' '}
                        </label>
                        <Field placeHolder='Password' name={'password'} value={password || ""} disabled={lock === true ? true : false} onChange={handleChange} />
                    </div>
                    <div className='flex items-end justify-center xl:col-span-1 lg:col-span-3 col-span-1'>
                        <label htmlFor='imgUpload' className={`text-[#fff] flex items-center justify-center gap-4 flex-row-reverse ${lock ? "bg-gray-300 cursor-not-allowed" : `${bg_color} cursor-pointer`} w-full py-2 rounded-xl`}>
                            <h3 className='text-2xl font-semibold'>
                                Upload Image
                            </h3>
                            <FaFileUpload size={32} />
                        </label>
                        <input type='file' className='hidden' id='imgUpload' disabled={lock === true ? true : false} onChange={handleImgPicker} />
                    </div>

                </div>
                <div className='border--2 border-purple-900 md:col-span-4 lg:col-span-5 flex items-center justify-center md:justify-end'>
                    <Button name={'Save'} textColor={'text-white-color'} bgcolor={'bg-primary-color'} pClass={'w-fit justify-center'} mainClass={`mt-4 w-[90%] md:mt-0 md:w-[5rem] rounded-lg p-2 active:scale-95 ${lock === true ? 'hidden' : ''} `} onClick={handleSubmit} isLoading={isLoading} />
                </div>
            </div>
        </DashboardLayout>
    )
}

export default page
