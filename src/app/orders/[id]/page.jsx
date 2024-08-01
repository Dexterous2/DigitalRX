"use client"
import { useGetOrdersByPharmacyQuery } from '@/Redux/OrderSlice/OrderSlice'
import { usePharmacyProfileDataQuery } from '@/Redux/PharmacyAuthSlice/PharmacyAuthSlice'
import PharmacyTable from '@/components/Table/PharmacyTable/PharmacyTable'
import OrdersSkeleton from '@/components/skeleton/orders/OrdersSkeleton'
import PharmacyLayout from '@/layout/PharmacyLayout/PharmacyLayout'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { GoClockFill } from 'react-icons/go'
import { IoIosMail } from 'react-icons/io'
import { MdHome } from 'react-icons/md'

const page = () => {
    const [filterOrder, setFilterOrder] = useState("")
    const [orderData, setOrderData] = useState([])
    const TableHead = [
        {
            head: "Patient Name",
            isStart: true
        },
        {
            head: "Refills"
        },
        {
            head: "Order Type",
        },
        {
            head: "Order Date",
        },
    ]

    const handleNavigate = () => {
        router.push('/pharmacy-profile/orders')
    }

    const { id } = useParams()

    // Get Pharmacy Profile
    const getPharmacyProfile = usePharmacyProfileDataQuery(id, { skip: !id })
    const getPharmacyProfileData = getPharmacyProfile?.data?.findUser

    // Get Pharmacies Orders
    const getPharmacyOrders = useGetOrdersByPharmacyQuery(id, { skip: !id })
    const getPharmacyOrdersData = getPharmacyOrders?.data?.orders
    const getPharmacyOrdersLoading = getPharmacyOrders?.isLoading

    // Convert Data
    const convertData = (originalData) => {
        const data = originalData?.filter(item => item?.user_id?.name?.toLowerCase()?.includes(filterOrder?.toLowerCase()))?.map(item => {
            return {
                id: item?._id,
                Order_by: item?.user_id?.name,
                Refills: "12",
                Order_Type: item?.Order_type?.[0],
                transaction_date: new Date(item?.createdAt)?.toLocaleDateString('en-US'),
            };
        });
        setOrderData(data)
    };
 
    useEffect(() => {
        convertData(getPharmacyOrdersData)
    }, [getPharmacyOrdersData, filterOrder])

    return (
        <PharmacyLayout headingName={"Orders"} isSearch={false}>
            <div className='flex flex-col gap-8'>
                <div className='flex w-full justify-between xl:flex-row flex-col xl:gap-0 gap-4'>
                    <div className='flex sm:gap-4 gap-2 md:flex-row flex-col md:items-start items-center'>
                        <Image src={getPharmacyProfileData?.profileImg || "/image/main/prof_img.png"} width={300} height={300} alt='Pharmacy profile' className='w-[10rem] h-[10rem] rounded-xl' />
                        <div className='py-2 flex flex-col sm:gap-6 gap-2'>
                            <span className='flex gap-2 items-center sm:flex-row flex-col'>
                                <h2 className='text-primary-color'>{getPharmacyProfileData?.name}</h2>

                            </span>
                            <span className='h-full flex flex-col justify-between'>
                                <p className='flex gap-2 items-center text-[#969696]'>
                                    <IoIosMail className='text-primary-color' />
                                    {getPharmacyProfileData?.Buisness_email}</p>
                                <p className='flex gap-2 items-center text-[#969696]'>
                                    <FaPhoneAlt className='text-primary-color' />
                                    {getPharmacyProfileData?.phone_number}</p>
                                <p className='flex gap-2 items-center text-[#969696]'>
                                    <MdHome className='text-primary-color' />
                                    {getPharmacyProfileData?.address}</p>
                                <p className='flex gap-2 items-center text-[#969696]'>
                                    <GoClockFill className='text-primary-color' />
                                    Subscriptions ends on 18 Jan 2025</p>
                            </span>
                        </div>
                    </div>
                </div>
                {getPharmacyOrdersLoading ? <OrdersSkeleton /> :
                    <PharmacyTable head={TableHead} data={orderData} yHeight="h-[50vh]" tableHeading="Pharmacies Orders" filterOrder={filterOrder} setFilterOrder={setFilterOrder} />
                }
            </div>
        </PharmacyLayout>
    )
}

export default page
