'use client'

import PharmacyTable from '@/components/Table/PharmacyTable/PharmacyTable'
import Button from '@/components/button/Button'
import Field from '@/components/inputFIeld/Field'
import PharmacyLayout from '@/layout/PharmacyLayout/PharmacyLayout'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { useGetProfileDataQuery } from '@/Redux/PharmacyAuthSlice/PharmacyAuthSlice'
import { useUpdateProfileMutation } from '@/Redux/PharmacyAuthSlice/PharmacyAuthSlice'
import { getCookie } from 'cookies-next'
import ResponseToast from '@/components/toast/Toast'
import { FaFileUpload } from 'react-icons/fa'

const page = () => {
    const [lock, setLock] = useState(true)
    const [button, setButton] = useState('hidden')
    const [edt_btn, set_edt_btn] = useState('')

    const handleButton = () => {
        setLock(false)
        setButton('')
        set_edt_btn('hidden')
    }

    const handleNavigate = () => {
        router.push('/pharmacy-profile/orders')
    }

    const userData = getCookie('digitalrx') ? JSON?.parse(getCookie('digitalrx')) : getCookie('digitalrx')
    const userID = userData?._id

    const { data } = useGetProfileDataQuery(userID, { skip: !userID })

    const [profile, setProfile] = useState({
        img: '',
        name: '',
        designation: '',
        phone_number: '',
        Buisness_email: '',
        address: '',
        location: '',
        password: '',
    })

    const { img, name, designation, phone_number, Buisness_email, address, location, password } = profile

    useEffect(() => {
        setProfile({


            img: '',
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
        setProfile({ ...profile, [e.target.name]: e.target.value })
    }

    // Img Picker
    const handleImgPicker = (e) => {
        const imgFile = e.target.files[0]
        setProfile({ ...profile, img: imgFile })
    }

    const [updateProfile_data, { isLoading }] = useUpdateProfileMutation()
    const handleSubmit = async () => {
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('designation', designation)
            formData.append('phone_number', phone_number)
            formData.append('Buisness_email', Buisness_email)
            formData.append('location', location)
            formData.append('address', address)
            formData.append('password', password)
            formData.append('imageURL', img)
            formData.append('role', 'pharmacy')

            const res = await updateProfile_data({
                userID: userID,
                data: formData,
            })
            ResponseToast({ res: res })
            setLock(true)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <PharmacyLayout isSearch={false}>
            <div className='border--2 border-[green] flex flex-col justify-between gap-8'>
                <div className='flex w-full justify-between items-center xl:flex-row flex-col xl:gap-0 gap-4'>
                    <div className='border--2 border-[green] flex sm:gap-4 gap-2 xl:flex-row flex-col items-center justify--center'>
                        <Image src='/image/dummy/pharmacy/pharmacyImg.png' width={300} height={300} alt='Pharmacy profile' />
                        <div className='border--2 border-[red] h-full py-2 flex justify-center sm:gap-6 gap-2'>
                                <h2 className='text-primary-color'>Sunrise Pharmacy</h2>
                        </div>
                    </div>
                    <div className={`flex gap-4 xl:flex-col sm:flex-row flex-col md:justify-start justify-center ${edt_btn}`}>
                        <Button
                            onClick={handleButton}
                            name='Edit Profile'
                            icon={<FaPlus />}
                            bgcolor='bg-primary-color'
                            textColor='text-white-color'
                            style={{
                                width: 'fit-content',
                                borderRadius: '50px',
                                paddingInline: '1rem',
                            }}
                        />
                    </div>
                </div>

                <div className='rw_2 border--2 h--full border-red-600 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mb-5 p-4'>
                    <div className='md:col-span-2 lg:col-span-3'>
                        <h4 className='text-[#de8127] text-xl md:text-2xl font-semibold'> Personal Details </h4>
                    </div>

                    <div>
                        <label htmlFor='' className='text-[#de8127]'>
                            Name
                        </label>
                        <Field placeHolder='First name' name={'name'} value={name || ""} disabled={lock === true ? true : false} onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor='' className='text-[#de8127]'>
                            {' '}
                            Designation{' '}
                        </label>
                        <Field placeHolder='Designation' name={'designation'} value={designation || ""} disabled={lock === true ? true : false} onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor='' className='text-[#de8127]'>
                            Contact number
                        </label>
                        <Field placeHolder='Contact number' name={'phone_number'} value={phone_number || ""} disabled={lock === true ? true : false} onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor='' className='text-[#de8127]'>
                            Email
                        </label>
                        <Field placeHolder='Email' name={'Buisness_email'} value={Buisness_email || ""} disabled={lock === true ? true : false} onChange={handleChange} />
                    </div>

                    <div className='lg:col-span-2'>
                        <label htmlFor='' className='text-[#de8127]'>
                            {' '}
                            Address{' '}
                        </label>
                        <Field placeHolder='Address' name={'address'} value={address || ""} disabled={lock === true ? true : false} onChange={handleChange} />
                    </div>

                    <div className=''>
                        <label htmlFor='' className='text-[#de8127]'>
                            {' '}
                            Location{' '}
                        </label>
                        <Field placeHolder='Location' name={'location'} value={location || ""} disabled={lock === true ? true : false} onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor='' className='text-[#de8127]'>
                            {' '}
                            Password{' '}
                        </label>
                        <Field placeHolder='Password' name={'password'} value={password || ""} disabled={lock === true ? true : false} onChange={handleChange} />
                    </div>
                    <div className='flex items-end justify-center'>
                        <label htmlFor='imgUpload' className={`text-[#fff] flex items-center justify-center gap-4 flex-row-reverse ${lock ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#de8127] cursor-pointer'} w-full py-2 rounded-xl`}>
                            <h3 className='text-2xl font-semibold'>Upload Image</h3>
                            <FaFileUpload size={32} />
                        </label>
                        <input type='file' className='hidden' id='imgUpload' disabled={lock === true ? true : false} onChange={handleImgPicker} />
                    </div>
                </div>

                <div className={`w-full flex justify-end gap-3 ${button}`}>
                    <div className='flex gap-4 xl:flex-col sm:flex-row flex-col md:justify-start justify-center'>
                        <Button
                            onClick={() => {
                                setLock(true)
                                setButton('hidden')
                                set_edt_btn('')
                                handleSubmit()
                            }}
                            name='Save'
                            bgcolor='bg-primary-color'
                            textColor='text-white-color'
                            isLoading={isLoading}
                            style={{
                                width: 'fit-content',
                                borderRadius: '50px',
                                paddingInline: '1rem',
                            }}
                        />
                    </div>
                    <div className='flex gap-4 xl:flex-col sm:flex-row flex-col md:justify-start justify-center'>
                        <Button
                            onClick={() => {
                                setLock(true)
                                setButton('hidden')
                                set_edt_btn('')
                            }}
                            name='Cancel'
                            bgcolor='bg-primary-color'
                            textColor='text-white-color'
                            style={{
                                width: 'fit-content',
                                borderRadius: '50px',
                                paddingInline: '1rem',
                            }}
                        />
                    </div>
                </div>
            </div>
        </PharmacyLayout>
    )
}

export default page
