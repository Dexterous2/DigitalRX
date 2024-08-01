'use client'

import Button from '@/components/button/Button'
import Field from '@/components/inputFIeld/Field'
import PharmacyLayout from '@/layout/PharmacyLayout/PharmacyLayout'
import React, { useState } from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { MdHome } from 'react-icons/md'
import { getCookie } from 'cookies-next'
import { useParams, useRouter } from 'next/navigation'
import { useGetUserProfileQuery } from '@/Redux/AuthSlice/AuthSlice'
import ModalComp from '@/components/modal/Modal'
import { useCreateOrderMutation, useGetOrdersByUserQuery } from '@/Redux/OrderSlice/OrderSlice'
import ResponseToast from '@/components/toast/Toast'
import { PatientOrderTable } from '@/components/patient_order_table/PatientOrderTable'
import TableSkeleton from '@/components/skeleton/tables/TableSkeleton'
import { useSelector } from 'react-redux'

const page = () => {
    const userData = getCookie('digitalrx') ? JSON?.parse(getCookie('digitalrx')) : getCookie('digitalrx')

    const { id: userID } = useParams()

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const closeModal = () => {
        setModalIsOpen(false)
    }
    const handelModal = () => {
        setModalIsOpen(true)
    }

    const userOrder = useGetOrdersByUserQuery(userID, { skip: !userID })
    const orderByUser = userOrder?.data?.orders
    const getTableSkeleton = userOrder.isLoading
    // console.log(orderByUser?.length);

    const { data } = useGetUserProfileQuery(userID, { skip: !userID })
    const phrmaID = userData?._id

    const [order, setOrder] = useState({
        user_id: userID || "",
        Pharmacy_id: phrmaID || "",
        Prescription: '' || "",
        price: '' || "",
        order_status: 'Completed',
        created_by: 'Pharmacy',
    })
    const { user_id, Pharmacy_id, Prescription, price, order_status, created_by } = order
    const handelChange = (e) => {
        e.preventDefault()
        const { name, value, files } = e.target
        const newValue = name === 'Prescription' ? files[0] : value
        setOrder({ ...order, [name]: newValue })
    }

    // create direct order api
    const [createOrderData, { isLoading }] = useCreateOrderMutation()
    const handelSubmit = async () => {
        try {
            const formData = new FormData()
            formData.append('user_id', user_id)
            formData.append('Pharmacy_id', Pharmacy_id)
            formData.append('Prescription', Prescription)
            formData.append('price', price)
            formData.append('order_status', order_status)
            formData.append('created_by', created_by)

            const res = await createOrderData({ user_id: userID, data: formData })
            ResponseToast({ res })
        } catch (error) {
            console.log(error)
        }
    }

    const tableHead = [
        {
            head: 'Order ID',
            className: 'w-fit text-center',
        },
        {
            head: 'Date',
            className: 'w-fit text-center',
        },
        {
            head: 'Order Type',
            className: 'w-fit text-center',
        },
        {
            head: 'Payment',
            className: 'w-fit text-center',
        },
        {
            head: 'Order Status',
            className: 'w-fit text-center',
        },
    ]

    const text_color = useSelector((state) => state.theme.text_color);

    return (
        <PharmacyLayout isReference headingName={'Patients'} isSearch={false}>
            <ModalComp isOpen={modalIsOpen} closeModal={closeModal} handelChange={handelChange} order={order} handelSubmit={handelSubmit} isLoading={isLoading} />
            <div className='bg-white rounded-xl w-full h-fit'>
                <div className={`row_1 border--2 border-red-900 grid grid-cols-1 md:grid-cols-8 h--[10rem]`}>
                    <div className='border--2 border-purple-900 max-[400px]:w-[unset] w-[20rem] md:w-[unset] md:col-span-4 lg:col-span-3 flex flex-col flex-wrap items-start justify--start ms-3'>
                        <img src={data?.profileImg} alt='img.png' className='min-w-[12rem] h-[12rem] rounded-xl object-cover' />
                        <div className='min-w-fit mt-2 lg:mt-3 flex flex-col gap-4'>
                            <h2 className={`text-lg ${text_color} font-normal`}>{data?.name}</h2>
                            <span className='h-full flex flex-col justify-between gap-2'>
                                <span className='flex gap-2 items-center text-[#969696]'>
                                    <FaPhoneAlt className='text-primary-color' />
                                    <p>
                                        {data?.phone_number}
                                    </p>
                                </span>
                                <span className='flex gap-2 items-center text-[#969696]'>
                                    <MdHome className='text-primary-color' />
                                    <p>
                                        {data?.address}
                                    </p>
                                </span>
                            </span>
                        </div>
                    </div>

                    <div className='border--2 border-purple-900 md:col-span-4 lg:col-span-5 flex items-center justify-center md:justify-end'>
                        <Button name={'Direct Order By Pharmacy'} textColor={'text-white-color'} bgcolor={'bg-primary-color'} pClass={'w-fit justify-center'} mainClass={`mt-4 w-[90%] md:mt-0 md:w-[14rem] rounded-lg p-2 active:scale-95`} onClick={handelModal} />
                    </div>
                </div>

                <div className='rw_2 border--2 border-red-600 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mb-5 p-4'>
                    <div className='md:col-span-2 lg:col-span-3'>
                        <h4 className={`${text_color} text-xl md:text-2xl font-semibold`}> Personal Details </h4>
                    </div>

                    <div>
                        <label htmlFor='' className={text_color}>
                            Name
                        </label>
                        <Field placeHolder='First name' value={data?.name || ""} disabled={true} />
                    </div>
                    <div>
                        <label htmlFor='' className={text_color}>
                            Contact number
                        </label>
                        <Field placeHolder='Contact number' value={data?.phone_number || ""} disabled={true} />
                    </div>

                    <div>
                        <label htmlFor='' className={text_color}>
                            Email
                        </label>
                        <Field placeHolder='Email' value={data?.email || ""} disabled={true} />
                    </div>
                    <div className='lg:col-span-3'>
                        <label htmlFor='' className={text_color}>
                            {' '}
                            Address{' '}
                        </label>
                        <Field placeHolder='Address' value={data?.address || ""} disabled={true} />
                    </div>
                </div>

                {getTableSkeleton ? Array.from({ length: 5 }).map((item_, i) =>
                    <React.Fragment key={i}>
                        <TableSkeleton />
                    </React.Fragment>
                ) : <PatientOrderTable tableHead={tableHead} patient_table_data={orderByUser} length_={orderByUser?.length} />}
            </div>
        </PharmacyLayout>
    )
}

export default page
